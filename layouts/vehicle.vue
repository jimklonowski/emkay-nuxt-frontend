<template>
  <v-app>
    <emkay-navigation />
    <v-content>
      <vehicle-dashboard-navigation />
      <vehicle-dashboard-breadcrumbs />
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
import VehicleDashboardNavigation from '@/components/vehicle/VehicleDashboardNavigation'
import VehicleDashboardBreadcrumbs from '@/components/vehicle/VehicleDashboardBreadcrumbs'
/**
 * Vehicle Dashboard Layout page
 */
export default {
  components: {
    VehicleDashboardBreadcrumbs,
    EmkayFooter,
    EmkayNavigation,
    VehicleDashboardNavigation
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
