<template>
  <v-card outlined>
    <v-card-title class="font-lato">
      {{ $t('place_factory_orders') }}
    </v-card-title>
    <v-card-text class="pa-0">
      todo: factory order form
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PlaceFactoryOrders',
  head () {
    const title = this.$t('place_factory_orders')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
