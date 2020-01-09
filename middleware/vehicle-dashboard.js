export default async ({ app, params, store }) => {
  // if there is a vehicle number param
  if (params.vehicle) {
    // if the current vuex vehicle# doesn't match the vehicle param or if the vehicle_info state is empty
    if (Object.keys(store.state.vehicle.vehicle_info).length === 0 || store.getters['vehicle/getVehicleNumber'] !== params.vehicle) {
      // initialize vehicle dashboard summary
      const filters = {
        command: 'WEBVEHICLE',
        customer: 'EM102',
        vehicle_number: params.vehicle
      }
      console.log(`Fetching vehicle summary for ${params.vehicle}`)
      await store.dispatch('vehicle/reset')
      await store.dispatch('vehicle/fetchVehicleDashboardSummary', filters)
    }
  }
}
