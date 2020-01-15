<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        {{ $t('reassign_vehicle') }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ReassignVehicle',
  head () {
    const title = this.$t('reassign_vehicle')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
