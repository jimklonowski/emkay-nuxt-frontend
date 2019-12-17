/**
 * Management Mega Menu Config
 */
const management = {
  categories: [
    {
      key: 'fleet',
      icon: '',
      items: [
        { key: 'manage_your_online_users', icon: '', to: { path: '/management/todo' } },
        { key: 'manage_your_fleet_policies', icon: '', to: { path: '/management/todo' } },
        { key: 'customize_fleet_labels', icon: '', to: { path: '/management/todo' } },
        { key: 'manage_your_drivers', icon: '', to: { path: '/management/todo' } },
        { key: 'manage_your_driver_fuel_pins', icon: '', to: { path: '/management/todo' } },
        { key: 'manage_your_enotifications', icon: '', to: { path: '/management/todo' } },
        { key: 'manage_your_cases', icon: '', to: { path: '/management/todo' } },
        { key: 'fuel_authorization_profiles', icon: '', to: { path: '/management/todo' } }
      ]
    },
    {
      key: 'customization',
      icon: '',
      items: [
        { key: 'approve_your_maintenance_repairs', icon: '', to: { path: '/management/todo' } },
        { key: 'approve_driver_orders', icon: '', to: { path: '/management/todo' } },
        { key: 'request_an_mvr', icon: '', to: { path: '/management/todo' } },
        { key: 'upload_your_odometers', icon: '', to: { path: '/management/todo' } }
      ]
    },
    {
      key: 'tools',
      icon: '',
      items: [
        { key: 'locate_preferred_shops', icon: '', to: { path: '/management/todo' } },
        { key: 'quote_a_transport', icon: '', to: { path: '/management/todo' } },
        { key: 'lcca', icon: '', to: { path: '/management/todo' } }
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
      key: 'orders',
      icon: 'mdi-timeline-text',
      color: '',
      items: [
        { key: 'place_factory_orders', icon: 'mdi-car-door', to: { path: '/ordering/todo' } },
        { key: 'place_stock_orders', icon: 'mdi-car-door-lock', to: { path: '/ordering/todo' } },
        { key: 'view_order_requests', icon: 'mdi-counter', to: { path: '/ordering/todo' } }
      ]
    },
    {
      key: 'driver_ordering',
      icon: 'mdi-cash-register',
      color: '',
      items: [
        { key: 'manage_driver_order_settings', icon: 'mdi-account-settings', to: { path: '/ordering/todo' } },
        { key: 'allow_drivers_to_order', icon: 'mdi-shield-car', to: { path: '/ordering/todo' } },
        { key: 'approve_driver_orders', icon: 'mdi-check-decagram', to: { path: '/ordering/todo' } }
      ]
    },
    {
      key: 'selectors',
      icon: 'mdi-chart-timeline',
      color: '',
      items: [
        { key: 'manage_selectors', icon: 'mdi-settings', to: { path: '/ordering/todo' } },
        { key: 'manage_selector_groups', icon: 'mdi-folder-settings-variant', to: { path: '/ordering/todo' } }
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
      key: 'fleet',
      icon: '',
      items: [
        { key: 'inventory_report', icon: '', to: { path: '/reporting/inventory' } },
        { key: 'order_status_report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'replacement_analysis', icon: '', to: { path: '/reporting/todo' } },
        { key: 'sold_vehicle_analysis', icon: '', to: { path: '/reporting/todo' } }
      ]
    },
    {
      key: 'expenses',
      icon: '',
      items: [
        { key: 'expense_summary', icon: '', to: { path: '/reporting/todo' } },
        { key: 'fuel_detail', icon: 'mdi-gas-station', to: { path: '/reporting/fuel-detail' } },
        { key: 'maintenance_detail', icon: 'mdi-wrench', to: { path: '/reporting/maintenance-detail' } },
        { key: 'short_term_rental_detail', icon: '', to: { path: '/reporting/todo' } },
        { key: 'toll_detail', icon: '', to: { path: '/reporting/todo' } }
      ]
    },
    // {
    //   key: 'custom',
    //   icon: '',
    //   items: [
    //     { key: 'reports.custom.fuel.report', icon: '', to: { path: '/reporting/todo' } },
    //     { key: 'reports.custom.insurance_claim.report', icon: '', to: { path: '/reporting/todo' } },
    //     { key: 'reports.custom.invoice.report', icon: '', to: { path: '/reporting/todo' } },
    //     { key: 'reports.custom.maintenance.report', icon: '', to: { path: '/reporting/todo' } },
    //     { key: 'reports.custom.vehicle_and_driver.report', icon: '', to: { path: '/reporting/todo' } },
    //     { key: 'reports.custom.violation.report', icon: '', to: { path: '/reporting/todo' } }

    //   ]
    // },
    {
      key: 'invoicing',
      icon: '',
      items: [
        { key: 'custom_invoicing', icon: '', to: { path: '/reporting/todo' } },
        { key: 'invoice_history', icon: '', to: { path: '/reporting/todo' } }
      ]
    },
    {
      key: 'services',
      icon: '',
      items: [
        { key: 'accident_claim_report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'driver_360_mileage', icon: '', to: { path: '/reporting/todo' } },
        { key: 'evoucher', icon: '', to: { path: '/reporting/todo' } },
        { key: 'license_renewal_report', icon: '', to: { path: '/reporting/todo' } }
      ]
    },
    {
      key: 'safety_and_telematics',
      icon: '',
      items: [
        { key: 'driver_record', icon: '', to: { path: '/reporting/todo' } },
        { key: 'driver_safety_report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'engine_faults', icon: '', to: { path: '/reporting/todo' } },
        { key: 'saferoads_fleet_summary', icon: '', to: { path: '/reporting/todo' } },
        { key: 'saferoads_trip_detail', icon: '', to: { path: '/reporting/todo' } }
      ]
    }
  ]
}

export { management, ordering, reports }
