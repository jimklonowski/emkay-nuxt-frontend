export default {
  categories: [
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
}
