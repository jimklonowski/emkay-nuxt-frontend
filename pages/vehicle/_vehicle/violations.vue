<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined class="report">
          <v-card-title class="pa-0">
            <v-toolbar height="72" flat color="transparent">
              <v-toolbar-title>
                {{ $t('violations') }}
              </v-toolbar-title>
              <v-spacer />
              <v-text-field
                v-model="search"
                :label="$t('search')"
                background-color="transparent"
                prepend-inner-icon="mdi-magnify"
                clearable
                dense
                flat
                hide-details
                outlined
                rounded
                single-line
                solo
              />
            </v-toolbar>
          </v-card-title>
          <v-divider />
          <v-card-text class="pa-0">
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
                <template #item.date="{ item }">
                  {{ item.date | date }}
                </template>
                <template #item.paid_date="{ item }">
                  {{ item.paid_date | date }}
                </template>
                <template #item.amount="{ item }">
                  {{ item.amount | currency }}
                </template>
                <!-- <template #item.document_id="{ item }">
                  <v-dialog>
                    <template #activator="{ on }">
                      <v-btn v-on="on" small text>
                        <v-icon>mdi-pdf-box</v-icon>
                        {{ item.document_id }}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>{{ item.document_id }}.pdf</v-card-title>
                      <v-img :src="getViolationImageUrl(item.document_path.trim(), item.document_id.trim())" />
                    </v-card>
                  </v-dialog>
                </template> -->
                <template #item.document_id="{ item }">
                  <a :href="getViolationPdfUrl(item.document_path.trim(), item.document_id.trim())" target="_blank">
                    View PDF
                  </a>
                </template>
              </v-data-table>
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import { updateQuery, vehicleRoute } from '@/mixins/routing'

export default {
  name: 'Violation',
  mixins: [downloadFields, updateQuery, vehicleRoute],
  data () {
    return {
      end_menu: false,
      start_menu: false,
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      items: 'vehicle/getViolationHistory',
      loading: 'vehicle/getViolationsLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'date',
        'paid_date',
        'violation_number',
        'type',
        'state_or_province',
        'amount',
        ''
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('date'),
          value: 'date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('paid_date'),
          value: 'paid_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('violation_number'),
          value: 'violation_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('type'),
          value: 'type',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('state_or_province'),
          value: 'state_or_province',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('amount'),
          value: 'amount',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('view'),
          value: 'document_id',
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
    await store.dispatch('vehicle/fetchViolationHistory', { start, end, vehicle })
    return { start, end }
  },
  methods: {
    getViolationPdfUrl (path, file) {
      if (process.browser) {
        const url = new URL(`${process.env.BASE_URL}/vehicle/violation`)
        url.searchParams.set('path', path)
        url.searchParams.set('file', file)
        url.searchParams.set('type', 'pdf')
        return url.href
      }
    }
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$t('violations')}`
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
