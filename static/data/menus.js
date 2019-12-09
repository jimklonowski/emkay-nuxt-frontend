/**
 * Management Mega Menu Config
 */
const management = {
  categories: [
    {
      key: 'management.fleet.category',
      icon: '',
      items: [
        { key: 'management.fleet.manage_your_online_users', icon: '', to: { path: '/management/todo' } },
        { key: 'management.fleet.manage_your_fleet_policies', icon: '', to: { path: '/management/todo' } },
        { key: 'management.fleet.customize_your_fleet_labels', icon: '', to: { path: '/management/todo' } },
        { key: 'management.fleet.manage_your_drivers', icon: '', to: { path: '/management/todo' } },
        { key: 'management.fleet.manage_your_driver_fuel_pins', icon: '', to: { path: '/management/todo' } },
        { key: 'management.fleet.manage_your_enotifications', icon: '', to: { path: '/management/todo' } },
        { key: 'management.fleet.manage_your_cases', icon: '', to: { path: '/management/todo' } },
        { key: 'management.fleet.view_your_fuel_auth_profiles', icon: '', to: { path: '/management/todo' } }
      ]
    },
    {
      key: 'management.customization.category',
      icon: '',
      items: [
        { key: 'management.customization.approve_your_maintenance_repairs', icon: '', to: { path: '/management/todo' } },
        { key: 'management.customization.approve_your_driver_orders', icon: '', to: { path: '/management/todo' } },
        { key: 'management.customization.request_an_mvr', icon: '', to: { path: '/management/todo' } },
        { key: 'management.customization.upload_your_odometers', icon: '', to: { path: '/management/todo' } }
      ]
    },
    {
      key: 'management.tools.category',
      icon: '',
      items: [
        { key: 'management.tools.locate_preferred_shops', icon: '', to: { path: '/management/todo' } },
        { key: 'management.tools.quote_a_transport', icon: '', to: { path: '/management/todo' } },
        { key: 'management.tools.lcca', icon: '', to: { path: '/management/todo' } }
      ]
    }
  ]
}

/**
 * Ordering Mega Menu Config
 */
const ordering = {
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

/**
 * Reporting Mega Menu Config
 */
const reports = {
  categories: [
    {
      key: 'reports.fleet.category',
      icon: '',
      items: [
        { key: 'reports.fleet.inventory.report', icon: '', to: { path: '/reporting/inventory' } },
        { key: 'reports.fleet.order_status.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.fleet.replacement_analysis.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.fleet.sold_vehicle_analysis.report', icon: '', to: { path: '/reporting/todo' } }
      ]
    },
    {
      key: 'reports.expenses.category',
      icon: '',
      items: [
        { key: 'reports.expenses.expense_summary.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.expenses.fuel_detail.report', icon: 'mdi-gas-station', to: { path: '/reporting/fuel-detail' } },
        { key: 'reports.expenses.maintenance_detail.report', icon: 'mdi-wrench', to: { path: '/reporting/maintenance-detail' } },
        { key: 'reports.expenses.short_term_rental_detail.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.expenses.toll_detail.report', icon: '', to: { path: '/reporting/todo' } }
      ]
    },
    {
      key: 'reports.custom.category',
      icon: '',
      items: [
        { key: 'reports.custom.fuel.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.custom.insurance_claim.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.custom.invoice.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.custom.maintenance.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.custom.vehicle_and_driver.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.custom.violation.report', icon: '', to: { path: '/reporting/todo' } }

      ]
    },
    {
      key: 'reports.invoicing.category',
      icon: '',
      items: [
        { key: 'reports.invoicing.custom_invoicing.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.invoicing.invoice_history.report', icon: '', to: { path: '/reporting/todo' } }
      ]
    },
    {
      key: 'reports.services.category',
      icon: '',
      items: [
        { key: 'reports.services.accident_claim.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.services.driver_360_mileage.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.services.evoucher.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.services.license_renewal.report', icon: '', to: { path: '/reporting/todo' } }
      ]
    },
    {
      key: 'reports.safety_and_telematics.category',
      icon: '',
      items: [
        { key: 'reports.safety_and_telematics.driver_record.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.safety_and_telematics.driver_safety.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.safety_and_telematics.engine_faults.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.safety_and_telematics.saferoads_fleet_summary.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.safety_and_telematics.saferoads_trip_detail.report', icon: '', to: { path: '/reporting/todo' } }
      ]
    }
  ]
}

export { management, ordering, reports }
