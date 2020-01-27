<template>
  <v-card outlined>
    <v-card-title class="font-lato">
      {{ $t('manage_selectors') }}
    </v-card-title>
    <v-card-text class="pa-0">
      todo: manage selectors
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ManageSelectors',
  head () {
    const title = this.$t('manage_selectors')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
