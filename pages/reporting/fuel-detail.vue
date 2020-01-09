<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card shaped outlined>
          <v-toolbar flat>
            <v-toolbar-title v-text="$t('fuel_detail')" class="hidden-sm-and-down" />
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
          <!-- Report Filters -->
          <v-container>
            <v-subheader v-text="$t('report_filters')" class="overline" />
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
                    <v-btn v-text="$t('cancel')" @click="start_menu = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.start_menu.save(start_date), updateQuery()" text />
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
                    <v-btn v-text="$t('cancel')" @click="end_menu = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.end_menu.save(end_date), updateQuery()" text />
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-switch
                  v-model="use_bill_date"
                  :label="$t(`bill_date`)"
                  @change="updateQuery()"
                  hint="Not Yet Implemented..."
                  messages="Not Yet Implemented..."
                />
              </v-col>
            </v-row>
          </v-container>
          <!-- Download as XLS button -->
          <v-toolbar flat>
            <v-spacer />
            <v-btn :title="`${$t('save')} .xls`" small depressed>
              <v-icon v-text="'mdi-cloud-download'" small class="mr-2" />
              <client-only>
                <download-excel v-text="$t('download')" :fields="downloadFields" :data="items" />
              </client-only>
            </v-btn>
          </v-toolbar>
          <!-- Report Content -->
          <v-card-text class="px-0">
            <v-skeleton-loader :loading="loading" type="table">
              <v-data-table
                :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100] }"
                :headers="headers"
                :items="items"
                :items-per-page="10"
                :loading="loading"
                :search="search"
                :sort-by="['service_date']"
                :sort-desc="[true, true]"
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

                <!-- Configure how each #item row is rendered -->
                <template #item="{ item }">
                  <tr>
                    <td>{{ item.service_date | date }}</td>
                    <td>{{ item.bill_date | date }}</td>
                    <td>{{ item.amount | currency }}</td>
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { downloadFields, headers, reportGetters } from '@/mixins/datatables'
import { updateQuery } from '@/mixins/routing'
/**
 * Fuel Detail Report
 * When a date filter changes, a call is made to updateQuery which updates the route's query parameters (?start=2019-11&end=2019-11&...)
 * watchQuery listens for changes in the query parameters and onchange triggers all component methods (i.e. asyncData which will re-request data with new parameters)
 */
export default {
  name: 'FuelDetail',

  /**
   * Mixins
   * https://vuejs.org/v2/guide/mixins.html
   * Mixins are a flexible way to distribute reusable functionalities for Vue components. A mixin object can contain any component options.
   * When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.
   */
  mixins: [downloadFields, headers, reportGetters, updateQuery],

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
    columns () {
      // TODO: Additional logic for ordering of columns and which columns should be in report
      // Returns an array of string[]
      return [
        'service_date',
        'bill_date',
        'amount',
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
    query () {
      const query = {
        start_date: this.start_date,
        end_date: this.end_date,
        use_bill_date: this.use_bill_date
      }
      return query
    }
  },

  /**
   * asyncData is called every time before loading the page component and is only available for such.
   * The result from asyncData will be merged with data.
   * https://nuxtjs.org/guide/async-data
   */
  async asyncData ({ $moment, query, store, error }) {
    // if no date params in query, then use 30day period ending with today
    const report_length = 30
    const start_date = query.start_date || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end_date = query.end_date || $moment().format('YYYY-MM-DD')
    const use_bill_date = query.use_bill_date || false

    const filters = {
      command: 'FUEL',
      customer: 'EM102',
      start_date,
      end_date,
      use_bill_date,
      json: 'Y'
    }

    // Fetch the report data using the above filters
    await store.dispatch('reports/fetchData', filters)

    // Return the report parameters so they are merged with the data() object
    return { end_date, start_date, use_bill_date }
  },

  /**
   * Set specific <meta> tags for the current page.
   * Nuxt.js uses vue-meta to update the headers and html attributes of your application.
   * https://nuxtjs.org/api/pages-head */
  head () {
    const title = this.$t('fuel_detail')
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
  // layout: 'report',

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
   * The scrollToTop property lets you tell Nuxt.js to scroll to the top before rendering the page.
   * https://nuxtjs.org/api/pages-scrolltotop
   * Parent view (reporting.vue) overrides with scrollToTop: false
   */
  // scrollToTop: false,

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
