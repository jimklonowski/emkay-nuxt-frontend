<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn :to="vehicleRoute" exact nuxt text>
          <v-icon v-text="'mdi-chevron-left'" class="mr-2" />
          {{ $t('to_vehicle_dashboard') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TransportStorageStatus />
      </v-col>
    </v-row>
    <v-toolbar height="72px" elevation="4">
      <v-tabs
        optional
        grow
        centered
        icons-and-text
      >
        <v-tab :to="`${vehicleRoute}/transports-and-storage/request-quote`" nuxt>
          request quote
        </v-tab>
        <v-tab :to="`${vehicleRoute}/transports-and-storage/create-order`" nuxt>
          create order
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-divider />
    <nuxt-child />
    <!-- <v-btn :to="`${vehicleRoute}/transports-and-storage/transport-order`" nuxt>
      transport order
    </v-btn>
    <v-btn :to="`${vehicleRoute}/transports-and-storage/storage-order`" nuxt>
      storage order
    </v-btn>
    <v-btn :to="`${vehicleRoute}/transports-and-storage/from-storage-order`" nuxt>
      transport out of storage order
    </v-btn> -->
  </v-container>
</template>

<script>
import TransportStorageStatus from '@/components/vehicle/transtor/TransportStorageStatus'
import { headers } from '@/mixins/datatables'
import { vehicleRoute } from '@/mixins/routing'
export default {
  name: 'TransportsAndStorage',
  components: {
    TransportStorageStatus
  },
  mixins: [headers, vehicleRoute],
  data: () => ({
    currentStep: 1,
    tabs: 0
  }),
  computed: {
    addressTypes () {
      return [
        {
          text: this.$i18n.t('residential'),
          value: 'Residential'
        },
        {
          text: this.$i18n.t('business'),
          value: 'Business'
        }
      ]
    },
    phoneTypes () {
      return [
        {
          text: this.$i18n.t('home'),
          value: 'Home'
        },
        {
          text: this.$i18n.t('cell'),
          value: 'Cell'
        },
        {
          text: this.$i18n.t('office'),
          value: 'Office'
        }
      ]
    },
    columns () {
      return [
        'order_date',
        'order_#',
        'pickup_location',
        'delivery_location',
        'actions'
      ]
    },
    vehicle_info: vm => vm.$store.getters['vehicle/getVehicleInfo'],
    vehicleNumber: vm => vm.$store.getters['vehicle/getVehicleNumber'],
    items: vm => vm.$store.getters['vehicle/getTransportStatus']
  },
  mounted () {
    console.log('resetting transtor')
    // reset any old quotes from vuex
    this.$store.dispatch('transtor/reset')
  },
  // async mounted () {
  //   if (!this.vehicleNumber) {
  //     const filters = {
  //       command: 'WEBVEHICLE',
  //       customer: 'EM102',
  //       vehicle_number: this.$route.params.vehicle
  //     }
  //     await this.$store.dispatch('vehicle/fetchVehicleDashboardSummary', filters)
  //   }
  //   const vehicle_number = this.vehicleNumber || ''

  //   const filters = {
  //     command: 'TRANSTOR',
  //     customer: 'EM102',
  //     vehicle_number,
  //     json: 'Y'
  //   }
  //   await this.$store.dispatch('vehicle/fetchTransportStatus', filters)
  //   this.initialized = true
  //   if (this.$route.hash) {
  //     console.log(this.$route.hash)
  //     // switch tab based on hash
  //     if (this.$route.hash === '#status') {
  //       this.tabs = 0
  //     } else if (this.$route.hash === '#quote') {
  //       this.tabs = 1
  //     } else if (this.$route.hash === '#create') {
  //       this.tabs = 2
  //     }
  //     // remove hash
  //     // this.$router.replace({ hash: '' })
  //   }
  //   // this.initTest()
  // },
  methods: {
    createOrderFromQuote () {
      // $refs.orderForm was undefined until I started wrapping the call in a setTimeout.  nextTick did not work either.  I believe is an animation timing issue
      setTimeout(() => {
        // call init method in createOrder component
        this.$refs.orderForm.init()
      }, 300)
      // switch to create tab
      this.setTab(2)
    },
    setTab (value) {
      this.tabs = value
    },
    setHash (hash) {
      if (this.$route.hash === hash) {
        // just return to prevent NavigationDuplicated errors by not re-using the current exact route
        return
      }
      this.$router.replace(hash)
    }
  }

}
</script>
