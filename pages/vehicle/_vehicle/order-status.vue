<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        {{ $t('order_status') }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <order-status-widget />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrderStatusWidget from '@/components/vehicle-dashboard/OrderStatusWidget'
export default {
  name: 'OrderStatus',
  components: { OrderStatusWidget },
  head () {
    const title = this.$t('order_status')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
