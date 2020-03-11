<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <vehicle-widget />
      </v-col>
      <v-col cols="12" lg="6">
        <driver-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <fuel-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <maintenance-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <billing-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <licensing-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <odometer-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <toll-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <accident-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <rental-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <violation-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <inspection-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <order-status-widget v-if="hasOrderStatus" />
        <pre v-else>No order status found, skipping order status widget.</pre>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
/**
 * Vehicle Dashboard (widgets)
 */
export default {
  name: 'VehicleDashboard',
  components: {
    'vehicle-widget': () => import(/* webpackChunkName: "VehicleWidget" */ `@/components/vehicle-dashboard/VehicleWidget`),
    'driver-widget': () => import(/* webpackChunkName: "DriverWidget" */ `@/components/vehicle-dashboard/DriverWidget`),
    'order-status-widget': () => import(/* webpackChunkName: "OrderStatusWidget" */ `@/components/vehicle-dashboard/OrderStatusWidget`),
    'fuel-widget': () => import(/* webpackChunkName: "FuelWidget" */ `@/components/vehicle-dashboard/FuelWidget`),
    'maintenance-widget': () => import(/* webpackChunkName: "MaintenanceWidget" */ `@/components/vehicle-dashboard/MaintenanceWidget`),
    'billing-widget': () => import(/* webpackChunkName: "BillingWidget" */ `@/components/vehicle-dashboard/BillingWidget`),
    'licensing-widget': () => import(/* webpackChunkName: "LicensingWidget" */ `@/components/vehicle-dashboard/LicensingWidget`),
    'odometer-widget': () => import(/* webpackChunkName: "OdometerWidget" */ `@/components/vehicle-dashboard/OdometerWidget`),
    'toll-widget': () => import(/* webpackChunkName: "TollWidget" */ `@/components/vehicle-dashboard/TollWidget`),
    'accident-widget': () => import(/* webpackChunkName: "AccidentWidget" */ `@/components/vehicle-dashboard/AccidentWidget`),
    'rental-widget': () => import(/* webpackChunkName: "RentalWidget" */ `@/components/vehicle-dashboard/RentalWidget`),
    'violation-widget': () => import(/* webpackChunkName: "ViolationWidget" */ `@/components/vehicle-dashboard/ViolationWidget`),
    'inspection-widget': () => import(/* webpackChunkName: "InspectionWidget" */ `@/components/vehicle-dashboard/InspectionWidget`)
  },
  computed: {
    ...mapGetters({
      hasOrderStatus: 'vehicle-dashboard/hasOrderStatus'
    })
  },
  async asyncData ({ params, store }) {
    await store.dispatch('vehicle-dashboard/init', { vehicle: params.vehicle })
  },
  methods: {
    ...mapActions({
      initialize: 'vehicle-dashboard/init'
    })
  },
  head () {
    const title = `${this.$route.params.vehicle} - ${this.$t('vehicle_dashboard')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
