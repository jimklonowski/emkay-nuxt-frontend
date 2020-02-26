<template>
  <v-card outlined class="report">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{ $t('order_status_report') }}</v-toolbar-title>
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
        :sort-by="['vehicle_number']"
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
      </v-data-table>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
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
  data: () => ({
    search: ''
  }),
  /**
   * Computed Properties
   * https://vuejs.org/v2/api/#computed
   */
  computed: {
    // Mapped Vuex Getters
    ...mapGetters({
      items: 'reports/getData',
      error: 'reports/getError',
      loading: 'reports/getLoading'
    }),
    // Downloaded CSV contains these columns.
    columns () {
      return [
        'vehicle_number',
        'client_vehicle_number',
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
    // Datatable contains these headers.
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
          width: 420,
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
          class: 'report-column'
        }
      ]
    }
  },

  /**
   * asyncData is called every time before loading the page component and is only available for such.
   * The result from asyncData will be merged with data.
   * https://nuxtjs.org/guide/async-data
   */
  async asyncData ({ store }) {
    await store.dispatch('reports/fetchOrderStatusReport')
    return {}
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
