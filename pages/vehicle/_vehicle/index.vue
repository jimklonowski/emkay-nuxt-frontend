<template>
  <v-flex>
    <v-container>
      <v-row style="top:64px;">
        <v-col cols="12" lg="6">
          <vehicle-card />
        </v-col>
        <v-col cols="12" lg="6">
          <driver-card :driver="getDriverInfo" />
        </v-col>
        <v-col cols="12" xl="6">
          <fuel-table />
        </v-col>
        <v-col cols="12" xl="6">
          <maintenance-table />
        </v-col>
        <v-col cols="12" xl="6">
          <toll-card />
        </v-col>
      </v-row>
    </v-container>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
import DriverCard from '@/components/vehicle/DriverCard'
import VehicleCard from '@/components/vehicle/VehicleCard'
import FuelTable from '@/components/vehicle/FuelTable'
import MaintenanceTable from '@/components/vehicle/MaintenanceTable'

import AccidentCard from '@/components/vehicle/AccidentCard'
import InvoiceCard from '@/components/vehicle/InvoiceCard'
import TollCard from '@/components/vehicle/TollCard'
import ViolationCard from '@/components/vehicle/ViolationCard'

export default {
  name: 'VehicleDashboard',
  /* eslint-disable vue/no-unused-components */
  components: {
    VehicleCard,
    DriverCard,
    FuelTable,
    MaintenanceTable,
    // 'fuel-table': () => import('@/components/vehicle/FuelTable'),
    // 'maintenance-table': () => import('@/components/vehicle/MaintenanceTable'),

    AccidentCard,
    InvoiceCard,
    TollCard,
    ViolationCard
  },
  data: () => ({
    layout: [
      {
        is: 'vehicle-card',
        flex: { cols: 12, sm: 12, md: 6, lg: 6, xl: 6 }
      },
      {
        is: 'driver-card',
        flex: { cols: 12, sm: 12, md: 6, lg: 6, xl: 6 }
      },
      {
        is: 'accident-card',
        flex: { cols: 12, sm: 6, md: 6, lg: 4, xl: 4 },
        expand: false
      },
      {
        is: 'invoice-card',
        flex: { cols: 12, sm: 6, md: 4, lg: 4, xl: 3 },
        expand: false
      },
      {
        is: 'toll-card',
        flex: { cols: 12, sm: 6, md: 4, lg: 4, xl: 3 },
        expand: false
      },
      {
        is: 'violation-card',
        flex: { cols: 12, sm: 6, md: 4, lg: 4, xl: 3 },
        expand: false
      }
    ]

    // breakpoints: { lg: 1904, md: 1264, sm: 960, xs: 600, xxs: 0 },
    // layout: [
    //   { x: 0, y: 0, w: 6, h: 10, i: 0, is: 'vehicle-card' },
    //   { x: 6, y: 0, w: 6, h: 10, i: 1, is: 'driver-card' },
    //   { x: 0, y: 10, w: 4, h: 6, i: 2, is: 'fuel-card' },
    //   { x: 4, y: 10, w: 4, h: 6, i: 3, is: 'accident-card' },
    //   { x: 8, y: 10, w: 4, h: 6, i: 4, is: 'invoice-card' },
    //   { x: 0, y: 20, w: 6, h: 6, i: 5, is: 'maintenance-card' },
    //   { x: 4, y: 20, w: 6, h: 6, i: 6, is: 'toll-card' },
    //   { x: 8, y: 30, w: 6, h: 6, i: 7, is: 'violation-card' }
    // ]
  }),
  computed: {
    ...mapGetters({
      getVehicleInfo: 'vehicle/getVehicleInfo',
      getDriverInfo: 'vehicle/getDriverInfo',
      getCustomLabels: 'account/getCustomLabels'
    })
  },
  async asyncData ({ store }) {
    // await console.log('asyncData()')
  },
  async fetch ({ params, store }) {
    // clear previous vehicle state
    console.log('clearing vehicle state before fetching new vehicle')
    await store.dispatch('vehicle/reset')
    // console.log('fetching the vehicle summary before sending data to individual vehicle dashboard components')
    if (params.vehicle) {
      // const filters = { vehicle: params.vehicle }
      const filters = {
        command: 'WEBVEHICLE',
        customer: 'EM102',
        vehicle_number: params.vehicle
      }
      if (!store.getters['account/getCustomLabels']) {
        console.log('refreshing custom labels')
        await store.dispatch('account/init')
      }
      await store.dispatch('vehicle/fetchVehicleDashboardSummary', filters)
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
