<template>
  <v-flex>
    <v-app-bar
      :src="require('@/assets/dash1.jpg')"
      :elevate-on-scroll="false"
      style="position:sticky; top:64px; left: 0; right: 0;z-index:4;"
      dark
      extended
      prominent
      flat
      hide-on-scroll
      scroll-threshold="60"
    >
      <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        />
      </template>
      <v-toolbar-title class="display-1">
        {{ $t('navigation.vehicle_dashboard') }}
        <!-- <v-list-item-subtitle>{{ $route.params.vehicle }}</v-list-item-subtitle> -->
      </v-toolbar-title>
      <v-spacer />
      <template #extension>
        <v-toolbar-items>
          <v-btn text x-small>
            Edit Custom Labels
          </v-btn>
          <v-btn text x-small>
            Re-Assign Vehicle
          </v-btn>
          <v-btn text x-small>
            <v-icon small class="mr-1">
              mdi-timetable
            </v-icon>
            Order Status
          </v-btn>
        </v-toolbar-items>
        <v-spacer />

        <v-btn title="Edit Vehicle" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-container>
      <v-row style="top:64px;">
        <v-col v-for="(item, key) in layout" :key="key" v-bind="item.flex">
          <!-- eslint-disable-next-line vue/require-component-is -->
          <component :is="item.is" :expand.sync="item.expand" @expand="item.expand = !item.expand" />
        </v-col>
      </v-row>
    </v-container>
  </v-flex>
</template>

<script>
import AccidentCard from '@/components/vehicle/AccidentCard'
import DriverCard from '@/components/vehicle/DriverCard'
import FuelCard from '@/components/vehicle/FuelCard'
import InvoiceCard from '@/components/vehicle/InvoiceCard'
import MaintenanceCard from '@/components/vehicle/MaintenanceCard'
import TollCard from '@/components/vehicle/TollCard'
import ViolationCard from '@/components/vehicle/ViolationCard'
import VehicleCard from '@/components/vehicle/VehicleCard'

export default {
  name: 'VehicleDashboard',
  /* eslint-disable vue/no-unused-components */
  components: {
    AccidentCard,
    DriverCard,
    FuelCard,
    InvoiceCard,
    MaintenanceCard,
    TollCard,
    VehicleCard,
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
        is: 'fuel-card',
        flex: { cols: 12, sm: 6, md: 6, lg: 4, xl: 4 },
        expand: false
      },
      {
        is: 'accident-card',
        flex: { cols: 12, sm: 6, md: 6, lg: 4, xl: 4 },
        expand: false
      },
      {
        is: 'maintenance-card',
        flex: { cols: 12, sm: 6, md: 4, lg: 4, xl: 4 },
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
    // To test, vehicle param must be a number
    return /^[a-z0-9]+$/i.test(params.vehicle)
  }
}
</script>

<style></style>
