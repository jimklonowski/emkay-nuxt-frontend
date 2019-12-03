<template>
  <v-btn>test</v-btn>
</template>

<script>
export default {
  data: () => ({
    tab: 0,
    menu: false,
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
    ]
  })
}
</script>
