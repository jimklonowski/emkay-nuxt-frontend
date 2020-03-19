<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <report-expenses-form :vehicle-number="vehicle_number">
          <template #details>
            <vehicle-detail-table />
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
    'report-expenses-form': () => import(/* webpackChunkName: "ReportExpensesForm" */ `@/components/vehicle-dashboard/forms/ReportExpensesForm`),
    'vehicle-detail-table': () => import(/* webpackChunkName: "VehicleDetailTable" */ `@/components/vehicle-dashboard/VehicleDetailTable`)
  },
  computed: {
    ...mapGetters({
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
    })
  }
}
</script>
