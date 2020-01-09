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
        <v-card outlined>
          <v-tabs v-model="tabs" height="75" grow show-arrows>
            <v-tab @click="setHash('#status')" v-t="'transport_status'" />
            <v-tab @click="setHash('#quote')" v-t="'transport_storage_quote'" />
            <v-tab @click="setHash('#create')" v-t="'create_order'" />
          </v-tabs>
          <v-divider />
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-data-table
                :items="items"
                :headers="headers"
                class="striped"
              />
            </v-tab-item>
            <v-tab-item>
              <TransportStorageRequestQuote ref="quoteForm" @createOrder="createOrderFromQuote" />
            </v-tab-item>
            <v-tab-item>
              <TransportStorageCreateOrder ref="orderForm" />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TransportStorageCreateOrder from '@/components/vehicle/transtor/TransportStorageCreateOrder'
import TransportStorageRequestQuote from '@/components/vehicle/transtor/TransportStorageRequestQuote'
import { headers } from '@/mixins/datatables'
import { vehicleRoute } from '@/mixins/routing'
export default {
  name: 'TransportsAndStorage',
  components: {
    TransportStorageCreateOrder,
    TransportStorageRequestQuote
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
  async mounted () {
    if (!this.vehicleNumber) {
      const filters = {
        command: 'WEBVEHICLE',
        customer: 'EM102',
        vehicle_number: this.$route.params.vehicle
      }
      await this.$store.dispatch('vehicle/fetchVehicleDashboardSummary', filters)
    }
    const vehicle_number = this.vehicleNumber || ''

    const filters = {
      command: 'TRANSTOR',
      customer: 'EM102',
      vehicle_number,
      json: 'Y'
    }
    await this.$store.dispatch('vehicle/fetchTransportStatus', filters)
    this.initialized = true
    if (this.$route.hash) {
      console.log(this.$route.hash)
      // switch tab based on hash
      if (this.$route.hash === '#status') {
        this.tabs = 0
      } else if (this.$route.hash === '#quote') {
        this.tabs = 1
      } else if (this.$route.hash === '#create') {
        this.tabs = 2
      }
      // remove hash
      // this.$router.replace({ hash: '' })
    }
    // this.initTest()
  },
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
