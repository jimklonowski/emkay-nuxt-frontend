<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined tile>
          <v-card-title class="pa-0">
            <v-toolbar height="72" tile elevation="1">
              <v-tabs
                centered
                grow
                icons-and-text
                optional
              >
                <v-tab :to="`${vehicleRoute}/fuel`" exact nuxt>
                  {{ $t('fuel_history') }}
                  <v-icon v-text="'mdi-gas-station'" />
                </v-tab>
                <v-tab :to="`${vehicleRoute}/fuel/fuel-cards`" nuxt>
                  {{ $t('fuel_cards') }}
                  <v-icon v-text="'mdi-credit-card'" />
                </v-tab>
                <v-tab :to="`${vehicleRoute}/fuel/fuel-authorization-profiles`" nuxt>
                  {{ $t('fuel_authorization_profiles') }}
                  <v-icon v-text="'mdi-clipboard-account'" />
                </v-tab>
              </v-tabs>
            </v-toolbar>
          </v-card-title>
          <v-divider />
          <nuxt-child />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-toolbar height="72" tile elevation="1">
          <v-tabs
            centered
            grow
            icons-and-text
            optional
            class="thin-border"
          >
            <v-tab :to="`${vehicleRoute}/fuel`" exact nuxt>
              {{ $t('fuel_history') }}
              <v-icon v-text="'mdi-gas-station'" />
            </v-tab>
            <v-tab :to="`${vehicleRoute}/fuel/fuel-cards`" nuxt>
              {{ $t('fuel_cards') }}
              <v-icon v-text="'mdi-credit-card'" />
            </v-tab>
            <v-tab :to="`${vehicleRoute}/fuel/fuel-authorization-profiles`" nuxt>
              {{ $t('fuel_authorization_profiles') }}
              <v-icon v-text="'mdi-clipboard-account'" />
            </v-tab>
          </v-tabs>
        </v-toolbar>
      </v-col>
      <v-col cols="12">
        <nuxt-child />
      </v-col>
    </v-row>
  </v-container> -->
</template>

<script>
import { vehicleRoute } from '@/mixins/routing'
export default {
  name: 'VehicleFuel',
  mixins: [vehicleRoute]
}
</script>
