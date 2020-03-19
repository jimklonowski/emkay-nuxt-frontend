<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <report-expenses-form :vehicle-number="vehicle_number">
          <template #details>
            <v-list class="font-lato" subheader>
              <v-subheader>{{ $t('vehicle_details') }}</v-subheader>
              <v-list-item>
                <v-list-item-title>{{ $t('status') }}</v-list-item-title>
                <v-list-item-subtitle>{{ vehicle_details.status }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{ $t('driver_name') }}</v-list-item-title>
                <v-list-item-subtitle>{{ driverName }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{ $t('vin') }}</v-list-item-title>
                <v-list-item-subtitle>{{ vehicle_details.vin }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{ $t('license_plate_number') }}</v-list-item-title>
                <v-list-item-subtitle>{{ vehicle_details.license_plate_number }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{ $t('year_make_model') }}</v-list-item-title>
                <v-list-item-subtitle>{{ yearMakeModel }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </template>
        </report-expenses-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VehicleDashboardReportExpenses',
  components: {
    'report-expenses-form': () => import(/* webpackChunkName: "ReportExpensesForm" */ `@/components/vehicle-dashboard/forms/ReportExpensesForm`)
    // 'vehicle-detail-table': () => import(/* webpackChunkName: "VehicleDetailTable" */ `@/components/vehicle-dashboard/VehicleDetailTable`)
  },
  data: () => ({
    title: 'report expenses?'
  }),
  computed: {
    ...mapGetters({
      vehicle_number: 'vehicle-dashboard/getVehicleNumber',
      vehicle_details: 'vehicle-dashboard/getVehicleDetails',
      driverName: 'vehicle-dashboard/getDriverName',
      yearMakeModel: 'vehicle-dashboard/getYearMakeModel'
    })
  }
}
</script>
