<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-toolbar height="72" tile>
          <v-tabs
            optional
            grow
            centered
            icons-and-text
          >
            <v-tab :to="`${vehicleRoute}/fuel`" exact nuxt>
              {{ $t('fuel_history') }}
            </v-tab>
            <v-tab :to="`${vehicleRoute}/fuel/fuel-cards`" nuxt>
              {{ $t('fuel_cards') }}
            </v-tab>
            <v-tab :to="`${vehicleRoute}/fuel/fuel-authorization-profiles`" nuxt>
              {{ $t('fuel_authorization_profiles') }}
            </v-tab>
          </v-tabs>
        </v-toolbar>
        <v-divider />
      </v-col>
      <v-col cols="12">
        <!-- the child views -->
        <nuxt-child />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { vehicleRoute } from '@/mixins/routing'
export default {
  name: 'VehicleFuel',
  mixins: [vehicleRoute]
}
</script>
