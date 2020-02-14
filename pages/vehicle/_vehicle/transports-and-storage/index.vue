<template>
  <v-card flat tile class="report">
    <v-divider />
    <v-card-title>
      {{ $t('transport_status') }}
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-data-table
        :items="items"
        :headers="headers"
        :dense="items && items.length !== 0"
        class="striped"
      />
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * Transport/Storage Status Datatable
 */
export default {
  name: 'TransportsAndStorageStatus',
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
    headers () {
      return [
        {
          text: this.$i18n.t('order_date'),
          value: 'order_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('order_#'),
          value: 'order_#',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('pickup_location'),
          value: 'pickup_location',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('delivery_location'),
          value: 'delivery_location',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('actions'),
          value: 'actions',
          class: 'report-column'
        }
      ]
    },
    items: vm => vm.$store.getters['vehicle/getTransportStatus']
  },
  async asyncData ({ store }) {
    const vehicle = store.getters['vehicle/getVehicleNumber']
    await store.dispatch('vehicle/fetchTransportStatus', { vehicle })
  }
}
</script>
