<template>
  <v-app>
    <emkay-navigation />
    <v-content>
      <my-reports-navigation />
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
import MyReportsNavigation from '@/components/my-reports/MyReportsNavigation'
/**
 * Reporting Layout page
 */
export default {
  components: {
    EmkayFooter,
    EmkayNavigation,
    MyReportsNavigation
  },
  middleware: ['check-auth', 'account'],
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
