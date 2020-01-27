<template>
  <v-card outlined>
    <v-card-title class="font-lato">
      {{ $t('manage_driver_order_settings') }}
    </v-card-title>
    <v-card-text class="pa-0">
      todo: manage driver ordering
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ManageDriverOrderSettings',
  head () {
    const title = this.$t('manage_driver_order_settings')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
