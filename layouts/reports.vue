<template>
  <v-app>
    <emkay-navigation />
    <v-content>
      <nuxt />
    </v-content>
    <client-only>
      <vue-snotify />
    </client-only>
    <emkay-footer />
  </v-app>
</template>

<script>
import EmkayFooter from '@/components/EmkayFooter'
import EmkayNavigation from '@/components/EmkayNavigation'

export default {
  components: {
    EmkayFooter,
    EmkayNavigation
  },
  data: () => ({
    rightDrawer: true,
    right: true
  })
}
</script>
