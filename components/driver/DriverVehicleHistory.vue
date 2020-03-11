<template>
  <v-simple-table dense>
    <template #default>
      <caption class="caption text-left">
        These vehicles are currently assigned to driver #{{ driverId }}.
      </caption>
      <thead>
        <tr>
          <th>{{ $t('vehicle') }}</th>
          <th>{{ $t('model_year') }}</th>
          <th>{{ $t('vehicle_model') }}</th>
          <th>{{ $t('status') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, r) in vehicle_history" :key="`row-${r}`">
          <td v-for="(column, c) in row" :key="`col-${c}`">
            {{ column }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    driverId: {
      type: String,
      default: ''
    }
  },
  computed: {
    vehicle_history: vm => vm.$store.getters['driver/getVehicleHistory']
  }
}
</script>
