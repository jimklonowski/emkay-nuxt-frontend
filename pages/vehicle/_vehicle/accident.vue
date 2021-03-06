<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined tile class="report">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer />
            <v-text-field
              v-model="search"
              :label="$t('search')"
              prepend-inner-icon="mdi-magnify"
              background-color="transparent"
              class="mr-2"
              clearable
              dense
              flat
              hide-details
              outlined
              rounded
              single-line
              solo
            />

            <!-- Download as XLS button -->
            <client-only>
              <v-divider vertical inset class="mx-3" />
              <download-excel :fields="downloadFields" :data="items" :name="exportName">
                <v-btn :title="`${$t('save')} .xls`" color="primary" large icon>
                  <v-icon v-text="'mdi-cloud-download'" />
                </v-btn>
              </download-excel>
            </client-only>
          </v-toolbar>
          <v-divider />

          <!-- Report Filters -->
          <v-expansion-panels
            v-model="panels_expanded"
            accordion
            flat
            hover
            multiple
            tile
          >
            <v-expansion-panel class="transparent">
              <v-expansion-panel-header class="overline">
                {{ $t('report_filters') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container class="pb-0">
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-dialog
                        ref="start_dialog"
                        v-model="start_dialog"
                        :return-value.sync="start"
                        @keydown.esc="start_dialog = false"
                        persistent
                        width="290px"
                      >
                        <template #activator="{ on }">
                          <v-text-field
                            :value="$moment(start).format('L')"
                            :label="$t('start_date')"
                            v-on="on"
                            prepend-icon="mdi-calendar"
                            dense
                            outlined
                            readonly
                            rounded
                          />
                        </template>
                        <v-date-picker
                          v-model="start"
                          :locale="$moment.locale()"
                          color="primary"
                          header-color="primary"
                          scrollable
                        >
                          <v-spacer />
                          <v-btn v-text="$t('cancel')" @click="start_dialog = false" text />
                          <v-btn v-text="$t('ok')" @click="$refs.start_dialog.save(start), updateQuery()" text />
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-dialog
                        ref="end_dialog"
                        v-model="end_dialog"
                        :return-value.sync="end"
                        @keydown.esc="end_dialog = false"
                        persistent
                        width="290px"
                      >
                        <template #activator="{ on }">
                          <v-text-field
                            :value="$moment(end).format('L')"
                            :label="$t('end_date')"
                            v-on="on"
                            prepend-icon="mdi-calendar"
                            dense
                            outlined
                            readonly
                            rounded
                          />
                        </template>
                        <v-date-picker
                          v-model="end"
                          :locale="$moment.locale()"
                          color="primary"
                          header-color="primary"
                          scrollable
                        >
                          <v-spacer />
                          <v-btn v-text="$t('cancel')" @click="end_dialog = false" text />
                          <v-btn v-text="$t('ok')" @click="$refs.end_dialog.save(end), updateQuery()" text />
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-divider />

          <!-- Report Content -->
          <v-skeleton-loader :loading="loading" type="table">
            <v-data-table
              :dense="items && !!items.length"
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
/**
 * Vehicle Dashboard Accident History
 */
export default {
  name: 'VehicleDashboardAccidentHistory',
  components: { AccidentClaim },
  mixins: [downloadFields, updateQuery, vehicleRoute],
  computed: {
    ...mapGetters({
      items: 'vehicle-dashboard/getAccidentHistory',
      loading: 'vehicle-dashboard/getAccidentLoading',
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
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
    },
    title: vm => vm.$i18n.t('accident_history')
  },
  async asyncData ({ $moment, params, query, store }) {
    const vehicle = store.getters['vehicle-dashboard/getVehicleNumber']
    const report_length = 30
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')
    await store.dispatch('vehicle-dashboard/fetchAccidentHistory', { start, end, vehicle })
    return { panels_expanded: [0],
      start_dialog: false,
      start,
      end_dialog: false,
      end,
      claim_dialog: false,
      search: ''
    }
  },
  methods: {
    claimRoute (claim) {
      return this.localePath({ path: `/vehicle/${this.vehicle_number}/accident/claim`, query: { claim } })
    }
  },
  head () {
    return {
      title: `${this.vehicle_number} - ${this.title}`,
      meta: [
        { hid: 'og:description', property: 'og:description', content: this.title }
      ]
    }
  },
  watchQuery: ['start', 'end']
}
</script>
