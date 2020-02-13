<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>eVoucher</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VehicleMaintenanceEVoucher',
  computed: {
    ...mapGetters({
      vehicle_number: 'vehicle/getVehicleNumber'
    })
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$i18n.t('evoucher')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
