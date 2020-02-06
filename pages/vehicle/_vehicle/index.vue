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
      <v-col v-if="showOrderStatusWidget" cols="12" xl="6">
        <order-status-widget />
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
      <v-col cols="12" xl="6">
        <violation-widget />
      </v-col>
      <v-col cols="12" xl="6">
        <notes-widget />
      </v-col>
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
import BillingWidget from '@/components/vehicle/BillingWidget'
import AccidentWidget from '@/components/vehicle/AccidentWidget'
import TollWidget from '@/components/vehicle/TollWidget'
import ViolationWidget from '@/components/vehicle/ViolationWidget'
import OrderStatusWidget from '@/components/vehicle/OrderStatusWidget'
import NotesWidget from '@/components/vehicle/NotesWidget'
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
    TollWidget,
    ExpenseWidget,
    BillingWidget,
    ViolationWidget,
    NotesWidget,
    OrderStatusWidget

    // 'fuel-table': () => import('@/components/vehicle/FuelTable'),
    // 'maintenance-table': () => import('@/components/vehicle/MaintenanceTable'),
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      showOrderStatusWidget: 'vehicle/hasOrderStatus'
    })
  },
  async asyncData ({ store }) {
    // await console.log('asyncData()')
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
