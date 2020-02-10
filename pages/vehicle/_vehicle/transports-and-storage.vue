<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn :to="vehicleRoute" exact nuxt text>
          <v-icon v-text="'mdi-chevron-left'" class="mr-2" />
          {{ $t('to_vehicle_dashboard') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-toolbar height="72" elevation="1" tile>
          <v-tabs
            optional
            grow
            centered
            icons-and-text
          >
            <v-tab :to="`${vehicleRoute}/transports-and-storage/`" exact nuxt>
              {{ $t('transport_status') }}
            </v-tab>
            <v-tab :to="`${vehicleRoute}/transports-and-storage/request-quote`" nuxt>
              {{ $t('request_quote') }}
            </v-tab>
            <v-tab :to="`${vehicleRoute}/transports-and-storage/create-order`" nuxt>
              {{ $t('create_order') }}
            </v-tab>
          </v-tabs>
        </v-toolbar>
        <v-divider />
      </v-col>
      <v-col cols="12">
        <!-- the child views (quote/create) -->
        <nuxt-child />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { vehicleRoute } from '@/mixins/routing'
export default {
  name: 'TransportsAndStorage',
  mixins: [vehicleRoute],
  data: () => ({}),
  computed: {
    vehicle_info: vm => vm.$store.getters['vehicle/getVehicleInfo']
  },
  mounted () {
    console.log('resetting transtor')
    // reset any old quotes from vuex
    this.$store.dispatch('transtor/reset')
  },
  head () {
    const title = this.$t('transports_and_storage')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  methods: {
    setTab (value) {
      this.tabs = value
    },
    setHash (hash) {
      if (this.$route.hash === hash) {
        // just return to prevent NavigationDuplicated errors by not re-using the current exact route
        return
      }
      this.$router.replace(hash)
    }
  }

}
</script>
