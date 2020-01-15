<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        {{ $t('order_status') }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'OrderStatus',
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
