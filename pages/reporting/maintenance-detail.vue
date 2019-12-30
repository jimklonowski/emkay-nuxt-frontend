<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card shaped outlined>
          <v-toolbar flat>
            <v-toolbar-title class="hidden-sm-and-down">
              {{ $t(`maintenance_detail`) }}
            </v-toolbar-title>
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
              rounded
              single-line
              solo
            />
          </v-toolbar>
          <v-subheader class="overline">
            {{ $t('report_filters') }}
          </v-subheader>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="start_menu"
                  v-model="start_menu"
                  :close-on-content-click="false"
                  :return-value.sync="start_date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      :value="$moment(start_date).format('L')"
                      :label="$t('start_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="start_date"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn @click="start_menu = false" text>
                      {{ $t('cancel') }}
                    </v-btn>
                    <v-btn @click="$refs.start_menu.save(start_date), updateFilters()" text>
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
                  :return-value.sync="end_date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      :value="$moment(end_date).format('L')"
                      :label="$t('end_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="end_date"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn @click="end_menu = false" text>
                      {{ $t('cancel') }}
                    </v-btn>
                    <v-btn @click="$refs.end_menu.save(end_date), updateFilters()" text>
                      {{ $t('ok') }}
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-switch
                  v-model="use_bill_date"
                  :label="$t(`bill_date`)"
                  @change="updateFilters()"
                  hint="Not Yet Implemented..."
                  messages="Not Yet Implemented..."
                />
              </v-col>
            </v-row>
          </v-container>
          <!-- Download as XLS button -->
          <v-toolbar flat>
            <v-spacer />
            <client-only>
              <v-btn :ripple="false" :title="`${$t('save')} .xls`" small depressed>
                <v-icon small class="mr-2">
                  mdi-cloud-download
                </v-icon>
                <download-excel v-t="'download'" :fields="downloadFields" :data="rows" />
              </v-btn>
            </client-only>
          </v-toolbar>
          <v-card-text class="px-0">
            <v-skeleton-loader :loading="loading" type="table">
              <v-data-table
                :headers="headers"
                :hide-default-header="loading"
                :loading="loading"
                :items-per-page="10"
                :items="rows"
                :search="search"
                :sort-by="['service_date']"
                :sort-desc="[true]"
                :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100] }"
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

                <!-- Configure each #item row is rendered -->
                <template #item="{ item }">
                  <tr>
                    <td>{{ item.service_date | date }}</td>
                    <td>{{ item.active }}</td>
                    <td>{{ item.amount | currency }}</td>
                    <td>{{ item.ata_group }}</td>
                    <td>{{ item.ata_group_description }}</td>
                    <td>{{ item.bill_sort }}</td>
                    <td>{{ item.brake_manufacturer }}</td>
                    <td>{{ item.brake_thickness }}</td>
                    <td>{{ item.center_code }}</td>
                    <td>{{ item.center_name }}</td>
                    <td>{{ item.charge_code }}</td>
                    <td>{{ item.client_use_1 }}</td>
                    <td>{{ item.client_use_2 }}</td>
                    <td>{{ item.client_use_3 }}</td>
                    <td>{{ item.client_use_4 }}</td>
                    <td>{{ item.client_use_5 }}</td>
                    <td>{{ item.client_vehicle_number }}</td>
                    <td>{{ item.customer_po }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.driver_name }}</td>
                    <td>{{ item.engine_hours }}</td>
                    <td>{{ item.expense_category }}</td>
                    <td>{{ item.front_left_brake }}</td>
                    <td>{{ item.front_left_drum }}</td>
                    <td>{{ item.front_left_rotor }}</td>
                    <td>{{ item.front_left_tire }}</td>
                    <td>{{ item.front_right_brake }}</td>
                    <td>{{ item.front_right_drum }}</td>
                    <td>{{ item.front_right_rotor }}</td>
                    <td>{{ item.front_right_tire }}</td>
                    <td>{{ item.gl_code }}</td>
                    <td>{{ item.invoice_number }}</td>
                    <td>{{ item.labor_or_part }}</td>
                    <td>{{ item.level_01 }}</td>
                    <td>{{ item.level_02 }}</td>
                    <td>{{ item.level_03 }}</td>
                    <td>{{ item.maintenance_category }}</td>
                    <td>{{ item.maintenance_code }}</td>
                    <td>{{ item.model_year }}</td>
                    <td>{{ item.odometer }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.rear_left_brake }}</td>
                    <td>{{ item.rear_left_drum }}</td>
                    <td>{{ item.rear_left_rotor }}</td>
                    <td>{{ item.rear_left_tire }}</td>
                    <td>{{ item.rear_right_brake }}</td>
                    <td>{{ item.rear_right_drum }}</td>
                    <td>{{ item.rear_right_rotor }}</td>
                    <td>{{ item.rear_right_tire }}</td>
                    <td>{{ item.tire_manufacturer }}</td>
                    <td>{{ item.tire_model }}</td>
                    <td>{{ item.tire_size }}</td>
                    <td>{{ item.vehicle_make }}</td>
                    <td>{{ item.vehicle_model }}</td>
                    <td>
                      <client-only>
                        <v-btn :title="$t(`to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" small />
                      </client-only>
                    </td>
                    <td>{{ item.vendor_factor }}</td>
                    <td>{{ item.vendor_name }}</td>
                    <td>{{ item.vendor_number }}</td>
                    <td>{{ item.voucher }}</td>
                  </tr>
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
/**
 * Maintenance Detail Report
 * When a date filter changes, a call is made to updateFilters which updates the route's query parameters (?start=2019-11&end=2019-11&...)
 * watchQuery listens for changes in the query parameters and onchange triggers all component methods (i.e. asyncData which will re-request data with new parameters)
 */

/* eslint-disable camelcase */
export default {
  name: 'MaintenanceDetail',

  /**
   * The data object for the Vue instance.
   * https://vuejs.org/v2/api/#data
   * Vue will recursively convert its properties into getter/setters to make it “reactive”. The object must be plain!
   */
  data (context) {
    return {
      end_menu: false,
      start_menu: false,
      search: ''
    }
  },

  /**
   * Computed Properties
   * https://vuejs.org/v2/api/#computed
   */
  computed: {
    // columns: vm => vm.$store.getters['reports/getColumns'],
    // downloadFields: vm => (Object.assign({}, ...vm.columns.map(column => ({ [vm.$i18n.t(column)]: column })))),
    // headers: vm => vm.$store.getters['reports/getHeaders'],
    rows: vm => vm.$store.getters['reports/getData'],
    error: vm => vm.$store.getters['reports/getError'],
    loading: vm => vm.$store.getters['reports/getLoading'],
    columns () {
      return [
        'service_date',
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
        'client_vehicle_number',
        'customer_po',
        'description',
        'driver_name',
        // 'driver_first_name',
        // 'driver_last_name',
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
        'vehicle_number',
        'vendor_factor',
        'vendor_name',
        'vendor_number',
        'voucher'
      ]
    },
    headers () {
      // Returns an array of TableHeader[]
      return this.columns.map(column => {
        return {
          text: this.$i18n.t(column),
          value: column,
          class: 'report-column'
        }
      })
    },
    downloadFields () {
      // create an object { text1: key1, text2: key2, text3: key3, ...} for downloading report as excel
      // example:
      // { 'Amount': 'amount', 'Service Date': 'service_date', .... } or
      // { 'Montant': 'amount', 'Date de service': 'service_date', ... }
      return Object.assign({}, ...this.columns.map(column => ({ [this.$i18n.t(column)]: column })))
    }
  },

  /**
   * asyncData is called every time before loading the page component and is only available for such.
   * The result from asyncData will be merged with data.
   * https://nuxtjs.org/guide/async-data
   */
  async asyncData ({ $moment, query, store }) {
    // if no date params in query, then use 30day period ending with today
    const start_date = query.start_date || $moment().subtract(30, 'days').format('YYYY-MM-DD')
    const end_date = query.end_date || $moment().format('YYYY-MM-DD')
    const use_bill_date = query.use_bill_date || false

    const filters = {
      command: 'MAINTHISTORY',
      customer: 'EM102',
      start_date,
      end_date,
      use_bill_date,
      json: 'Y'
    }

    // Fetch the report data using the above filters
    await store.dispatch('reports/fetchData', filters)

    return {
      end_date,
      start_date,
      use_bill_date
    }
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
   * Specify a layout defined in the layouts directory. (compared to just a single App.vue)
   * Every file (first level) in the layouts directory will create a custom layout accessible with the layout property in the page component.
   * THIS IS SET IN THE PARENT reporting.vue to be the reports.vue layout
   * https://nuxtjs.org/api/pages-layout
   * https://nuxtjs.org/guide/views#layouts */
  // layout: 'default',

  /**
   * Nuxt.js gives you its own loading progress bar component that's shown between routes. You can customize it, disable it or create your own component.
   * https://nuxtjs.org/api/pages-loading */
  loading: true,

  /**
   * You can create named middleware by creating a file inside the middleware/ directory, the file name will be the middleware name.
   * If you need to use a middleware only for a specific page, you can directly use a function for it (or an array of functions)
   * https://nuxtjs.org/api/pages-middleware */
  // middleware: 'auth',
  middleware ({ store, redirect }) {
    // The parent reporting route should already have the 'auth' middleware, so no need for child report route
  },

  /**
   * Nuxt.js lets you define a validator method inside your dynamic route component.
   * https://nuxtjs.org/api/pages-validate */
  validate ({ $moment, query }) {
    // if (query.start_date && query.end_date) {
    //   if ($moment(query.start_date).isAfter(query.end_date)) {
    //     throw new Error('Start Date cannot be after End Date')
    //   }
    // }
    // console.info('validate()')
    // add this later, we can forbid invalid queries from being manually typed
    // if (query.start_date && !$moment(query.start_date).isValid()) {
    //   throw new Error(`Invalid date parameter: '${query.start_date}'`)
    // }
    // if (query.end_date && !$moment(query.end_date).isValid()) {
    //   throw new Error(`Invalid date parameter: '${query.end_date}'`)
    // }
    return true
  },

  /**
   * The fetch method is used to fill the store before rendering the page, it's like the asyncData method except it doesn't set the component data.
   * https://nuxtjs.org/api/pages-fetch
   */
  async fetch ({ $moment, query, store }) {
    // await console.info('fetch()')
  },

  /**
   * Methods
   * https://vuejs.org/v2/api/#methods
   */
  methods: {
    updateFilters () {
      this.$router.push({ query: { start_date: this.start_date, end_date: this.end_date, use_bill_date: this.use_bill_date } })
    }
  },

  /**
   * The scrollToTop property lets you tell Nuxt.js to scroll to the top before rendering the page.
   * https://nuxtjs.org/api/pages-scrolltotop */
  // scrollToTop: true,

  /**
   * To define a custom transition for a specific route, simply add the transition key to the page component.
   * @type {String|Object|Function}
   * https://nuxtjs.org/api/pages-transition */
  transition (to, from) {
    // if (!from) { return 'slide-left' }
    // return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },

  /**
   * Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
   * https://nuxtjs.org/api/pages-watchquery
   */
  watchQuery: ['start_date', 'end_date', 'use_bill_date']
}
</script>
