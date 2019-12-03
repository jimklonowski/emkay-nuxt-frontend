export default {
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
      color: 'primary',
      icon: '',
      items: [
        { key: 'reports.expenses.expense_summary.report', icon: '', to: { path: '/reporting/todo' } },
        { key: 'reports.expenses.fuel_detail.report', icon: 'mdi-gas-station', to: { path: '/reporting/fuel-detail' } },
        { key: 'reports.expenses.maintenance_detail.report', icon: '', to: { path: '/reporting/todo' } },
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
