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
        <v-card outlined>
          <v-card-title>{{ $t('expenses') }}</v-card-title>
          <v-card-text class="px-0">
            <v-data-table />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { vehicleRoute } from '@/mixins/routing'
export default {
  name: 'Expenses',
  mixins: [vehicleRoute]
}
</script>
