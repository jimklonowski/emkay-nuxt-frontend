<template>
  <client-only>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              {{ $t(`${namespace}.report`) }}
              <v-spacer />
              <v-text-field
                v-model="search"
                :label="$t('common.search')"
                clearable
                dense
                flat
                hide-details
                outlined
                prepend-inner-icon="mdi-magnify"
                rounded
                solo
                single-line
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
                      :return-value.sync="start_date"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template #activator="{ on }">
                        <v-text-field
                          v-model="start_date"
                          :label="$t('date.start_date')"
                          v-on="on"
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
                          {{ $t('common.cancel') }}
                        </v-btn>
                        <v-btn @click="$refs.start_menu.save(start_date), updateFilters()" text>
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
                      :return-value.sync="end_date"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template #activator="{ on }">
                        <v-text-field
                          v-model="end_date"
                          :label="$t('date.end_date')"
                          v-on="on"
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
                          {{ $t('common.cancel') }}
                        </v-btn>
                        <v-btn @click="$refs.end_menu.save(end_date), updateFilters()" text>
                          {{ $t('common.ok') }}
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-switch
                      v-model="use_bill_date"
                      :label="$t(`date.bill_date`)"
                      @change="updateFilters()"
                      hint="Not Yet Implemented..."
                      messages="Not Yet Implemented..."
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
            <v-card-text>
              <!-- <v-skeleton-loader :loading="dataLoading" type="table"> -->
              <v-data-table
                ref="dt"
                :loading="dataLoading"
                :headers="reportHeaders"
                :items="rows"
                :search="search"
                class="striped"
              >
                <!-- ** BELOW ARE (some) SLOTS THAT CAN BE CUSTOMIZED FOR THE DEFAULT V-DATA-TABLE https://vuetifyjs.com/en/components/data-tables#api ** -->
                <template #top>
                  <v-row no-gutters>
                    <v-spacer />
                    <v-btn :ripple="{ class: 'amber--text' }" :title="`${$t('common.save')} .xls`" small depressed>
                      <v-icon small class="mr-2">
                        mdi-cloud-download
                      </v-icon>
                      <download-excel v-t="'common.download'" :fields="downloadHeaders" :data="rows" />
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

                <!-- format 'service_date' as locale date -->
                <template #item.service_date="{ item }">
                  {{ item.service_date | date }}
                </template>

                <!-- format 'card_number' as a chip -->
                <template #item.card_number="{ item }">
                  <v-chip :outlined="$vuetify.theme.dark" v-text="item.card_number" small />
                </template>

                <!-- format vehicle_number as a vehicle-dashboard link -->
                <template #item.vehicle_number="{ item }">
                  <v-btn :title="$t(`common.to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" small />
                </template>
              </v-data-table>
              <!-- </v-skeleton-loader> -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </client-only>
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
    // console.info('data()')
    return {
      end_menu: false,
      start_menu: false,
      loading: false,
      search: ''
    }
  },

  /**
   * Computed Properties
   * https://vuejs.org/v2/api/#computed
   */
  computed: {
    columns: vm => vm.$store.getters['reports/getColumns'],
    dataLoading: vm => vm.$store.getters['reports/getLoading'],
    reportHeaders: vm => vm.$store.getters['reports/getHeaders'],
    // create an object { text1: key1, text2: key2, text3: key3, ...} for downloading report as excel
    downloadHeaders: vm => (Object.assign({}, ...vm.columns.map(column => ({ [vm.$i18n.t(`${vm.namespace}.${column}`)]: column }))))
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  /**
   * asyncData is called every time before loading the page component and is only available for such.
   * The result from asyncData will be merged with data.
   * https://nuxtjs.org/guide/async-data
   */
  async asyncData ({ $moment, query, store }) {
    // console.info('asyncData()')
    const namespace = 'reports.expenses.maintenance_detail'
    const report = 'maintenance-detail'
    store.commit('reports/setNamespace', namespace)
    store.commit('reports/setReport', report)

    const start_date = query.start_date || $moment().subtract(1, 'months').startOf('month').format('YYYY-MM')
    const end_date = query.end_date || $moment().startOf('month').format('YYYY-MM')
    const use_bill_date = query.use_bill_date || false

    const filters = {
      command: 'MAINTHISTORY',
      customer: 'EM102',
      start_date,
      end_date,
      use_bill_date,
      json: 'Y'
    }

    // Get the headers, then get the data.
    await store.dispatch('reports/fetchHeaders').then(async () => {
      await store.dispatch('reports/fetchData', filters)
    })

    return {
      namespace,
      report,
      end_date,
      start_date,
      use_bill_date,
      rows: store.getters['reports/getData']
    }
  },
  beforeMount () {
    console.log('beforemount')
  },

  /**
   * Set specific <meta> tags for the current page.
   * Nuxt.js uses vue-meta to update the headers and html attributes of your application.
   * https://nuxtjs.org/api/pages-head */
  head () {
    // console.info('head()')
    return {
      title: this.$t(`${this.namespace}.report`),
      meta: [
        { hid: 'og:description', property: 'og:description', content: this.$t(`${this.namespace}.report`) }
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
