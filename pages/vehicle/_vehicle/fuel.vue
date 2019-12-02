<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="display-2 font-weight-thin">
        Fuel Dashboard
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-btn @click="$router.go(-1)" text>
          Back
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <fuel-card :showMore="true" />
    </v-row>
  </v-container>
</template>

<script>
import FuelCard from '@/components/vehicle/FuelCard'
export default {
  name: 'Fuel',
  components: {
    FuelCard
  }
}
</script>

<style>

</style>
