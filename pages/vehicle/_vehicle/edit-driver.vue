<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <driver-details-form :driver-id="driver_number">
          <template #title>
            {{ $t('edit_driver') }}
          </template>
          <template #subtitle>
            {{ driver_number }}
          </template>
          <template #history>
            <driver-vehicle-history :driver-id="driver_number" />
          </template>
        </driver-details-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'edit-driver',
  components: {
    'driver-details-form': () => import(/* webpackChunkName: "DriverDetailsForm" */ `@/components/driver/DriverDetailsForm.vue`),
    'driver-vehicle-history': () => import(/* webpackChunkName: "DriverHistory" */ `@/components/driver/DriverVehicleHistory.vue`)
  },
  head () {
    const title = this.$t('edit_driver')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  computed: {
    ...mapGetters({
      driver_number: 'vehicle-dashboard/getDriverNumber'
    })
  }
}
</script>
