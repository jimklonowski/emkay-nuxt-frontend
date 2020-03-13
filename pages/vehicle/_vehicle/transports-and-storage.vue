<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined tile>
          <v-card-title class="pa-0">
            <v-toolbar height="72" elevation="1" tile>
              <v-tabs
                centered
                grow
                icons-and-text
                optional
              >
                <v-tab :to="transtorRoute" exact nuxt>
                  {{ $t('transport_status') }}
                  <v-icon v-text="'mdi-calendar-clock'" />
                </v-tab>
                <v-tab :to="transtorQuoteRoute" nuxt>
                  {{ $t('request_quote') }}
                  <v-icon v-text="'mdi-poll-box'" />
                </v-tab>
                <v-tab :to="transtorOrderRoute" nuxt>
                  {{ $t('create_order') }}
                  <v-icon v-text="'mdi-truck-delivery'" />
                </v-tab>
              </v-tabs>
            </v-toolbar>
          </v-card-title>
          <v-divider />
          <!-- the child views (quote/create) -->
          <nuxt-child />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { vehicleRoute } from '@/mixins/routing'
export default {
  name: 'TransportsAndStorage',
  mixins: [vehicleRoute],
  data: () => ({}),
  computed: {
    ...mapGetters({
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
    }),
    transtorRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/transports-and-storage` }),
    transtorQuoteRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/transports-and-storage/request-quote` }),
    transtorOrderRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/transports-and-storage/create-order` })
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
