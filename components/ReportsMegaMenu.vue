<template>
  <v-menu
    v-model="reporting_menu"
    :close-on-content-click="false"
    :nudge-bottom="8"
    origin="top right"
    transition="scale-transition"
    left
    offset-y
    bottom
  >
    <template #activator="{ on }">
      <v-tab v-on="on" title="Reporting" style="min-width:60px;">
        <v-icon v-show="$vuetify.breakpoint.mdAndDown" color="primary lighten-2">
          mdi-monitor-dashboard
        </v-icon>
        <span v-show="$vuetify.breakpoint.lgAndUp">
          {{ $t('navigation.reporting') }}
          <v-icon>mdi-chevron-down</v-icon>
        </span>
      </v-tab>
    </template>
    <v-card>
      <v-list-item style="background-image:linear-gradient(to top right,#f6d365,#fda085);" two-line>
        <v-list-item-content>
          <v-list-item-title class="title white--text">
            Reporting
          </v-list-item-title>
          <v-list-item-subtitle class="caption white--text">
            All of your <strong>fleet</strong> reports in one place
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-tabs
        v-model="reporting_tab"
        color="warning"
        slider-size="3"
        slider-color="warning lighten-2"
        grow
        centered
      >
        <v-tab v-for="(category, key) in reporting_categories" :key="`reportingtab${key}`" class="overline">
          {{ $t(category.key) }}
        </v-tab>
      </v-tabs>
      <v-divider />
      <v-tabs-items v-model="reporting_tab">
        <v-tab-item v-for="(category, key) in reporting_categories" :key="`reportingtab-item${key}`">
          <v-card-text class="pa-0">
            <v-list nav tile dense>
              <v-list-item v-for="(item, name, key2) in category.items" :key="key2" :to="localePath(item.to)" @click="reporting_menu = false" style="min-height:32px;">
                <v-icon class="mr-4" size="20">
                  {{ item.icon || 'mdi-source-commit' }}
                </v-icon>
                <v-list-item-subtitle class="font-weight-regular">
                  {{ $t(item.key) }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
      <v-divider />
      <v-card-actions class="pa-0">
        <v-spacer />
        <v-subheader>Do something else</v-subheader>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
// const categories = () => import('@/static/json/reports.json').then(m => m.default || m)
// import categories from '../static/json/reports.json'
// import categories from '../json/reports.json'
// const categories = require('../json/reports.json')
// import reports from '../data/reports.js'

export default {
  data: () => ({
    reporting_menu: false,
    reporting_tab: 0,

    management_categories: [
      {
        key: 'common.fleet',
        items: [
          { key: 'navigation.manage_your_online_users', to: '/todo' },
          { key: 'navigation.manage_your_fleet_policies', to: '/todo' },
          { key: 'navigation.customize_your_fleet_labels', to: '/todo' },
          { key: 'navigation.manage_your_drivers', to: '/todo' },
          { key: 'navigation.manage_your_driver_fuel_pins', to: '/todo' },
          { key: 'navigation.manage_your_enotifications', to: '/todo' },
          { key: 'navigation.manage_your_cases', to: '/todo' },
          { key: 'navigation.view_your_fuel_auth_profiles', to: '/todo' }
        ]
      },
      {
        key: 'navigation.customization',
        items: [
          { key: 'navigation.approve_your_maintenance_repairs', to: '/todo' },
          { key: 'navigation.approve_your_driver_orders', to: '/todo' },
          { key: 'navigation.request_an_mvr', to: '/todo' },
          { key: 'reporting.upload_your_odometers', to: '/todo' }
        ]
      },
      {
        key: 'navigation.tools',
        items: [
          { key: 'navigation.locate_preferred_shops', to: '/todo' },
          { key: 'navigation.quote_a_transport', to: '/todo' },
          { key: 'navigation.lcca', to: '/todo' }
        ]
      }
    ],
    ordering_categories: [
      {
        key: 'navigation.orders',
        icon: 'mdi-timeline-text',
        items: [
          { key: 'navigation.place_factory_orders', to: '/todo', icon: 'mdi-car-door' },
          { key: 'navigation.place_stock_orders', to: '/todo', icon: 'mdi-car-door-lock' },
          { key: 'navigation.view_order_requests', to: '/todo', icon: 'mdi-counter' }
        ]
      },
      {
        key: 'navigation.driver_orders',
        icon: 'mdi-cash-register',
        items: [
          { key: 'navigation.manage_driver_order_settings', to: '/todo', icon: 'mdi-account-settings' },
          { key: 'navigation.allow_drivers_to_order', to: '/todo', icon: 'mdi-shield-car' },
          { key: 'navigation.approve_driver_orders', to: '/todo', icon: 'mdi-check-decagram' }
        ]
      },
      {
        key: 'navigation.selectors',
        icon: 'mdi-chart-timeline',
        items: [
          { key: 'navigation.manage_your_selectors', to: '/todo', icon: 'mdi-settings' },
          { key: 'navigation.manage_your_selector_groups', to: '/todo', icon: 'mdi-folder-settings-variant' }
        ]
      }
    ],
    // reporting_categories: []
    reporting_categories: [
      {
        key: 'common.fleet',
        icon: '',
        items: [
          { key: 'reports.inventory_report', to: { path: '/reporting/inventory' } }
          // { key: 'reporting.order_status', to: '/todo' },
          // { key: 'reporting.replacement_analysis', to: '/todo' },
          // { key: 'reporting.sold_vehicle_analysis', to: '/todo' }
        ]
      },
      {
        key: 'reports.expenses',
        icon: '',
        items: [
          { key: 'reports.fuel_detail_report', to: { path: '/reporting/fuel-detail' } },
          // { key: 'reporting.expense_summary', to: '/todo' },
          { key: 'reports.maintenance_detail_report', to: '/todo' }
          // { key: 'reporting.short_term_rental_detail', to: '/todo' },
          // { key: 'reporting.toll_detail', to: '/todo' }
        ]
      },
      // {
      //   key: 'navigation.custom',
      //   items: [
      //     { key: 'navigation.vehicle_and_driver', to: '/todo' },
      //     { key: 'navigation.maintenance', to: '/todo' },
      //     { key: 'navigation.fuel', to: '/todo' },
      //     { key: 'navigation.invoice', to: '/todo' },
      //     { key: 'navigation.insurance_claim', to: '/todo' },
      //     { key: 'navigation.violation', to: '/todo' },

      //   ]
      // },
      {
        key: 'reports.invoicing',
        icon: '',
        items: [
          // { key: 'reporting.invoice_history', to: '/todo' },
          // { key: 'reporting.custom_invoicing', to: '/todo' }
        ]
      },
      {
        key: 'reports.services',
        icon: '',
        items: [
          // { key: 'reporting.evoucher', to: '/todo' },
          // { key: 'reporting.license_renewal', to: '/todo' },
          // { key: 'reporting.driver_360_mileage', to: '/todo' },
          // { key: 'reporting.accident_claim', to: '/todo' }
        ]
      },
      {
        key: 'reports.safety_and_telematics',
        icon: '',
        items: [
          // { key: 'reporting.saferoads_fleet_summary', to: '/todo' },
          // { key: 'reporting.saferoads_trip_detail', to: '/todo' },
          // { key: 'reporting.engine_faults', to: '/todo' },
          // { key: 'reporting.driver_safety', to: '/todo' },
          // { key: 'reporting.driver_record', to: '/todo' }
        ]
      }
    ]
  })
  // mounted () {
  //   // this.reporting_categories = reports.categories
  //   // this.reporting_categories = this.$axios.get('/static/')
  //   import('../static/data/reports.js').then(({ default: categories }) => {
  //     debugger
  //     this.reporting_categories = categories
  //   })
  // }
}
</script>

<style>

</style>
