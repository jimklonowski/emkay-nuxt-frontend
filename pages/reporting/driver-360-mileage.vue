<template>
  <v-container>
    <v-banner single-line>
      TODO: INCOMPLETE
    </v-banner>
    <v-row>
      <v-col cols="12">
        <v-card shaped outlined>
          <v-toolbar flat>
            <v-toolbar-title v-text="$t('driver_360_mileage')" class="hidden-sm-down" />
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
                :sort-by="[0]"
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

                <!-- Configure how each #item row is rendered -->
                <!-- <template #item="{ item }">
                  <tr>
                    <td>{{ item.date | date }}</td>
                  </tr>
                </template> -->
              </v-data-table>
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Adds computed properties that are needed for formatting the datatable as well as downloading a report as .xls
import { downloadFields } from '@/mixins/datatables'
// Adds a method called updateQuery that depends on the computed 'query' property
import { updateQuery } from '@/mixins/routing'
/**
 * Driver 360 Mileage Report
 */
export default {
  name: 'Driver360Mileage',

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
        'driver_name',
        'vehicle_number',
        'report_date',
        'mileage',
        'type',
        'origin',
        'destination',
        'notes'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('driver_name'),
          value: 'driver_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_number'),
          value: 'vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('report_date'),
          value: 'report_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('mileage'),
          value: 'mileage',
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
          text: this.$i18n.t('origin'),
          value: 'origin',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('destination'),
          value: 'destination',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('notes'),
          value: 'notes',
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
    const title = this.$t('driver_360_mileage')
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
