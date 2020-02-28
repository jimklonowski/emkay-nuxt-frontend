<template>
  <v-card outlined class="report">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{ $t('maintenance_detail') }}</v-toolbar-title>
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
        <download-excel :fields="downloadFields" :data="items">
          <v-btn :title="`${$t('save')} .xls`" color="primary" large icon>
            <v-icon v-text="'mdi-cloud-download'" />
          </v-btn>
        </download-excel>
      </client-only>
    </v-toolbar>
    <v-divider />

    <!-- Report Filters -->
    <v-expansion-panels accordion flat hover tile>
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
              <v-col cols="12" sm="4">
                <v-switch
                  v-model="use_bill_date"
                  :label="$t(`use_bill_date`)"
                  :loading="loading"
                  @change="updateQuery()"
                  class="mt-1"
                  inset
                />
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
        :sort-by="['service_date']"
        :sort-desc="[true]"
        class="striped"
      >
        <!-- Configure the #no-data message (no data from server) -->
        <template #no-data>
          <div class="text-left">
            {{ $t('no_data_found', { 'message': error }) }}
          </div>
        </template>

        <!-- Configure the #no-results message (no rows in filtered search) -->
        <template #no-results>
          <div class="text-left">
            {{ $t('no_search_results', { 'query': search }) }}
          </div>
        </template>

        <!-- configure each column rendering -->
        <template #item.service_date="{ item }">
          {{ item.service_date | date }}
        </template>

        <template #item.bill_date="{ item }">
          {{ item.bill_date | date }}
        </template>

        <template #item.vehicle_number="{ item }">
          <nuxt-link :title="$t(`to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" class="text-decoration-none" nuxt />
        </template>

        <template #item.amount="{ item }">
          {{ item.amount | currency }}
        </template>

        <template #item.quantity="{ item }">
          {{ item.quantity | number }}
        </template>
      </v-data-table>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import { updateQuery } from '@/mixins/routing'
/**
 * Maintenance Detail Report
 * When a date filter changes, a call is made to updateQuery which updates the route's query parameters (?start=2019-11&end=2019-11&...)
 * watchQuery listens for changes in the query parameters and onchange triggers all component methods (i.e. asyncData which will re-request data with new parameters)
 */
export default {
  name: 'MaintenanceDetail',
  mixins: [downloadFields, updateQuery],

  /**
   * The data object for the Vue instance.
   * https://vuejs.org/v2/api/#data
   * Vue will recursively convert its properties into getter/setters to make it “reactive”. The object must be plain!
   */
  data: () => ({
    end_dialog: false,
    start_dialog: false,
    search: ''
  }),

  /**
   * Computed Properties
   * https://vuejs.org/v2/api/#computed
   */
  computed: {
    ...mapGetters({
      items: 'reports/getData',
      error: 'reports/getError',
      loading: 'reports/getLoading'
    }),
    // Downloaded csv contains these columns.
    columns () {
      return [
        'vehicle_number',
        'client_vehicle_number',
        'service_date',
        'bill_date',
        'active',
        'amount',
        'ata_group',
        'ata_group_description',
        'bill_sort',
        'brake_manufacturer',
        'brake_thickness',
        'center_code',
        'center_name',
        'charge_code',
        'client_use_1',
        'client_use_2',
        'client_use_3',
        'client_use_4',
        'client_use_5',
        'customer_po',
        'description',
        'driver_first_name',
        'driver_last_name',
        'engine_hours',
        'expense_category',
        'front_left_brake',
        'front_left_drum',
        'front_left_rotor',
        'front_left_tire',
        'front_right_brake',
        'front_right_drum',
        'front_right_rotor',
        'front_right_tire',
        'gl_code',
        'invoice_number',
        'labor_or_part',
        'level_01',
        'level_02',
        'level_03',
        'level_04',
        'level_05',
        'level_06',
        'level_07',
        'maintenance_category',
        'maintenance_code',
        'model_year',
        'odometer',
        'quantity',
        'rear_left_brake',
        'rear_left_drum',
        'rear_left_rotor',
        'rear_left_tire',
        'rear_right_brake',
        'rear_right_drum',
        'rear_right_rotor',
        'rear_right_tire',
        'tire_manufacturer',
        'tire_model',
        'tire_size',
        'vehicle_make',
        'vehicle_model',
        'vendor_factor',
        'vendor_name',
        'vendor_number',
        'voucher'
      ]
    },
    // Datatable contains these columns
    headers () {
      return [
        {
          text: this.$i18n.t('vehicle_number'),
          value: 'vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_vehicle_number'),
          value: 'client_vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('service_date'),
          value: 'service_date',
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
          text: this.$i18n.t('active'),
          value: 'active',
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
          text: this.$i18n.t('ata_group'),
          value: 'ata_group',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('ata_group_description'),
          value: 'ata_group_description',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('bill_sort'),
          value: 'bill_sort',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('brake_manufacturer'),
          value: 'brake_manufacturer',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('brake_thickness'),
          value: 'brake_thickness',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('center_code'),
          value: 'center_code',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('center_name'),
          value: 'center_name',
          class: 'report-column',
          width: 300,
          divider: true
        },
        {
          text: this.$i18n.t('charge_code'),
          value: 'charge_code',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_use_1'),
          value: 'client_use_1',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_use_2'),
          value: 'client_use_2',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_use_3'),
          value: 'client_use_3',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_use_4'),
          value: 'client_use_4',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_use_5'),
          value: 'client_use_5',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('customer_po'),
          value: 'customer_po',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('description'),
          value: 'description',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('driver_last_name'),
          value: 'driver_last_name',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('driver_first_name'),
          value: 'driver_first_name',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('engine_hours'),
          value: 'engine_hours',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('expense_category'),
          value: 'expense_category',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('front_left_brake'),
          value: 'front_left_brake',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('front_left_drum'),
          value: 'front_left_drum',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('front_left_rotor'),
          value: 'front_left_rotor',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('front_left_tire'),
          value: 'front_left_tire',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('front_right_brake'),
          value: 'front_right_brake',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('front_right_drum'),
          value: 'front_right_drum',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('front_right_rotor'),
          value: 'front_right_rotor',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('front_right_tire'),
          value: 'front_right_tire',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('gl_code'),
          value: 'gl_code',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('invoice_number'),
          value: 'invoice_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('labor_or_part'),
          value: 'labor_or_part',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('maintenance_category'),
          value: 'maintenance_category',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('maintenance_code'),
          value: 'maintenance_code',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('model_year'),
          value: 'model_year',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('odometer'),
          value: 'odometer',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('quantity'),
          value: 'quantity',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('rear_left_brake'),
          value: 'rear_left_brake',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('rear_left_drum'),
          value: 'rear_left_drum',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('rear_left_rotor'),
          value: 'rear_left_rotor',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('rear_left_tire'),
          value: 'rear_left_tire',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('rear_right_brake'),
          value: 'rear_right_brake',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('rear_right_drum'),
          value: 'rear_right_drum',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('rear_right_rotor'),
          value: 'rear_right_rotor',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('rear_right_tire'),
          value: 'rear_right_tire',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('tire_manufacturer'),
          value: 'tire_manufacturer',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('tire_model'),
          value: 'tire_model',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('tire_size'),
          value: 'tire_size',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_make'),
          value: 'vehicle_make',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_model'),
          value: 'vehicle_model',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vendor_factor'),
          value: 'vendor_factor',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vendor_name'),
          value: 'vendor_name',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('vendor_number'),
          value: 'vendor_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('voucher'),
          value: 'voucher',
          class: 'report-column'
        }
      ]
    },
    // Query parameters
    query () {
      return {
        start: this.start,
        end: this.end,
        use_bill_date: this.use_bill_date
      }
    }
  },

  /**
   * asyncData is called every time before loading the page component and is only available for such.
   * The result from asyncData will be merged with data.
   * https://nuxtjs.org/guide/async-data
   */
  async asyncData ({ $moment, query, store }) {
    // if no date params in query, then use 30day period ending with today
    const report_length = 30
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')
    const use_bill_date = query.use_bill_date || false

    // Fetch the report data using the above filters
    await store.dispatch('reports/fetchMaintenanceDetailReport', { start, end, use_bill_date })

    return { start, end, use_bill_date }
  },

  /**
   * Set specific <meta> tags for the current page.
   * Nuxt.js uses vue-meta to update the headers and html attributes of your application.
   * https://nuxtjs.org/api/pages-head */
  head () {
    const title = this.$t(`maintenance_detail`)
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },

  /**
   * Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
   * https://nuxtjs.org/api/pages-watchquery
   */
  watchQuery: ['start', 'end', 'use_bill_date']
}
</script>
