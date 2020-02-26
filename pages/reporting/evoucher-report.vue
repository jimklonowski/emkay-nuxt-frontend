<template>
  <v-card outlined class="report">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{ $t('evoucher_report') }}</v-toolbar-title>
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
/**
 * eVoucher Report
 */
export default {
  name: 'EvoucherReport',

  /**
   * Mixins
   * https://vuejs.org/v2/guide/mixins.html
   * Mixins are a flexible way to distribute reusable functionalities for Vue components. A mixin object can contain any component options.
   * When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.
   */
  mixins: [downloadFields],

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
        'vehicle_number',
        'center_code',
        'center_name',
        'driver',
        'year_make_model',
        'odometer',
        'last_pm_date',
        'last_pm_odometer',
        'next_pm_odometer',
        'due_in_miles',
        'status'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('vehicle_number'),
          value: 'vehicle_number',
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
          divider: true
        },
        {
          text: this.$i18n.t('driver'),
          value: 'driver',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('year_make_model'),
          value: 'year_make_model',
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
          text: this.$i18n.t('last_pm_date'),
          value: 'last_pm_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('last_pm_odometer'),
          value: 'last_pm_odometer',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('next_pm_odometer'),
          value: 'next_pm_odometer',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('due_in_miles'),
          value: 'due_in_miles',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('status'),
          value: 'status',
          class: 'report-column',
          divider: true
        }
      ]
    },
    items: vm => vm.$store.getters['reports/getData'],
    error: vm => vm.$store.getters['reports/getError'],
    loading: vm => vm.$store.getters['reports/getLoading']
  },

  /**
   * asyncData is called every time before loading the page component and is only available for such.
   * The result from asyncData will be merged with data.
   * https://nuxtjs.org/guide/async-data
   */
  async asyncData ({ $moment, query, store, error }) {
    let search
    const filters = {
      command: '???',
      subcommand: '???',
      json: 'Y'
    }
    // Fetch report data
    await store.dispatch('reports/fetchData', filters)
    return { search }
  },

  /**
   * Set specific <meta> tags for the current page.
   * Nuxt.js uses vue-meta to update the headers and html attributes of your application.
   * https://nuxtjs.org/api/pages-head */
  head () {
    const title = this.$t('evoucher_report')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
