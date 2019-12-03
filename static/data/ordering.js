export default {
  categories: [
    {
      key: 'ordering.orders.category',
      icon: 'mdi-timeline-text',
      color: '',
      items: [
        { key: 'ordering.orders.place_factory_orders.title', icon: 'mdi-car-door', to: { path: '/ordering/todo' } },
        { key: 'ordering.orders.place_stock_orders.title', icon: 'mdi-car-door-lock', to: { path: '/ordering/todo' } },
        { key: 'ordering.orders.view_order_requests.title', icon: 'mdi-counter', to: { path: '/ordering/todo' } }
      ]
    },
    {
      key: 'ordering.driver_orders.category',
      icon: 'mdi-cash-register',
      color: '',
      items: [
        { key: 'ordering.driver_orders.manage_driver_order_settings.title', icon: 'mdi-account-settings', to: { path: '/ordering/todo' } },
        { key: 'ordering.driver_orders.allow_drivers_to_order.title', icon: 'mdi-shield-car', to: { path: '/ordering/todo' } },
        { key: 'ordering.driver_orders.approve_driver_orders.title', icon: 'mdi-check-decagram', to: { path: '/ordering/todo' } }
      ]
    },
    {
      key: 'ordering.selectors.category',
      icon: 'mdi-chart-timeline',
      color: '',
      items: [
        { key: 'ordering.selectors.manage_selectors.title', icon: 'mdi-settings', to: { path: '/ordering/todo' } },
        { key: 'ordering.selectors.manage_selector_groups.title', icon: 'mdi-folder-settings-variant', to: { path: '/ordering/todo' } }
      ]
    }
  ]
}
