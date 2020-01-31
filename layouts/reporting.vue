<template>
  <v-app>
    <emkay-navigation />
    <v-content>
      <report-navigation />
      <v-container>
        <v-row>
          <v-col cols="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
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
import ReportNavigation from '@/components/reporting/ReportNavigation'
/**
 * Reporting Layout page
 */
export default {
  components: {
    EmkayFooter,
    EmkayNavigation,
    ReportNavigation
  },
  middleware: ['check-auth'],
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
