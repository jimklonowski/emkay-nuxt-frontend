<template>
  <v-app>
    <emkay-navigation />
    <v-content>
      <vehicle-dashboard-navigation v-if="$route.params.vehicle" />
      <!-- main vehicle dashboard router-view -->
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

export default {
  components: {
    EmkayFooter,
    EmkayNavigation,
    VehicleDashboardNavigation
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
