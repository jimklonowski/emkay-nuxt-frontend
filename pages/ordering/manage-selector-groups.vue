<template>
  <v-card outlined>
    <v-card-title class="font-lato">
      {{ $t('manage_selector_groups') }}
    </v-card-title>
    <v-card-text class="pa-0">
      todo: manage selector groups
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ManageSelectorGroups',
  head () {
    const title = this.$t('manage_selector_groups')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
