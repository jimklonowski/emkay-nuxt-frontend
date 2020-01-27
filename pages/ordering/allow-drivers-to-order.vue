<template>
  <v-card outlined>
    <v-card-title class="font-lato">
      {{ $t('allow_drivers_to_order') }}
    </v-card-title>
    <v-card-text class="pa-0">
      todo: allow drivers to order
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AllowDriversToOrder',
  head () {
    const title = this.$t('allow_drivers_to_order')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
