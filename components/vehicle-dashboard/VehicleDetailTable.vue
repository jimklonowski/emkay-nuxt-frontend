<template>
  <v-list subheader>
    <v-subheader>{{ $t('vehicle_details') }}</v-subheader>
    <v-list-item v-for="(row, r) in rows" :key="`row-${r}`">
      <v-list-item-title v-text="row.text" />
      <v-list-item-subtitle v-text="row.value" />
    </v-list-item>
  </v-list>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      driver_name: 'vehicle-dashboard/getDriverName',
      vehicle_details: 'vehicle-dashboard/getVehicleDetails',
      year_make_model: 'vehicle-dashboard/getYearMakeModel'
    }),
    rows () {
      return [
        {
          text: this.$i18n.t('status'),
          value: this.vehicle_details.status
        },
        {
          text: this.$i18n.t('vehicle_number'),
          value: this.vehicle_details.vehicle_number
        },
        {
          text: this.$i18n.t('driver_name'),
          value: this.driver_name
        },
        {
          text: this.$i18n.t('vin'),
          value: this.vehicle_details.vin
        },
        {
          text: this.$i18n.t('license_plate_number'),
          value: this.vehicle_details.license_plate_number
        },
        {
          text: this.$i18n.t('year_make_model'),
          value: this.year_make_model
        }
      ]
    }
  }
}
</script>
