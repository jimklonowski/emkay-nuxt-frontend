<template>
  <v-card outlined class="report">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{ $t('saferoads_trip_detail') }}</v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        background-color="transparent"
        class="mr-1"
        clearable
        dense
        flat
        hide-details
        outlined
        rounded
        single-line
        solo
      />
      <v-divider vertical inset class="mx-4" />
      <!-- Download as XLS button -->
      <client-only>
        <download-excel :fields="downloadFields" :data="items">
          <v-btn :title="`${$t('save')} .xls`" color="primary" large icon>
            <v-icon v-text="'mdi-cloud-download'" />
          </v-btn>
        </download-excel>
      </client-only>
    </v-toolbar>
    <v-divider />
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
      </v-row>
    </v-container>
    <v-divider />
    <!-- Report Content -->
    <v-skeleton-loader :loading="loading" type="table">
      <v-data-table
        :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
        :headers="headers"
        :items="items"
        :items-per-page="25"
        :loading="loading"
        :mobile-breakpoint="0"
        :search="search"
        :sort-by="[0]"
        :sort-desc="[true]"
        class="striped"
        dense
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
      </v-data-table>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
// Adds computed properties that are needed for formatting the datatable as well as downloading a report as .xls
import { downloadFields } from '@/mixins/datatables'
// Adds a method called updateQuery that depends on the computed 'query' property
import { updateQuery } from '@/mixins/routing'
/**
 * Saferoads Trip Detail
 */
export default {
  name: 'SaferoadsTripDetail',

  /**
   * Mixins
   * https://vuejs.org/v2/guide/mixins.html
   * Mixins are a flexible way to distribute reusable functionalities for Vue components. A mixin object can contain any component options.
   * When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.
   */
  mixins: [downloadFields, updateQuery],

  /**
   * The data object for the Vue instance.
   * https://vuejs.org/v2/api/#data
   * Vue will recursively convert its properties into getter/setters to make it “reactive”. The object must be plain!
   */
  data (context) {
    return {
      end_menu: false,
      start_menu: false
    }
  },

  /**
   * Computed Properties
   * https://vuejs.org/v2/api/#computed
   */
  computed: {
    /**
     * Implement a computed columns property that returns an array of strings that represent the datatable columns
     */
    columns () {
      return [
        'driver_number',
        'driver_name',
        'driver_email_address',
        'date',
        'start_time',
        'end_time',
        'duration',
        'distance',
        'saferoads_score',
        'braking',
        'acceleration',
        'speeding',
        'hard_turn',
        'phone_use',
        'trip_start_latitude',
        'trip_start_longitude',
        'trip_end_latitude',
        'trip_end_longitude'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('driver_number'),
          value: 'driver_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_name'),
          value: 'driver_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_email_address'),
          value: 'driver_email_address',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('date'),
          value: 'date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('start_time'),
          value: 'start_time',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('end_time'),
          value: 'end_time',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('duration'),
          value: 'duration',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('distance'),
          value: 'distance',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('saferoads_score'),
          value: 'saferoads_score',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('braking'),
          value: 'braking',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('acceleration'),
          value: 'acceleration',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('speeding'),
          value: 'speeding',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('hard_turn'),
          value: 'hard_turn',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('phone_use'),
          value: 'phone_use',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('trip_start_latitude'),
          value: 'trip_start_latitude',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('trip_start_longitude'),
          value: 'trip_start_longitude',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('trip_end_latitude'),
          value: 'trip_end_latitude',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('trip_end_longitude'),
          value: 'trip_end_longitude',
          class: 'report-column',
          divider: true
        }
      ]
    },
    items: vm => vm.$store.getters['reports/getData'],
    error: vm => vm.$store.getters['reports/getError'],
    loading: vm => vm.$store.getters['reports/getLoading'],
    /**
     * Implement a computed query property that returns an object that corresponds with watchQuery
     * REQUIRED
     */
    query () {
      const query = {
        start_date: this.start_date,
        end_date: this.end_date
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
    let search
    const report_length = 30
    const start_date = query.start_date || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end_date = query.end_date || $moment().format('YYYY-MM-DD')

    const filters = {
      command: '???',
      subcommand: '???',
      start_date,
      end_date,
      json: 'Y'
    }
    await store.dispatch('reports/fetchData', filters)
    return { search, end_date, start_date }
  },

  /**
   * Set specific <meta> tags for the current page.
   * Nuxt.js uses vue-meta to update the headers and html attributes of your application.
   * https://nuxtjs.org/api/pages-head */
  head () {
    const title = this.$t('saferoads_trip_detail')
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
  watchQuery: ['start_date', 'end_date']
}
</script>
