<template>
  <v-card outlined class="report">
    <v-card-title>
      {{ $t('order_status_report') }}
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
    </v-card-title>
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
    <v-divider />
    <!-- Report Content -->
    <v-card-text class="pa-0">
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
          :sort-desc="[false]"
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

          <!-- configure individual columns -->
          <template #item.vehicle_number="{ item }">
            <nuxt-link :title="$t(`to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" class="text-decoration-none" nuxt />
          </template>

          <template #item.order_received_date="{ item }">
            {{ item.order_received_date | date }}
          </template>

          <template #item.order_placed_date="{ item }">
            {{ item.order_placed_date | date }}
          </template>

          <template #item.factory_acknowledged_date="{ item }">
            {{ item.factory_acknowledged_date | date }}
          </template>

          <template #item.sent_to_plant_date="{ item }">
            {{ item.sent_to_plant_date | date }}
          </template>

          <template #item.production_scheduled_date="{ item }">
            {{ item.production_scheduled_date | date }}
          </template>

          <template #item.built_date="{ item }">
            {{ item.built_date | date }}
          </template>

          <template #item.shipped_to_body_company_date="{ item }">
            {{ item.shipped_to_body_company_date | date }}
          </template>

          <template #item.shipped_from_body_company_date="{ item }">
            {{ item.shipped_from_body_company_date | date }}
          </template>

          <template #item.shipped_to_dealer_date="{ item }">
            {{ item.shipped_to_dealer_date | date }}
          </template>

          <template #item.delivered_to_dealer_date="{ item }">
            {{ item.delivered_to_dealer_date | date }}
          </template>

          <template #item.vin_date="{ item }">
            {{ item.vin_date | date }}
          </template>

          <template #item.in_service_date="{ item }">
            {{ item.in_service_date | date }}
          </template>

          <!-- Configure how each #item row is rendered -->
          <!-- <template #item="{ item }">
            <tr>
              <td>
                <client-only>
                  <v-btn :title="$t(`to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" nuxt small />
                </client-only>
              </td>
              <td>{{ item.client_vehicle_number }}</td>
              <td>{{ item.level_01 }}</td>
              <td>{{ item.level_02 }}</td>
              <td>{{ item.level_03 }}</td>
              <td>{{ item.customer_number }}</td>
              <td>{{ item.center_code }}</td>
              <td>{{ item.center_name }}</td>
              <td>{{ item.model_year }}</td>
              <td>{{ item.vehicle_make }}</td>
              <td>{{ item.vehicle_model }}</td>
              <td>{{ item.driver_name }}</td>
              <td>{{ item.driver_city }}</td>
              <td>{{ item.driver_state_province }}</td>
              <td>{{ item.driver_postal_code }}</td>
              <td>{{ item.order_received_date | date }}</td>
              <td>{{ item.order_placed_date | date }}</td>
              <td>{{ item.factory_order_number }}</td>
              <td>{{ item.vin }}</td>
              <td>{{ item.factory_acknowledged_date | date }}</td>
              <td>{{ item.sent_to_plant_date | date }}</td>
              <td>{{ item.production_scheduled_date | date }}</td>
              <td>{{ item.built_date | date }}</td>
              <td>{{ item.shipped_to_body_company_date | date }}</td>
              <td>{{ item.shipped_from_body_company_date | date }}</td>
              <td>{{ item.shipped_to_dealer_date | date }}</td>
              <td>{{ item.delivered_to_dealer_date | date }}</td>
              <td>{{ item.non_emkay_turnin }}</td>
              <td>{{ item.turnin_vehicle }}</td>
              <td>{{ item.sell_comment }}</td>
              <td>{{ item.status_comment }}</td>
              <td>{{ item.delivery_comment }}</td>
              <td>{{ item.current_status }}</td>
              <td>{{ item.vin_date | date }}</td>
              <td>{{ item.client_turnin }}</td>
              <td>{{ item.bill_sort }}</td>
              <td>{{ item.dealer_code }}</td>
              <td>{{ item.dealer_name }}</td>
              <td>{{ item.in_service_date | date }}</td>
            </tr>
          </template> -->
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
  </v-card>
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
        'vehicle_number',
        'client_vehicle_number',
        'level_01',
        'level_02',
        'level_03',
        'customer_number',
        'center_code',
        'center_name',
        'model_year',
        'vehicle_make',
        'vehicle_model',
        'driver_name',
        'driver_city',
        'driver_state_province',
        'driver_postal_code',
        'order_received_date',
        'order_placed_date',
        'factory_order_number',
        'vin',
        'factory_acknowledged_date',
        'sent_to_plant_date',
        'production_scheduled_date',
        'built_date',
        'shipped_to_body_company_date',
        'shipped_from_body_company_date',
        'shipped_to_dealer_date',
        'delivered_to_dealer_date',
        'non_emkay_turnin',
        'turnin_vehicle',
        'sell_comment',
        'status_comment',
        'delivery_comment',
        'current_status',
        'vin_date',
        'client_turnin',
        'bill_sort',
        'dealer_code',
        'dealer_name',
        'in_service_date'
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
          text: this.$i18n.t('client_vehicle_number'),
          value: 'client_vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('level_01'),
          value: 'level_01',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('level_02'),
          value: 'level_02',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('level_03'),
          value: 'level_03',
          class: 'report-column',
          width: 150,
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
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('model_year'),
          value: 'model_year',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_make'),
          value: 'vehicle_make',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_model'),
          value: 'vehicle_model',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('driver_name'),
          value: 'driver_name',
          class: 'report-column',
          width: 250,
          divider: true
        },
        {
          text: this.$i18n.t('driver_city'),
          value: 'driver_city',
          class: 'report-column',
          width: 150,
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
          text: this.$i18n.t('factory_order_number'),
          value: 'factory_order_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vin'),
          value: 'vin',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('factory_acknowledged_date'),
          value: 'factory_acknowledged_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('sent_to_plant_date'),
          value: 'sent_to_plant_date',
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
          text: this.$i18n.t('shipped_to_body_company_date'),
          value: 'shipped_to_body_company_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('shipped_from_body_company_date'),
          value: 'shipped_from_body_company_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('shipped_to_dealer_date'),
          value: 'shipped_to_dealer_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('delivered_to_dealer_date'),
          value: 'delivered_to_dealer_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('non_emkay_turnin'),
          value: 'non_emkay_turnin',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('turnin_vehicle'),
          value: 'turnin_vehicle',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('sell_comment'),
          value: 'sell_comment',
          class: 'report-column',
          width: 300,
          divider: true
        },
        {
          text: this.$i18n.t('status_comment'),
          value: 'status_comment',
          class: 'report-column',
          width: 300,
          divider: true
        },
        {
          text: this.$i18n.t('delivery_comment'),
          value: 'delivery_comment',
          class: 'report-column',
          width: 300,
          divider: true
        },
        {
          text: this.$i18n.t('current_status'),
          value: 'current_status',
          class: 'report-column',
          width: 250,
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
          text: this.$i18n.t('bill_sort'),
          value: 'bill_sort',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('dealer_code'),
          value: 'dealer_code',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('dealer_name'),
          value: 'dealer_name',
          class: 'report-column',
          width: 300,
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
    await store.dispatch('reports/fetchOrderStatusReport')
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
