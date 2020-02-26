<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined class="report">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>{{ $t('accident') }}</v-toolbar-title>
            <v-spacer />
            <v-text-field
              v-model="search"
              :label="$t('search')"
              prepend-inner-icon="mdi-magnify"
              background-color="transparent"
              class="mr-1"
              clearable
              dense
              flat
              hide-details
              outlined
              rounded
              single-line
              solo
            />
            <v-divider vertical inset class="mx-4" />
            <!-- Download as XLS button -->
            <client-only>
              <download-excel :fields="downloadFields" :data="items">
                <v-btn :title="`${$t('save')} .xls`" color="primary" large icon>
                  <v-icon v-text="'mdi-cloud-download'" />
                </v-btn>
              </download-excel>
            </client-only>
          </v-toolbar>
          <v-divider />
          <!-- Report Filters -->
          <v-container>
            <v-subheader v-text="$t('report_filters')" class="overline" />
            <v-row>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="start_menu"
                  v-model="start_menu"
                  :close-on-content-click="false"
                  :return-value.sync="start"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      v-model="start"
                      :label="$t('start_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="start"
                    :locale="$i18n.locale"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn @click="start_menu = false" text>
                      {{ $t('cancel') }}
                    </v-btn>
                    <v-btn @click="$refs.start_menu.save(start), updateQuery()" text>
                      {{ $t('ok') }}
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="end_menu"
                  v-model="end_menu"
                  :close-on-content-click="false"
                  :return-value.sync="end"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      v-model="end"
                      :label="$t('end_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="end"
                    :locale="$i18n.locale"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn @click="end_menu = false" text>
                      {{ $t('cancel') }}
                    </v-btn>
                    <v-btn @click="$refs.end_menu.save(end), updateQuery()" text>
                      {{ $t('ok') }}
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
          <v-divider />
          <v-skeleton-loader :loading="loading" type="table">
            <v-data-table
              :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
              :headers="headers"
              :items="items"
              :items-per-page="25"
              :loading="loading"
              :mobile-breakpoint="0"
              :search="search"
              :sort-by="['date']"
              :sort-desc="[true]"
              class="striped"
              dense
            >
              <template #item.accident_date="{ item }">
                {{ item.accident_date | datetime }}
              </template>
              <template #item.claim_amount="{ item }">
                {{ item.claim_amount | currency }}
              </template>
              <template #item.subrogation_amount="{ item }">
                {{ item.subrogation_amount | currency }}
              </template>
              <template #item.actions="{ item }">
                <v-dialog v-model="claim_dialog" max-width="1200" scrollable>
                  <template #activator="{ on }">
                    <v-btn v-on="on" color="primary" small text tile>
                      <v-icon v-text="'mdi-eye'" class="mr-2" />
                      {{ $t('view') }}
                    </v-btn>
                  </template>
                  <AccidentClaim :claimNumber="item.claim_number" @close-dialog="claim_dialog = false" />
                </v-dialog>
              </template>
            </v-data-table>
          </v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import { updateQuery, vehicleRoute } from '@/mixins/routing'
import AccidentClaim from '@/components/vehicle/accident/AccidentClaim'
export default {
  name: 'Accident',
  components: { AccidentClaim },
  mixins: [downloadFields, updateQuery, vehicleRoute],
  data () {
    return {
      claim_dialog: false,
      end_menu: false,
      start_menu: false,
      search: ''
    }
  },
  computed: {
    items2 () {
      return [
        {
          accident_date: '2019-01-03 15:10:00.000',
          claim_number: '12345',
          claim_type: 'Collision',
          claim_amount: 1000.00,
          subrogation_amount: 666
        }
      ]
    },
    ...mapGetters({
      items: 'vehicle/getAccidentHistory',
      loading: 'vehicle/getAccidentsLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'accident_date',
        'claim_number',
        'claim_type',
        'claim_amount',
        'subrogation_amount',
        ''
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('accident_date'),
          value: 'accident_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('claim_number'),
          value: 'claim_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('claim_type'),
          value: 'claim_type',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('claim_amount'),
          value: 'claim_amount',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('subrogation_amount'),
          value: 'subrogation_amount',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('actions'),
          value: 'actions',
          class: 'report-column'
        }
      ]
    },
    query () {
      return { start: this.start, end: this.end }
    }
  },
  async asyncData ({ $moment, params, query, store }) {
    const vehicle = store.getters['vehicle/getVehicleNumber']
    const report_length = 30
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')
    await store.dispatch('vehicle/fetchAccidentHistory', { start, end, vehicle })
    return { start, end }
  },
  methods: {
    claimRoute (claim) {
      return this.localePath({ path: `/vehicle/${this.vehicle_number}/accident/claim`, query: { claim } })
    }
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$t('accident')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  watchQuery: ['start', 'end']
}
</script>
