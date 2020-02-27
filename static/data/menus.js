/**
 * Management Mega Menu Config
 */
const management = {
  to: { path: '/management' },
  categories: [
    {
      key: 'fleet',
      icon: '',
      items: [
        { key: 'manage_your_online_users', icon: '', to: { path: '/management/online-users' } },
        { key: 'fleet_policies', icon: 'mdi-database-settings', to: { path: '/management/fleet-policies' } },
        { key: 'customize_fleet_labels', icon: 'mdi-label-variant', to: { path: '/management/fleet-labels' } },
        { key: 'manage_your_drivers', icon: 'mdi-account-settings', to: { path: '/management/drivers' } },
        { key: 'manage_your_driver_fuel_pins', icon: '', to: { path: '/management/driver-fuel-pins' } },
        { key: 'manage_your_enotifications', icon: '', to: { path: '/management/enotifications' } },
        { key: 'manage_your_cases', icon: '', to: { path: '/management/cases' } },
        { key: 'fuel_authorization_profiles', icon: '', to: { path: '/management/fuel-auth-profiles' } }
      ]
    },
    {
      key: 'customization',
      icon: '',
      items: [
        { key: 'approve_your_maintenance_repairs', icon: '', to: { path: '/management/approve-maintenance-repairs' } },
        { key: 'approve_driver_orders', icon: '', to: { path: '/management/approve-driver-orders' } },
        { key: 'request_an_mvr', icon: '', to: { path: '/management/request-mvr' } },
        { key: 'upload_your_odometers', icon: '', to: { path: '/management/upload-odometers' } }
      ]
    },
    {
      key: 'tools',
      icon: '',
      items: [
        { key: 'fleet_navigator', icon: 'mdi-compass', to: { path: '/management/fleet-navigator' } },
        { key: 'ev_charging_locations', icon: 'mdi-car-electric', to: { path: '/management/charging-locations' } },
        { key: 'locate_preferred_shops', icon: '', to: { path: '/management/locate-preferred-shops' } },
        { key: 'quote_a_transport', icon: '', to: { path: '/management/transport-quote' } },
        { key: 'lcca', icon: '', to: { path: '/management/lcca' } }
      ]
    }
  ]
}

/**
 * Ordering Mega Menu Config
 */
const ordering = {
  to: { path: '/ordering' },
  categories: [
    {
      key: 'orders',
      icon: '',
      color: '',
      items: [
        { key: 'place_factory_orders', icon: 'mdi-car-door', to: { path: '/ordering/place-factory-orders' } },
        { key: 'place_stock_orders', icon: 'mdi-car-door-lock', to: { path: '/ordering/place-stock-orders' } },
        { key: 'view_order_requests', icon: 'mdi-counter', to: { path: '/ordering/view-order-requests' } }
      ]
    },
    {
      key: 'driver_ordering',
      icon: '',
      color: '',
      items: [
        { key: 'manage_driver_order_settings', icon: 'mdi-account-settings', to: { path: '/ordering/manage-driver-order-settings' } },
        { key: 'allow_drivers_to_order', icon: 'mdi-shield-car', to: { path: '/ordering/allow-drivers-to-order' } },
        { key: 'approve_driver_orders', icon: 'mdi-check-decagram', to: { path: '/ordering/approve-driver-orders' } }
      ]
    },
    {
      key: 'selectors',
      icon: '',
      color: '',
      items: [
        { key: 'manage_selectors', icon: 'mdi-settings', to: { path: '/ordering/manage-selectors' } },
        { key: 'manage_selector_groups', icon: 'mdi-folder-settings-variant', to: { path: '/ordering/manage-selector-groups' } }
      ]
    }
  ]
}

/**
 * Reporting Mega Menu Config
 */
const reports = {
  to: { path: '/reporting' },
  categories: [
    {
      key: 'fleet',
      icon: '',
      items: [
        { key: 'inventory_report', icon: 'mdi-bus-multiple', to: { path: '/reporting/inventory' } },
        { key: 'order_status_report', icon: 'mdi-bus-clock', to: { path: '/reporting/order-status' } },
        { key: 'replacement_analysis', icon: 'mdi-find-replace', to: { path: '/reporting/replacement-analysis' } },
        { key: 'sold_vehicle_analysis', icon: 'mdi-sim', to: { path: '/reporting/sold-vehicle-analysis' } }
      ]
    },
    {
      key: 'expenses',
      icon: '',
      items: [
        { key: 'expense_detail', icon: 'mdi-currency-usd', to: { path: '/reporting/expense-detail' } },
        { key: 'fuel_detail', icon: 'mdi-gas-station', to: { path: '/reporting/fuel-detail' } },
        { key: 'maintenance_detail', icon: 'mdi-wrench', to: { path: '/reporting/maintenance-detail' } },
        { key: 'short_term_rental_detail', icon: 'mdi-bus-clock', to: { path: '/reporting/short-term-rental-detail' } },
        { key: 'toll_detail', icon: 'mdi-coins', to: { path: '/reporting/toll-detail' } }
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
        { key: 'invoice_history', icon: 'mdi-receipt', to: { path: '/reporting/invoice-history' } }
      ]
    },
    {
      key: 'services',
      icon: '',
      items: [
        { key: 'accident_claim_status', icon: 'mdi-car-traction-control', to: { path: '/reporting/accident-claim-status' } },
        { key: 'driver_360_mileage', icon: 'mdi-cellphone-iphone', to: { path: '/reporting/driver-360-mileage' } },
        { key: 'evoucher_report', icon: 'mdi-ticket-percent', to: { path: '/reporting/evoucher-report' } },
        { key: 'license_renewal_report', icon: 'mdi-calendar-question', to: { path: '/reporting/license-renewal' } }
      ]
    },
    {
      key: 'safety_and_telematics',
      icon: '',
      items: [
        { key: 'driver_record', icon: 'mdi-history', to: { path: '/reporting/driver-record' } },
        { key: 'driver_safety_report', icon: 'mdi-safety-goggles', to: { path: '/reporting/driver-safety-report' } },
        { key: 'engine_faults', icon: 'mdi-engine', to: { path: '/reporting/engine-faults' } },
        { key: 'saferoads_fleet_summary', icon: 'mdi-train-car', to: { path: '/reporting/saferoads-fleet-summary' } },
        { key: 'saferoads_trip_detail', icon: 'mdi-map-clock', to: { path: '/reporting/saferoads-trip-detail' } }
      ]
    }
  ]
}

export { management, ordering, reports }
