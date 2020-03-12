export default async ({ app, params, store }) => {
  if (params.vehicle) {
    const vehicle = store.getters['vehicle-dashboard/getVehicleNumber']
    if (!vehicle || params.vehicle !== vehicle) {
      // If vehicleNumber in vuex is missing, or if current vehicle# doesnt match vehicle param: call init
      await store.dispatch('vehicle-dashboard/init', { vehicle: params.vehicle })
    }
  }
}
