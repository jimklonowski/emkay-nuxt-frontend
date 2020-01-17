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
    <v-row>
      <v-col cols="12">
        <v-card outlined shaped>
          <v-toolbar flat>
            <v-toolbar-title class="hidden-sm-and-down">
              {{ $t('accident') }}
              <span class="overline text--disabled">{{ $route.params.vehicle }}</span>
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { vehicleRoute } from '@/mixins/routing'
export default {
  name: 'Accident',
  mixins: [vehicleRoute]
}
</script>
