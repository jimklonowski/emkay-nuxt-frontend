<template>
  <v-app>
    <emkay-navigation />
    <v-content>
      <management-navigation />
      <nuxt />
    </v-content>
    <emkay-footer />
    <client-only>
      <vue-snotify />
    </client-only>
  </v-app>
</template>

<script>
import EmkayFooter from '@/components/EmkayFooter'
import EmkayNavigation from '@/components/EmkayNavigation'
import ManagementNavigation from '@/components/management/ManagementNavigation'
/**
 * Management Layout page
 */
export default {
  components: {
    EmkayFooter,
    EmkayNavigation,
    ManagementNavigation
  },
  head () {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale || 'en'
      }
    }
  },
  mounted () {
    this.$meta().setOptions({ debounceWait: 50 })
  }
}
</script>

<style>

</style>
