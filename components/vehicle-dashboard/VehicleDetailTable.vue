<template>
  <v-simple-table dense class="font-lato">
    <template #default>
      <tbody>
        <tr>
          <th class="text-right">
            {{ $t('vehicle_number') }}
          </th>
          <td class="text-left">
            {{ vehicle_details.vehicle_number || '--' }}
          </td>
        </tr>
        <tr>
          <th class="text-right">
            {{ $t('client_vehicle_number') }}
          </th>
          <td class="text-left">
            {{ vehicle_details.client_vehicle_number || '--' }}
          </td>
        </tr>
        <tr>
          <th class="text-right">
            {{ $t('year_make_model') }}
          </th>
          <td class="text-left">
            {{ yearMakeModel }}
          </td>
        </tr>
        <tr>
          <th class="text-right">
            {{ $t('vin') }}
          </th>
          <td class="text-left">
            {{ vehicle_details.vin }}
          </td>
        </tr>
        <tr>
          <th class="text-right">
            {{ $t('driver_name') }}
          </th>
          <td class="text-left">
            {{ driverName }}
          </td>
        </tr>
        <tr>
          <th class="text-right">
            {{ $t('address') }}
          </th>
          <td class="text-left">
            {{ driverAddress }}
          </td>
        </tr>
        <tr>
          <th class="text-right">
            {{ $t('city_state_zip') }}
          </th>
          <td class="text-left">
            {{ driverCityStateZip }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      driver_details: 'vehicle-dashboard/getDriverDetails',
      vehicle_details: 'vehicle-dashboard/getVehicleDetails'
    }),
    driverAddress () {
      return [this.driver_details.address_1, this.driver_details.address_2].filter(Boolean).join(' ')
    },
    driverCityStateZip () {
      const city_state = [this.driver_details.city, this.driver_details.state_province].filter(Boolean).join(', ')
      return [city_state, this.driver_details.postal_code].filter(Boolean).join(' ')
    },
    driverName () {
      return [this.driver_details.first_name, this.driver_details.last_name].filter(Boolean).join(' ')
    },
    yearMakeModel () {
      return [this.vehicle_details.year, this.vehicle_details.make, this.vehicle_details.model].filter(Boolean).join(' ')
    }
  }
}
</script>
