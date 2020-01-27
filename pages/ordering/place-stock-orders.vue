<template>
  <v-card outlined>
    <v-card-title class="font-lato">
      {{ $t('place_stock_orders') }}
    </v-card-title>
    <v-card-text class="pa-0">
      todo: stock order form
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PlaceStockOrders',
  head () {
    const title = this.$t('place_stock_orders')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
