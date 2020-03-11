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
        <licensing-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <billing-widget />
      </v-col>
      <v-col v-if="showOrderStatusWidget" cols="12" xl="6">
        <order-status-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <expense-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <odometer-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <toll-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <rental-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <accident-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <violation-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <inspections-widget />
      </v-col>
      <!-- <v-col cols="12" xl="6">
        <documents-and-notes-widget />
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import DriverWidget from '@/components/vehicle/DriverWidget'
import VehicleWidget from '@/components/vehicle/VehicleWidget'
import FuelWidget from '@/components/vehicle/FuelWidget'
import MaintenanceWidget from '@/components/vehicle/MaintenanceWidget'
import ExpenseWidget from '@/components/vehicle/ExpenseWidget'
import OdometerWidget from '@/components/vehicle/OdometerWidget'
import BillingWidget from '@/components/vehicle/BillingWidget'
import AccidentWidget from '@/components/vehicle/AccidentWidget'
import TollWidget from '@/components/vehicle/TollWidget'
import ViolationWidget from '@/components/vehicle/ViolationWidget'
import OrderStatusWidget from '@/components/vehicle/OrderStatusWidget'
import RentalWidget from '@/components/vehicle/RentalWidget'
import InspectionsWidget from '@/components/vehicle/InspectionsWidget'
import LicensingWidget from '@/components/vehicle/LicensingWidget'
// import DocumentsAndNotesWidget from '@/components/vehicle/DocumentsAndNotesWidget'
/**
 * Vehicle Dashboard (widgets)
 */
export default {
  name: 'VehicleDashboard',
  /* eslint-disable vue/no-unused-components */
  components: {
    VehicleWidget,
    DriverWidget,
    FuelWidget,
    MaintenanceWidget,
    AccidentWidget,
    OdometerWidget,
    TollWidget,
    ExpenseWidget,
    BillingWidget,
    ViolationWidget,
    // DocumentsAndNotesWidget,
    RentalWidget,
    OrderStatusWidget,
    InspectionsWidget,
    LicensingWidget

    // 'fuel-table': () => import('@/components/vehicle/FuelTable'),
    // 'maintenance-table': () => import('@/components/vehicle/MaintenanceTable'),
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      showOrderStatusWidget: 'vehicle/hasOrderStatus'
    })
  },
  async asyncData ({ error, params, store }) {
    await store.dispatch('vehicle/init', { vehicle: params.vehicle })
    if (!store.getters['vehicle/vehicleExists']) {
      // if no vehicleDetails object after fetching, throw an error
      error({ statusCode: 404, key: 'invalid_vehicle_number' })
    }
  },
  head () {
    const title = `${this.$route.params.vehicle} - ${this.$t('vehicle_dashboard')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  /**
   * If validator doesn't return true (or a promise resolving to true), or throws an error, nuxt will load the 404 or 500 error pages
   * https://nuxtjs.org/guide/routing/#validate-route-params
   */
  validate ({ error, params, store }) {
    // if there's no vehicle parameter, throw an error
    return (params && !!params.vehicle)
      ? true
      : error({ statusCode: 404, key: 'invalid_vehicle_number' })
  }
}
</script>
