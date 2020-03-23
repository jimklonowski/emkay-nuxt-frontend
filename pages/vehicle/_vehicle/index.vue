<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <vehicle-widget />
      </v-col>
      <v-col cols="12" lg="6">
        <driver-widget />
      </v-col>
      <v-col cols="12">
        <expense-summary-widget />
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
        <order-status-widget />
        <!-- <pre v-else>No order status found, skipping order status widget.</pre> -->
      </v-col>
      <v-col cols="12" xl="6">
        <sale-info-widget />
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
    'vehicle-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/VehicleWidget`),
    'driver-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/DriverWidget`),
    'expense-summary-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/ExpenseSummaryWidget`),
    'fuel-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/FuelWidget`),
    'maintenance-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/MaintenanceWidget`),
    'billing-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/BillingWidget`),
    'licensing-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/LicensingWidget`),
    'odometer-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/OdometerWidget`),
    'toll-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/TollWidget`),
    'accident-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/AccidentWidget`),
    'rental-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/RentalWidget`),
    'violation-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/ViolationWidget`),
    'inspection-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/InspectionWidget`),
    'order-status-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/OrderStatusWidget`),
    'sale-info-widget': () => import(/* webpackChunkName: "VehicleDashboardWidgets" */ `@/components/vehicle-dashboard/widgets/SaleInfoWidget`)
  },
  computed: {
    ...mapGetters({
      hasOrderStatus: 'vehicle-dashboard/hasOrderStatus'
    })
  },
  // async asyncData ({ params, store }) {
  //   await store.dispatch('vehicle-dashboard/init', { vehicle: params.vehicle })
  // },
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
