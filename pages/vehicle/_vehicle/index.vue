<template>
  <v-flex>
    <v-container>
      <v-row style="top:64px;">
        <v-col cols="12" lg="6">
          <vehicle-widget />
        </v-col>
        <v-col cols="12" lg="6">
          <driver-widget :driver="getDriverInfo" />
        </v-col>
        <v-col cols="12" xl="6">
          <fuel-widget />
        </v-col>
        <v-col cols="12" xl="6">
          <maintenance-widget />
        </v-col>
        <v-col cols="12" xl="6">
          <expense-widget />
        </v-col>
        <v-col cols="12" xl="6">
          <billing-widget />
        </v-col>
        <v-col cols="12" xl="6">
          <toll-widget />
        </v-col>
        <v-col cols="12" xl="6">
          <accident-widget />
        </v-col>
      </v-row>
    </v-container>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
import DriverWidget from '@/components/vehicle/DriverWidget'
import VehicleWidget from '@/components/vehicle/VehicleWidget'
import FuelWidget from '@/components/vehicle/FuelWidget'
import MaintenanceWidget from '@/components/vehicle/MaintenanceWidget'
import ExpenseWidget from '@/components/vehicle/ExpenseWidget'
import BillingWidget from '@/components/vehicle/BillingWidget'
import AccidentWidget from '@/components/vehicle/AccidentWidget'
import TollWidget from '@/components/vehicle/TollWidget'
import ViolationWidget from '@/components/vehicle/ViolationWidget'

export default {
  name: 'VehicleDashboard',
  /* eslint-disable vue/no-unused-components */
  components: {
    VehicleWidget,
    DriverWidget,
    FuelWidget,
    MaintenanceWidget,
    AccidentWidget,
    TollWidget,
    ExpenseWidget,
    BillingWidget,
    // 'fuel-table': () => import('@/components/vehicle/FuelTable'),
    // 'maintenance-table': () => import('@/components/vehicle/MaintenanceTable'),

    ViolationWidget
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      getVehicleInfo: 'vehicle/getVehicleInfo',
      getDriverInfo: 'vehicle/getDriverInfo'
    })
  },
  async asyncData ({ store }) {
    // await console.log('asyncData()')
  },
  // async fetch ({ params, store }) {
  //   // clear previous vehicle state
  //   console.log('clearing vehicle state before fetching new vehicle')
  //   await store.dispatch('vehicle/reset')
  //   // console.log('fetching the vehicle summary before sending data to individual vehicle dashboard components')
  //   if (params.vehicle) {
  //     // const filters = { vehicle: params.vehicle }
  //     const filters = {
  //       command: 'WEBVEHICLE',
  //       customer: 'EM102',
  //       vehicle_number: params.vehicle
  //     }
  //     if (!store.getters['account/getCustomLabels']) {
  //       console.log('refreshing custom labels')
  //       await store.dispatch('account/init')
  //     }
  //     await store.dispatch('vehicle/fetchVehicleDashboardSummary', filters)
  //   }
  // },
  head () {
    const title = `${this.$route.params.vehicle} - ${this.$t('vehicle_dashboard')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  methods: {
    expand () {
      alert('expand in vehicle dashboard')
    }
  },
  middleware: ['auth'],
  /**
   * If validator doesn't return true (or a promise reolving to true), or throws an error, nuxt will load the 404 or 500 error pages
   * https://nuxtjs.org/guide/routing/#validate-route-params
   */
  validate ({ params }) {
    // To test, vehicle param must be alphanumeric
    // return true
    return /^[a-z0-9]+$/i.test(params.vehicle)
  }
}
</script>

<style></style>
