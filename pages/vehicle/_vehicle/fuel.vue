<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined tile>
          <v-toolbar height="72" tile flat color="transparent">
            <v-tabs
              centered
              grow
              icons-and-text
              optional
              show-arrows
            >
              <v-tab :to="fuelRoute" nuxt>
                {{ $t('fuel_history') }}
                <v-icon v-text="'mdi-gas-station'" />
              </v-tab>
              <v-tab :to="fuelCardRoute" nuxt>
                {{ $t('fuel_cards') }}
                <v-icon v-text="'mdi-credit-card'" />
              </v-tab>
              <v-tab :to="fuelProfilesRoute" nuxt>
                {{ $t('fuel_authorization_profiles') }}
                <v-icon v-text="'mdi-clipboard-account'" />
              </v-tab>
            </v-tabs>
          </v-toolbar>
          <nuxt-child />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VehicleFuel',
  computed: {
    ...mapGetters({
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    fuelRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/fuel` }),
    fuelCardRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/fuel/fuel-cards` }),
    fuelProfilesRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/fuel/fuel-authorization-profiles` })
  }
}
</script>
