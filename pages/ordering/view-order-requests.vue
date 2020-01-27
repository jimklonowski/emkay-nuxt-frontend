<template>
  <v-card outlined>
    <v-card-title class="font-lato">
      {{ $t('view_order_requests') }}
    </v-card-title>
    <v-card-text class="pa-0">
      todo: order requests
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ViewOrderRequests',
  head () {
    const title = this.$t('view_order_requests')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
