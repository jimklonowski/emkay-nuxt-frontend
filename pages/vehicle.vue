<template>
  <span>
    <v-container v-if="!$route.params.vehicle" class="vehicle-hero" fill-height>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <vehicle-search />
        </v-col>
      </v-row>
    </v-container>
    <!-- If a vehicle is selected, show the nested /vehicle/_vehicle route -->
    <nuxt-child v-else />
  </span>
</template>

<script>
import VehicleSearch from '@/components/VehicleSearch'

export default {
  name: 'Vehicle',
  components: { VehicleSearch }
}
</script>

<style>
.vehicle-hero::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.theme--dark .vehicle-hero::before {
  background-image: url(~@/assets/coveredcar--dark.jpg);
  opacity: 0.5;
}
.theme--light .vehicle-hero::before {
  background-image: url(~@/assets/coveredcar--light.jpg);
  opacity: 1.0;
}
</style>
