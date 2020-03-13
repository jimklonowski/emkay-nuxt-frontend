/**
 * Account Management Mega Menu Config
 */
const account = {
  to: { path: '/account' },
  categories: [
    {
      key: 'fleet',
      icon: '',
      items: [
        { key: 'manage_your_online_users', icon: '', to: { path: '/account/online-users' } },
        { key: 'fleet_policies', icon: 'mdi-database-settings', to: { path: '/account/fleet-policies' } },
        { key: 'customize_fleet_labels', icon: 'mdi-label-variant', to: { path: '/account/customize-fleet-labels' } },
        { key: 'manage_your_drivers', icon: 'mdi-account-settings', to: { path: '/account/drivers' } },
        { key: 'manage_your_driver_fuel_pins', icon: '', to: { path: '/account/driver-fuel-pins' } },
        { key: 'manage_your_enotifications', icon: '', to: { path: '/account/enotifications' } },
        { key: 'manage_your_cases', icon: '', to: { path: '/account/cases' } },
        { key: 'fuel_authorization_profiles', icon: '', to: { path: '/account/fuel-auth-profiles' } }
      ]
    },
    {
      key: 'customization',
      icon: '',
      items: [
        { key: 'approve_your_maintenance_repairs', icon: '', to: { path: '/account/approve-maintenance-repairs' } },
        { key: 'approve_driver_orders', icon: '', to: { path: '/account/approve-driver-orders' } },
        { key: 'request_an_mvr', icon: '', to: { path: '/account/request-mvr' } },
        { key: 'upload_your_odometers', icon: '', to: { path: '/account/upload-odometers' } }
      ]
    },
    {
      key: 'tools',
      icon: '',
      items: [
        { key: 'centers', icon: 'mdi-test-tube', to: { path: '/account/centers' } },
        { key: 'critical_alerts', icon: 'mdi-bell-ring', to: { path: '/account/critical-alerts' } },
        { key: 'fleet_navigator', icon: 'mdi-compass', to: { path: '/account/fleet-navigator' } },
        { key: 'ev_charging_locations', icon: 'mdi-car-electric', to: { path: '/account/charging-locations' } },
        { key: 'locate_preferred_shops', icon: '', to: { path: '/account/locate-preferred-shops' } },
        { key: 'quote_a_transport', icon: '', to: { path: '/account/transport-quote' } },
        { key: 'lcca', icon: '', to: { path: '/account/lcca' } }
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
        { key: 'inventory_report', icon: 'mdi-bus-multiple', to: { path: '/reporting/inventory-report' } },
        { key: 'order_status_report', icon: 'mdi-bus-clock', to: { path: '/reporting/order-status-report' } },
        { key: 'replacement_analysis_report', icon: 'mdi-find-replace', to: { path: '/reporting/replacement-analysis-report' } },
        { key: 'sold_vehicle_analysis_report', icon: 'mdi-sim', to: { path: '/reporting/sold-vehicle-analysis-report' } }
      ]
    },
    {
      key: 'expenses',
      icon: '',
      items: [
        { key: 'expense_detail_report', icon: 'mdi-currency-usd', to: { path: '/reporting/expense-detail-report' } },
        { key: 'fuel_detail_report', icon: 'mdi-gas-station', to: { path: '/reporting/fuel-detail-report' } },
        { key: 'maintenance_detail_report', icon: 'mdi-wrench', to: { path: '/reporting/maintenance-detail-report' } },
        { key: 'short_term_rental_detail_report', icon: 'mdi-bus-clock', to: { path: '/reporting/short-term-rental-detail-report' } },
        { key: 'toll_detail_report', icon: 'mdi-coins', to: { path: '/reporting/toll-detail-report' } }
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
        { key: 'invoice_history_report', icon: 'mdi-receipt', to: { path: '/reporting/invoice-history-report' } }
      ]
    },
    {
      key: 'services',
      icon: '',
      items: [
        { key: 'accident_claim_status_report', icon: 'mdi-car-traction-control', to: { path: '/reporting/accident-claim-status-report' } },
        { key: 'driver_360_mileage_report', icon: 'mdi-cellphone-iphone', to: { path: '/reporting/driver-360-mileage-report' } },
        { key: 'evoucher_report', icon: 'mdi-ticket-percent', to: { path: '/reporting/evoucher-report' } },
        { key: 'license_renewal_report', icon: 'mdi-calendar-question', to: { path: '/reporting/license-renewal-report' } }
      ]
    },
    {
      key: 'safety_and_telematics',
      icon: '',
      items: [
        { key: 'driver_record_report', icon: 'mdi-history', to: { path: '/reporting/driver-record-report' } },
        { key: 'driver_safety_report', icon: 'mdi-safety-goggles', to: { path: '/reporting/driver-safety-report' } },
        { key: 'engine_faults_report', icon: 'mdi-engine', to: { path: '/reporting/engine-faults-report' } },
        { key: 'saferoads_fleet_summary_report', icon: 'mdi-train-car', to: { path: '/reporting/saferoads-fleet-summary-report' } },
        { key: 'saferoads_trip_detail_report', icon: 'mdi-map-clock', to: { path: '/reporting/saferoads-trip-detail-report' } }
      ]
    }
  ]
}

export { account, ordering, reports }
