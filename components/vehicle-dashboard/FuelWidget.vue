<template>
  <v-card outlined class="vehicle-dashboard-widget">
    <!-- Toolbar -->
    <v-toolbar flat color="transparent">
      <v-avatar class="mr-2" size="36">
        <v-icon v-text="icon" color="grey" />
      </v-avatar>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <!-- Dropdown Menu -->
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        origin="top right"
        transition="scale-transition"
        left
      >
        <template #activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon v-text="'mdi-dots-vertical'" />
          </v-btn>
        </template>
        <v-card>
          <v-list nav dense>
            <v-list-item v-for="(action, a) in actions" :key="`action-${a}`" :to="action.to" link>
              <v-list-item-action>
                <v-icon v-text="action.icon" />
              </v-list-item-action>
              <v-list-item-title v-text="action.text" />
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-divider />

    <!-- Fuel Datatable -->
    <v-skeleton-loader :loading="!initialized" :types="{ 'table-tbody': 'table-row-divider@3' }" type="table-thead, table-tbody, table-tfoot">
      <v-data-table
        :dense="items && !!items.length"
        :headers="headers"
        :hide-default-footer="true"
        :items="items"
        :items-per-page="pagination.itemsPerPage"
        :loading="loading"
        :mobile-breakpoint="0"
        :page.sync="pagination.page"
        :sort-by="['service_date']"
        :sort-desc="[true]"
        @page-count="pagination.pageCount = $event"
        class="striped"
      >
        <!-- Configure formatting of column data -->
        <template #item.service_date="{ item }">
          {{ item.service_date | date }}
        </template>
        <template #item.product_type="{ item }">
          <v-chip :outlined="!$vuetify.theme.dark" v-text="item.product_type" x-small />
        </template>
        <template #item.unit_price="{ item }">
          {{ item.unit_price | currency(3, 3) }}
        </template>
        <template #item.amount="{ item }">
          {{ item.amount | currency }}
        </template>
      </v-data-table>
    </v-skeleton-loader>
    <v-divider />

    <!-- Report Length & Pagination -->
    <v-card-actions v-show="initialized" class="pager">
      <v-btn-toggle
        v-model="days"
        background-color="transparent"
        color="primary"
        mandatory
        rounded
        dense
      >
        <v-btn
          v-for="period in periods"
          :key="period"
          :value="period"
          small
          text
        >
          {{ period }}
        </v-btn>
      </v-btn-toggle>
      <span v-text="$t('days')" class="caption mx-2" />
      <v-spacer />
      <v-pagination
        v-show="items && !!items.length"
        v-model="pagination.page"
        :length="pagination.pageCount"
        :total-visible="pagination.totalVisible"
        circle
        style="width:auto;"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    days: 60,
    icon: 'mdi-gas-station',
    initialized: false,
    menu: false,
    pagination: {
      itemsPerPage: 5,
      page: 1,
      pageCount: 0,
      totalVisible: 5
    },
    periods: [30, 60, 90]
  }),
  computed: {
    /**
     * Vuex Getters
     */
    ...mapGetters({
      items: 'vehicle-dashboard/getFuelHistory',
      loading: 'vehicle-dashboard/getFuelLoading',
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
    }),
    /**
     * Dropdown menu actions
     */
    actions () {
      return [
        {
          text: this.$i18n.t('fuel_history'),
          icon: 'mdi-gas-station',
          to: this.fuelRoute
        },
        {
          text: this.$i18n.t('fuel_cards'),
          icon: 'mdi-credit-card',
          to: this.fuelCardRoute
        },
        {
          text: this.$i18n.t('fuel_authorization_profiles'),
          icon: 'mdi-clipboard-account',
          to: this.fuelProfilesRoute
        }
      ]
    },
    /**
     * Datatable columns
     */
    columns () {
      return [
        'service_date',
        'fuel_company_name',
        'product_type',
        'quantity',
        'unit_price',
        'amount'
      ]
    },
    /**
     * Datatable headers
     */
    headers () {
      return [
        {
          text: this.$i18n.t('service_date'),
          value: 'service_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('fuel_company_name'),
          value: 'fuel_company_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('product_type'),
          value: 'product_type',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('quantity'),
          value: 'quantity',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('unit_price'),
          value: 'unit_price',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('amount'),
          value: 'amount',
          class: 'report-column'
        }
      ]
    },
    title: vm => vm.$i18n.t('fuel'),
    start_date: vm => vm.$moment().subtract(vm.days, 'days').format('YYYY-MM-DD'),
    end_date: vm => vm.$moment().format('YYYY-MM-DD'),
    fuelRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/fuel`, query: { start: vm.start_date, end: vm.end_date } }),
    fuelCardRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/fuel/fuel-cards` }),
    fuelProfilesRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/fuel/fuel-authorization-profiles` })
  },
  watch: {
    /**
     * Watch 'days' variable for changes, then re-fetch data.
     */
    async days () {
      await this.populateWidget()
    }
  },
  /**
   * Fetch Fuel Data when widget is mounted.
   */
  async mounted () {
    await this.populateWidget()
  },
  methods: {
    /**
     * Vuex Actions
     */
    ...mapActions({
      populate: 'vehicle-dashboard/fetchFuelHistory'
    }),
    /**
     * Populate widget and toggle initialized status while data is fetched.
     */
    async populateWidget () {
      // this.initialized = false
      await this.populate({
        start: this.start_date,
        end: this.end_date,
        use_bill_date: false,
        vehicle: this.vehicle_number
      })
      this.initialized = true
    }
  }
}
</script>
