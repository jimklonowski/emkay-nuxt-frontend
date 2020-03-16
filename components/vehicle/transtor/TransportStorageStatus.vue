<template>
  <v-card outlined>
    <v-card-title v-text="$t('transport_status')" />
    <v-data-table
      :items="items"
      :headers="headers"
      class="striped"
    />
  </v-card>
</template>

<script>
import { headers } from '@/mixins/datatables'
export default {
  mixins: [headers],
  computed: {
    columns () {
      return [
        'order_date',
        'order_#',
        'pickup_location',
        'delivery_location',
        'actions'
      ]
    },
    vehicle_number: vm => vm.$store.getters['vehicle-dashboard/getVehicleNumber'],
    items: vm => vm.$store.getters['vehicle-dashboard/getTransportStatus']
  },
  async mounted () {
    const filters = {
      command: 'TRANSTOR',
      customer: 'EM102',
      vehicle_number: this.vehicleNumber,
      json: 'Y'
    }
    await this.$store.dispatch('vehicle-dashboard/fetchTransportStatus', filters)
  }
}
</script>
