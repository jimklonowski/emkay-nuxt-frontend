<template>
  <client-only>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Fuel Detail Report
              <v-spacer />
              <v-text-field
                v-model="search"
                :label="$t('common.search')"
                prepend-icon="mdi-magnify"
                clearable
                single-line
                hide-details
              />
            </v-card-title>
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
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
                          :label="$t('date.start_date')"
                          v-on="on"
                          prepend-icon="mdi-calendar"
                          readonly
                        />
                      </template>
                      <v-date-picker
                        v-model="start"
                        type="month"
                        no-title
                        scrollable
                      >
                        <v-spacer />
                        <v-btn @click="start_menu = false" text>
                          {{ $t('common.cancel') }}
                        </v-btn>
                        <v-btn @click="$refs.start_menu.save(start), updateFilters()" text>
                          {{ $t('common.ok') }}
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="6">
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
                          :label="$t('date.end_date')"
                          v-on="on"
                          prepend-icon="mdi-calendar"
                          readonly
                        />
                      </template>
                      <v-date-picker
                        v-model="end"
                        type="month"
                        no-title
                        scrollable
                      >
                        <v-spacer />
                        <v-btn @click="end_menu = false" text>
                          {{ $t('common.cancel') }}
                        </v-btn>
                        <v-btn @click="$refs.end_menu.save(end), updateFilters()" text>
                          {{ $t('common.ok') }}
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-switch
                      v-model="use_bill_date"
                      :label="$t(`date.bill_date`)"
                      :false-value="'N'"
                      :true-value="'Y'"
                      @change=""
                      hint="Not Yet Implemented..."
                      messages="Not Yet Implemented..."
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
            <v-card-text>
              <v-skeleton-loader :loading="!initialized" type="table">
                <v-data-table
                  ref="dt"
                  :loading="this.$nuxt.$loading && this.$nuxt.$loading.show"
                  :headers="getHeaders"
                  :items="items"
                  :search="search"
                  class="striped"
                >
                  <!-- ** BELOW ARE (some) SLOTS THAT CAN BE CUSTOMIZED FOR THE DEFAULT V-DATA-TABLE https://vuetifyjs.com/en/components/data-tables#api ** -->
                  <template #top>
                    <v-row no-gutters>
                      <v-spacer />
                      <v-btn :ripple="{ class: 'amber--text' }" :title="'Save .xls'" small depressed>
                        <v-icon small class="mr-2">
                          mdi-cloud-download
                        </v-icon>
                        <download-excel v-t="'common.download'" :fields="downloadHeaders" :data="items" />
                      </v-btn>
                    </v-row>
                  </template>

                  <!-- Datatable loading indicator -->
                  <template #progress>
                    <!-- Shows an overlay when data is currently loading -->
                    <v-overlay :opacity="0.69" absolute>
                      <span>{{ $t('common.loading') }}</span>
                      <v-progress-linear
                        :buffer-value="0"
                        :value="0"
                        color="amber"
                        height="6"
                        rounded
                        stream
                      />
                    </v-overlay>
                  </template>

                  <!-- No Data (from server) -->
                  <template #no-data>
                    <div class="text-left">
                      No data was returned.
                    </div>
                  </template>

                  <!-- No Results (search) -->
                  <template #no-results>
                    <div class="text-left">
                      {{ $t('common.no_search_results', { 'query': search }) }}
                    </div>
                  </template>

                  <!-- format 'amount' as currency -->
                  <template #item.amount="{ item }">
                    {{ item.amount | currency }}
                  </template>

                  <!-- format 'bill_date' as locale date -->
                  <template #item.bill_date="{ item }">
                    {{ item.bill_date | date }}
                  </template>

                  <!-- format 'card_number' as a chip -->
                  <template #item.card_number="{ item }">
                    <v-chip :outlined="$vuetify.theme.dark" v-text="item.card_number" small />
                  </template>

                  <!-- format vehicle_number as a vehicle-dashboard link -->
                  <template #item.vehicle_number="{ item }">
                    <v-btn :title="$t(`${i18nNamespace}.to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" small />
                  </template>
                </v-data-table>
              </v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </client-only>
</template>

<script>
/**
 * Fuel Detail Report
 * When a date filter changes, a call is made to updateFilters which updates the route's query parameters (?start=2019-11&end=2019-11&...)
 * watchQuery listens for changes in the query parameters and onchange triggers all component methods (i.e. asyncData which will re-request data with new parameters)
 */
export default {
  name: 'FuelDetail',

  /**
   * The data object for the Vue instance.
   * Vue will recursively convert its properties into getter/setters to make it “reactive”. The object must be plain!
   * https://vuejs.org/v2/api/#data */
  data () {
    return {
      i18nNamespace: 'reports.fuel_detail',
      initialized: true,
      start: this.$route.query.start || this.$moment().subtract(1, 'months').startOf('month').format('YYYY-MM'),
      start_menu: false,
      end: this.$route.query.end || this.$moment().startOf('month').format('YYYY-MM'),
      end_menu: false,
      use_bill_date: this.$route.bill_date || false,
      search: ''
    }
  },

  /**
   * Computed properties to be mixed into the Vue instance.
   * https://vuejs.org/v2/api/#computed */
  computed: {
    /**
     * Array of columns to display in the report.  This may need special handling based on US/CAN.
     * Additional logic or a separate query to determine the columns and their order might be necessary.
     */
    columns () {
      // this list may change between canada/us, so generate it in a COMPUTED method
      return [
        'amount',
        'bill_date',
        'bill_sort',
        'card_number',
        'center_code',
        'center_name',
        'client_use_1',
        'client_use_2',
        'client_use_3',
        'client_use_4',
        'client_use_5',
        'client_vehicle_number',
        'driver_id',
        'driver_name',
        'emkay_invoice_date',
        'emkay_invoice_number',
        'engine_fuel_type',
        'exception',
        'fuel_card_vendor',
        'fuel_company_name',
        'fuel_company_number',
        'invoice_number',
        'level_01',
        'level_02',
        'level_03',
        'merchant_address',
        'merchant_city',
        'merchant_state',
        'merchant_zip',
        'model_year',
        'odometer',
        'premium',
        'product',
        'product_type',
        'quantity',
        'service_date',
        'service_time',
        'tank_capacity',
        'tax_exempt',
        'unit_price',
        'vehicle_make',
        'vehicle_model',
        'vehicle_number',
        'vin',
        'voucher'
      ]
    },
    /**
     * Convert a string list of columns to a list of TableHeader[] with default options
     */
    getHeaders () {
      /*
      {
        text: string
        value: string
        align?: 'start' | 'center' | 'end'
        sortable?: boolean
        filterable?: boolean
        divider?: boolean
        class?: string | string[]
        width?: string | number
        filter?: (value: any, search: string, item: any) => boolean
        sort?: (a: any, b: any) => number
      }
      */
      let headers = []
      // for each column header, create a TableHeader with translated text and class 'report-column'
      headers = this.columns.map((column) => {
        return {
          text: this.$t(`${this.i18nNamespace}.${column}`),
          value: column,
          class: 'report-column'
        }
      })
      return headers
    },
    /**
     * return a single object: { text1: key1, text2: key2, ... }
     */
    downloadHeaders () {
      const exportHeaders = this.columns.map(column => ({ [this.$t(`${this.i18nNamespace}.${column}`)]: column }))
      return Object.assign({}, ...exportHeaders)
    },
    oldheaders () {
      return [
        // {
        //   text: string
        //   value: string
        //   align?: 'start' | 'center' | 'end'
        //   sortable?: boolean
        //   filterable?: boolean
        //   divider?: boolean
        //   class?: string | string[]
        //   width?: string | number
        //   filter?: (value: any, search: string, item: any) => boolean
        //   sort?: (a: any, b: any) => number
        // },
        {
          text: this.$t(`${this.i18nNamespace}.amount`),
          value: 'amount',
          align: 'start',
          width: 120
        },
        {
          text: this.$t(`${this.i18nNamespace}.bill_date`),
          value: 'bill_date',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.bill_sort`),
          value: 'bill_sort',
          align: 'start',
          width: 180
        },
        {
          text: this.$t(`${this.i18nNamespace}.card_number`),
          value: 'card_number',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.center_code`),
          value: 'center_code',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.center_name`),
          value: 'center_name',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_use_1`),
          value: 'client_use_1',
          align: 'start',
          width: 165
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_use_2`),
          value: 'client_use_2',
          align: 'start',
          width: 165
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_use_3`),
          value: 'client_use_3',
          align: 'start',
          width: 165
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_use_4`),
          value: 'client_use_4',
          align: 'start',
          width: 165
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_use_5`),
          value: 'client_use_5',
          align: 'start',
          width: 165
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_vehicle_number`),
          value: 'client_vehicle_number',
          align: 'start',
          width: 210
        },
        {
          text: this.$t(`${this.i18nNamespace}.driver_id`),
          value: 'driver_id',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.driver_name`),
          value: 'driver_name',
          align: 'start',
          width: 175
        },
        {
          text: this.$t(`${this.i18nNamespace}.emkay_invoice_date`),
          value: 'emkay_invoice_date',
          align: 'start',
          width: 200
        },
        {
          text: this.$t(`${this.i18nNamespace}.emkay_invoice_number`),
          value: 'emkay_invoice_number',
          align: 'start',
          width: 200
        },
        {
          text: this.$t(`${this.i18nNamespace}.engine_fuel_type`),
          value: 'engine_fuel_type',
          align: 'start',
          width: 210
        },
        {
          text: this.$t(`${this.i18nNamespace}.exception`),
          value: 'exception',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.fuel_card_vendor`),
          value: 'fuel_card_vendor',
          align: 'start',
          width: 220
        },
        {
          text: this.$t(`${this.i18nNamespace}.fuel_company_name`),
          value: 'fuel_company_name',
          align: 'start',
          width: 240
        },
        {
          text: this.$t(`${this.i18nNamespace}.fuel_company_number`),
          value: 'fuel_company_number',
          align: 'start',
          width: 260
        },
        {
          text: this.$t(`${this.i18nNamespace}.invoice_number`),
          value: 'invoice_number',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.level_01`),
          value: 'level_01',
          align: 'start',
          width: 120
        },
        {
          text: this.$t(`${this.i18nNamespace}.level_02`),
          value: 'level_02',
          align: 'start',
          width: 120
        },
        {
          text: this.$t(`${this.i18nNamespace}.level_03`),
          value: 'level_03',
          align: 'start',
          width: 120
        },
        {
          text: this.$t(`${this.i18nNamespace}.merchant_address`),
          value: 'merchant_address',
          align: 'start',
          width: 200
        },
        {
          text: this.$t(`${this.i18nNamespace}.merchant_city`),
          value: 'merchant_city',
          align: 'start',
          width: 180
        },
        {
          text: this.$t(`${this.i18nNamespace}.merchant_state`),
          value: 'merchant_state',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.merchant_zip`),
          value: 'merchant_zip',
          align: 'start',
          width: 180
        },
        {
          text: this.$t(`${this.i18nNamespace}.model_year`),
          value: 'model_year',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.odometer`),
          value: 'odometer',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.premium`),
          value: 'premium',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.product`),
          value: 'product',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.product_type`),
          value: 'product_type',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.quantity`),
          value: 'quantity',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.service_date`),
          value: 'service_date',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.service_time`),
          value: 'service_time',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.tank_capacity`),
          value: 'tank_capacity',
          align: 'start',
          width: 170
        },
        {
          text: this.$t(`${this.i18nNamespace}.tax_exempt`),
          value: 'tax_exempt',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.unit_price`),
          value: 'unit_price',
          align: 'start',
          width: 140
        },
        {
          text: this.$t(`${this.i18nNamespace}.vehicle_make`),
          value: 'vehicle_make',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.vehicle_model`),
          value: 'vehicle_model',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.vehicle_number`),
          value: 'vehicle_number',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.vin`),
          value: 'vin',
          align: 'start',
          width: 200
        },
        {
          text: this.$t(`${this.i18nNamespace}.voucher`),
          value: 'voucher',
          align: 'start',
          width: 150
        }
      ]
    }
  },

  /**
   * asyncData is called every time before loading the page component. The result from asyncData will be merged with data.
   * https://nuxtjs.org/guide/async-data */
  async asyncData ({ app, query }) {
    // always show at least 1 months of data on first load by default (daterange set one month ago until today)
    const start = query.start || app.$moment().subtract(1, 'months').startOf('month').format('YYYY-MM')
    const end = query.end || app.$moment().startOf('month').format('YYYY-MM')
    const filters = { start_date: start, end_date: end }
    const options = { /* cancelToken */ } // not used for now
    const { data: { data: items } } = await app.$axios.post(`${process.env.EMKAY_API}/rest-test/fuel-detail`, filters, options) // ES6 destructuring response object

    // The returned object from asyncData() is merged with the returned object from data()
    // data: { items: items [], ...data }

    return { items }
  },

  /**
   * The fetch method is used to fill the vuex store before rendering the page, it's like the asyncData method except it doesn't set the component data.
   * Note: The fetch method is not called on query string changes by default. To change this, build out the watchQuery property of the page
   * https://nuxtjs.org/api/pages-fetch */
  async fetch ({ store, params }) {
    // this might be useful to load column headers from server or something..
    // await store.dispatch('LOAD_REPORT_HEADERS')
    // ignore this for now
  },
  /**
   * Methods to be mixed into the Vue instance. You can access these methods directly on the VM instance, or use them in directive expressions.
   * https://vuejs.org/v2/api/#methods */
  methods: {
    updateFilters () {
      // add the query filters to the current url, triggering the watchQuery handler
      // this.$router.push({ query: { start: this.start, end: this.end, use_bill_date: false } })
      this.$router.push({ query: { start: this.start, end: this.end } })
    }
  },

  /**
   * Set specific <meta> tags for the current page.
   * Nuxt.js uses vue-meta to update the headers and html attributes of your application.
   * https://nuxtjs.org/api/pages-head */
  head () {
    return {
      title: this.$t('reports.fuel_detail_report'),
      meta: [
        { hid: 'og:description', property: 'og:description', content: this.$t('reports.fuel_detail_report') }
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
  validate ({ params }) {
    // nothing to validate for now
    return true
  },

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
   * https://nuxtjs.org/api/pages-watchquery/ */
  // watchQuery: true,
  watchQuery: ['start', 'end', 'bill_date'],

  /**
   * The scrollToTop property lets you tell Nuxt.js to scroll to the top before rendering the page.
   * https://nuxtjs.org/api/pages-scrolltotop */
  scrollToTop: true

}
</script>
