<template>
  <v-card outlined>
    <v-card-title class="font-lato">
      {{ $t('approve_driver_orders') }}
    </v-card-title>
    <v-card-text class="pa-0">
      todo: approve driver orders
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ApproveDriverOrders',
  head () {
    const title = this.$t('approve_driver_orders')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
