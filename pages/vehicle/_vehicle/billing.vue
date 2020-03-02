<template>
  <v-container>
    <v-row v-if="$route.query.invoice">
      <v-col cols="9">
        <invoice :invoice-number="$route.query.invoice" :vehicle-number="vehicle_number" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined tile class="report">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>{{ $t('billing_history') }}</v-toolbar-title>
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
              single-line
              rounded
              solo
            />

            <!-- Download as XLS button -->
            <client-only>
              <v-divider vertical inset class="mx-3" />
              <download-excel :fields="downloadFields" :data="items">
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
              :sort-by="['bill_date']"
              :sort-desc="[true]"
              class="striped"
            >
              <!-- Configure display of columns -->
              <template #item.invoice_number="{ item }">
                <nuxt-link :to="invoiceRoute(item.invoice_number)" class="text-decoration-none" nuxt>
                  {{ item.invoice_number }}
                </nuxt-link>
              </template>

              <template #item.bill_date="{ item }">
                {{ item.bill_date | date('YYYY-MM', 'MM/YYYY') }}
              </template>

              <template #item.bill_for_date="{ item }">
                {{ item.bill_for_date | date('YYYY-MM', 'MM/YYYY') }}
              </template>

              <template #item.amount="{ item }">
                {{ item.amount | currency }}
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
import Invoice from '@/components/vehicle/billing/Invoice'

export default {
  name: 'Billing',
  components: { Invoice },
  mixins: [downloadFields, updateQuery, vehicleRoute],
  data (context) {
    return {
      panels_expanded: [0],
      search: '',
      start_dialog: false,
      end_dialog: false
    }
  },
  computed: {
    ...mapGetters({
      error: 'vehicle-detail/getError',
      items: 'vehicle-detail/getData',
      loading: 'vehicle-detail/getLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'invoice_number',
        'description',
        'bill_date',
        'bill_for_date',
        'amount'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('invoice_number'),
          value: 'invoice_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('description'),
          value: 'description',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('bill_date'),
          value: 'bill_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('bill_for_date'),
          value: 'bill_for_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('amount'),
          value: 'amount',
          class: 'report-column'
        }
      ]
    },
    query () {
      return {
        ...this.$route.query,
        start: this.start,
        end: this.end
      }
    }
  },
  async asyncData ({ $moment, query, store, error }) {
    const vehicle = store.getters['vehicle/getVehicleNumber']
    // if no date params in query, use 30 day period ending with today
    const report_length = 30
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')
    // Fetch the report data using the above filters
    await store.dispatch('vehicle-detail/fetchBillingHistory', { start, end, vehicle })
    return { start, end }
  },
  methods: {
    invoiceRoute (invoice) {
      return this.localePath({ path: `/vehicle/${this.vehicle_number}/billing`, query: { ...this.$route.query, invoice } })
    }
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$t('billing')}`
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
