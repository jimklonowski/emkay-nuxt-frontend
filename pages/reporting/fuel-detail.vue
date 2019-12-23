<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" class="mx-auto">
        <v-card class="elevation-1">
          <v-toolbar flat>
            <v-toolbar-title class="subtitle-1 hidden-sm-and-down">
              {{ $t('fuel_detail') }}
            </v-toolbar-title>
            <v-spacer />
            <v-text-field
              v-model="search"
              :label="$t('search')"
              append-icon="mdi-magnify"
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
          <v-divider />
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
                      v-model="start_date"
                      :label="$t('start_date')"
                      v-on="on"
                      max-width="50%"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="start_date"
                    type="month"
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
                      v-model="end_date"
                      :label="$t('end_date')"
                      v-on="on"
                      max-width="50%"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="end_date"
                    type="month"
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
                <v-spacer />
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
          <v-divider />
          <v-skeleton-loader :loading="dataLoading" type="table">
            <v-data-table
              :headers="reportHeaders"
              :hide-default-header="dataLoading"
              :loading="dataLoading"
              :items-per-page="15"
              :items="rows"
              :search="search"
              class="striped"
            >
              <!-- configure the #no-data message -->
              <template #no-data>
                <div class="text-left">
                  {{ $t('no_data_found', { 'message': error }) }}
                </div>
              </template>

              <!-- configure the #no-results message -->
              <template #no-results>
                <div class="text-left">
                  {{ $t('no_search_results', { 'query': search }) }}
                </div>
              </template>

              <!-- configure how #item rows are rendered -->
              <template #item="{ item }">
                <tr>
                  <td>{{ item.amount | currency }}</td>
                  <td>{{ item.bill_date | date }}</td>
                  <td>{{ item.bill_sort }}</td>
                  <td>
                    <client-only>
                      <v-chip :outlined="$vuetify.theme.dark" v-text="item.card_number" small />
                    </client-only>
                  </td>
                  <td>{{ item.center_code }}</td>
                  <td>{{ item.center_name }}</td>
                  <td>{{ item.client_use_1 }}</td>
                  <td>{{ item.client_use_2 }}</td>
                  <td>{{ item.client_use_3 }}</td>
                  <td>{{ item.client_use_4 }}</td>
                  <td>{{ item.client_use_5 }}</td>
                  <td>{{ item.client_vehicle_number }}</td>
                  <td>{{ item.driver_id }}</td>
                  <td>{{ item.driver_name }}</td>
                  <td>{{ item.emkay_invoice_date | date }}</td>
                  <td>{{ item.emkay_invoice_number }}</td>
                  <td>{{ item.engine_fuel_type }}</td>
                  <td>{{ item.exception }}</td>
                  <td>{{ item.fuel_card_vendor }}</td>
                  <td>{{ item.fuel_company_name }}</td>
                  <td>{{ item.fuel_company_number }}</td>
                  <td>{{ item.invoice_number }}</td>
                  <td>{{ item.level_01 }}</td>
                  <td>{{ item.level_02 }}</td>
                  <td>{{ item.level_03 }}</td>
                  <td>{{ item.merchant_address }}</td>
                  <td>{{ item.merchant_city }}</td>
                  <td>{{ item.merchant_state }}</td>
                  <td>{{ item.merchant_zip }}</td>
                  <td>{{ item.model_year }}</td>
                  <td>{{ item.odometer }}</td>
                  <td>{{ item.premium }}</td>
                  <td>{{ item.product }}</td>
                  <td>{{ item.product_type }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.service_date | date }}</td>
                  <td>{{ item.service_time }}</td>
                  <td>{{ item.tank_capacity }}</td>
                  <td>{{ item.tax_exempt }}</td>
                  <td>{{ item.unit_price | currency(3,3) }}</td>
                  <td>{{ item.vehicle_make }}</td>
                  <td>{{ item.vehicle_model }}</td>
                  <td>
                    <client-only>
                      <v-btn :title="$t(`to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" nuxt small />
                    </client-only>
                  </td>
                  <td>{{ item.vin }}</td>
                  <td>{{ item.voucher }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-skeleton-loader>
          <v-divider />
          <v-toolbar flat>
            <v-spacer />
            <client-only>
              <v-btn :ripple="false" :title="`${$t('save')} .xls`" small depressed>
                <v-icon small class="mr-2">
                  mdi-cloud-download
                </v-icon>
                <download-excel v-t="'download'" :fields="downloadHeaders" :data="rows" />
              </v-btn>
            </client-only>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * Fuel Detail Report
 * When a date filter changes, a call is made to updateFilters which updates the route's query parameters (?start=2019-11&end=2019-11&...)
 * watchQuery listens for changes in the query parameters and onchange triggers all component methods (i.e. asyncData which will re-request data with new parameters)
 */
/* eslint-disable camelcase */
export default {
  name: 'FuelDetail',

  /**
   * The data object for the Vue instance.
   * https://vuejs.org/v2/api/#data
   * Vue will recursively convert its properties into getter/setters to make it “reactive”. The object must be plain!
   */
  data (context) {
    // console.info('data()')
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
    rows: vm => vm.$store.getters['reports/getData'],
    error: vm => vm.$store.getters['reports/getError'],
    columns: vm => vm.$store.getters['reports/getColumns'],
    dataLoading: vm => vm.$store.getters['reports/getLoading'],
    reportHeaders: vm => vm.$store.getters['reports/getHeaders'],
    // create an object { text1: key1, text2: key2, text3: key3, ...} for downloading report as excel
    downloadHeaders: vm => (Object.assign({}, ...vm.columns.map(column => ({ [vm.$i18n.t(column)]: column })))),
    reportText () {
      return `${this.$moment(this.start_date).format('L')} - ${this.$moment(this.end_date).format('L')}`
    }
  },

  /**
   * asyncData is called every time before loading the page component and is only available for such.
   * The result from asyncData will be merged with data.
   * https://nuxtjs.org/guide/async-data
   */
  async asyncData ({ $moment, query, store, error }) {
    // console.info('asyncData()')
    const report = 'fuel-detail'
    store.commit('reports/setReport', report)

    const start_date = query.start_date || $moment().subtract(1, 'months').startOf('month').format('YYYY-MM')
    const end_date = query.end_date || $moment().startOf('month').format('YYYY-MM')
    const use_bill_date = query.use_bill_date || false

    const filters = {
      command: 'FUEL',
      subcommand: 'JSONDETAIL',
      customer: 'EM102',
      start_date,
      end_date,
      use_bill_date
    }

    try {
      // Get the headers, then get the data.
      await store.dispatch('reports/fetchHeaders').then(async () => {
        await store.dispatch('reports/fetchData', filters)
      })
    } catch (err) {
      error({ statusCode: 408, message: 'Timed Out' })
    }

    return {
      report,
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
    // console.info('head()')
    return {
      title: this.$t(`fuel_detail`),
      meta: [
        { hid: 'og:description', property: 'og:description', content: this.$t(`fuel_detail`) }
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
  scrollToTop: true,

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
