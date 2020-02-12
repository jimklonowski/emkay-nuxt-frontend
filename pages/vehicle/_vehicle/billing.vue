<template>
  <v-container>
    <v-row v-if="$route.query.invoice">
      <v-col cols="9">
        <invoice :invoice-number="$route.query.invoice" :vehicle-number="vehicle_number" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined class="report">
          <v-card-title>
            {{ $t('billing_history') }}
            <v-spacer />
            <v-text-field
              v-model="search"
              :label="$t('search')"
              prepend-inner-icon="mdi-magnify"
              clearable
              dense
              flat
              hide-details
              outlined
              single-line
              rounded
              solo
            />
          </v-card-title>
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
                      :value="$moment(start).format('L')"
                      :label="$t('start_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="start"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn v-text="$t('cancel')" @click="start_menu = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.start_menu.save(start), updateQuery()" text />
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
                      :value="$moment(end).format('L')"
                      :label="$t('end_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="end"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn v-text="$t('cancel')" @click="end_menu = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.end_menu.save(end), updateQuery()" text />
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
          <!-- Download as XLS Button -->
          <v-toolbar flat>
            <v-spacer />
            <v-btn :title="`${$t('save')} .xls`" small depressed>
              <v-icon v-text="'mdi-cloud-download'" small class="mr-2" />
              <client-only>
                <download-excel v-text="$t('download')" :fields="downloadFields" :data="items" />
              </client-only>
            </v-btn>
          </v-toolbar>
          <v-divider />
          <!-- Report Content -->
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
                :sort-by="['bill_date']"
                :sort-desc="[true]"
                class="striped"
                dense
              >
                <!-- Configure display of columns -->
                <template #item.invoice_number="{ item }">
                  <nuxt-link :to="localePath({ path: `/vehicle/${vehicle_number}/billing`, query: { ...$route.query, invoice: item.invoice_number } })" class="text-decoration-none" nuxt>
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
import Invoice from '@/components/vehicle/billing/Invoice'

export default {
  name: 'Billing',
  components: {
    Invoice
  },
  mixins: [downloadFields, updateQuery, vehicleRoute],
  data (context) {
    return {
      end_menu: false,
      start_menu: false,
      search: ''
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
  head () {
    const title = `${this.vehicle_number} - ${this.$t('fuel')}`
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
