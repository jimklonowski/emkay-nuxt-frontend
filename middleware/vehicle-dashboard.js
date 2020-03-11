export default async ({ app, params, store }) => {
  if (params.vehicle) {
    if (!store.getters['vehicle-dashboard/getVehicleNumber'] || params.vehicle !== store.getters['vehicle-dashboard/getVehicleNumber']) {
      // If vehicleNumber in vuex is missing, or if current vehicle# doesnt match vehicle param: call init
      await store.dispatch('vehicle-dashboard/init', { vehicle: params.vehicle })
    }
  }
}
