<template>
  <v-container fill-height fluid pa-0>
    <v-row v-show="!initialized" justify="center" no-gutters>
      <v-card color="primary" width="300" dark>
        <v-card-text>
          {{ $t('building_fleet_dashboard') }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-row>
    <iframe
      v-show="initialized"
      :src="src"
      @load="frameLoaded"
      style="position:absolute;border:none;"
      height="100%"
      width="100%"
    />
  </v-container>
</template>

<script>
export default {
  name: 'FleetDashboard',
  data: vm => ({
    initialized: false,
    src: null,
    title: vm.$i18n.t('fleet_dashboard')
  }),
  computed: {
    fleetDashboardUrl: vm => `${process.env.FLEET_DASHBOARD_URL}/Authorize?customer=${vm.$auth.user.account}&username=${vm.$auth.user.username}`
  },
  mounted () {
    this.src = this.fleetDashboardUrl
  },
  methods: {
    frameLoaded () {
      console.log('Fleet Dashboard Loaded.')
      this.initialized = true
    }
  },
  head () {
    const title = this.$t('fleet_dashboard')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
