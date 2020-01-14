<template>
  <v-container>
    <v-banner single-line>
      TODO: INCOMPLETE
    </v-banner>
    <v-row>
      <v-col cols="12">
        <v-card shaped outlined>
          <v-toolbar flat>
            <v-toolbar-title v-text="$t('order_status')" class="hidden-sm-down" />
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
                :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
                :headers="headers"
                :items="items"
                :items-per-page="25"
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
/**
 * Order Status Report
 */
export default {
  name: 'OrderStatus',

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
        'level_01',
        'level_02',
        'level_03',
        'manager',
        'team',
        'customer_number',
        'center_code',
        'center_name',
        'location',
        'vehicle_number',
        'client_vehicle_number',
        'year_make_model',
        'driver_name',
        'driver_city',
        'driver_state_province',
        'driver_postal_code',
        'order_received_date',
        'order_placed_date',
        'factory_number',
        'vin',
        'factory_acknowledge_date',
        'preference',
        'production_scheduled_date',
        'built_date',
        'received_body_date',
        'body_completed_date',
        'ship_dealer_date',
        'delivered_date',
        'turn_in',
        'special_comments',
        'status_comments',
        'delivery_comments',
        'status',
        'vin_date',
        'client_turnin',
        'sort',
        'delivering_dealer',
        'dealer_name',
        'in_service_date'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('level_01'),
          value: 'level_01',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('level_02'),
          value: 'level_02',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('level_03'),
          value: 'level_03',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('manager'),
          value: 'manager',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('team'),
          value: 'team',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('customer_number'),
          value: 'customer_number',
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
          text: this.$i18n.t('location'),
          value: 'location',
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
          text: this.$i18n.t('client_vehicle_number'),
          value: 'client_vehicle_number',
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
          text: this.$i18n.t('driver_name'),
          value: 'driver_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_city'),
          value: 'driver_city',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_state_province'),
          value: 'driver_state_province',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_postal_code'),
          value: 'driver_postal_code',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('order_received_date'),
          value: 'order_received_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('order_placed_date'),
          value: 'order_placed_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('factory_number'),
          value: 'factory_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vin'),
          value: 'vin',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('factory_acknowledge_date'),
          value: 'factory_acknowledge_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('preference'),
          value: 'preference',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('production_scheduled_date'),
          value: 'production_scheduled_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('built_date'),
          value: 'built_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('received_body_date'),
          value: 'received_body_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('body_completed_date'),
          value: 'body_completed_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('ship_dealer_date'),
          value: 'ship_dealer_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('delivered_date'),
          value: 'delivered_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('turn_in'),
          value: 'turn_in',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('special_comments'),
          value: 'special_comments',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('status_comments'),
          value: 'status_comments',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('delivery_comments'),
          value: 'delivery_comments',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('status'),
          value: 'status',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vin_date'),
          value: 'vin_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_turnin'),
          value: 'client_turnin',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('sort'),
          value: 'sort',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('delivering_dealer'),
          value: 'delivering_dealer',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('dealer_name'),
          value: 'dealer_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('in_service_date'),
          value: 'in_service_date',
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
    await store.dispatch('reports/fetchData', filters)
    return { search }
  },

  /**
   * Set specific <meta> tags for the current page.
   * Nuxt.js uses vue-meta to update the headers and html attributes of your application.
   * https://nuxtjs.org/api/pages-head */
  head () {
    const title = this.$t('order_status')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
