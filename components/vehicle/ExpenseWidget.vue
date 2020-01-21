<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon v-text="'mdi-cash-usd'" />
        </v-list-item-avatar>
        <v-list-item-content two-line>
          <p :title="inServiceTitle" class="overline text--disabled">
            {{ $tc('months_in_service', vehicle_info.months_in_service || 0) }}
          </p>
          <v-list-item-title>
            {{ $t('expense_summary') }}
          </v-list-item-title>
          <!-- <v-list-item-subtitle :title="mileageTitle" class="subtitle">
            {{ $tc('miles_per_month', vehicle_info.miles_per_month || 0) }}
          </v-list-item-subtitle> -->
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>{{ $t('mileage') }}</v-list-item-action-text>
          <v-chip :title="$tc('miles_per_month', vehicle_info.miles_per_month || 0)" pill outlined x-small>
            {{ $tc('miles_driven', vehicle_info.miles_driven || 0) }}
          </v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-simple-table dense>
        <template #default>
          <thead>
            <tr>
              <th class="overline" width="50%">
                {{ $t('fixed_costs') }} / {{ $t('cpm') }}
              </th>
              <th v-text="$t(headers[1])" class="overline text-right" width="25%" />
              <th v-text="$t(headers[2])" class="overline text-right" width="25%" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in fixed_costs" :key="item.key">
              <td class="font-weight-regular">
                {{ $t(item.key) }}
              </td>
              <td class="font-weight-light text-right">
                {{ item.amount | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ item.cpm | currency(3,3) }}
              </td>
            </tr>
            <tr class="grey--text">
              <td class="font-weight-bold">
                {{ $t('total_fixed') }}
              </td>
              <td class="font-weight-regular text-right">
                {{ totalFixedCosts | currency }}
              </td>
              <td class="font-weight-regular text-right">
                {{ totalFixedCPM | currency(3,3) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="py-2" />
      <v-simple-table dense>
        <template #default>
          <thead>
            <tr>
              <th class="overline" width="50%">
                {{ $t('variable_costs') }} / {{ $t('cpm') }}
              </th>
              <th v-text="$t(headers[1])" class="overline text-right" width="25%" />
              <th v-text="$t(headers[2])" class="overline text-right" width="25%" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in variable_costs" :key="item.key">
              <td class="font-weight-regular">
                {{ $t(item.key) }}
              </td>
              <td class="font-weight-light text-right">
                {{ item.amount | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ item.cpm | currency(3,3) }}
              </td>
            </tr>
            <tr class="grey--text">
              <td class="font-weight-bold">
                {{ $t('total_variable') }}
              </td>
              <td class="font-weight-regular text-right">
                {{ totalVariableCosts | currency }}
              </td>
              <td class="font-weight-regular text-right">
                {{ totalVariableCPM | currency(3,3) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="">
              <td class="font-weight-bold title">
                {{ $t('grand_total') }}
              </td>
              <td class="text-right title">
                {{ grandTotalCosts | currency }}
              </td>
              <td class="text-right title">
                {{ grandTotalCPM | currency(3,3) }}
              </td>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
      <div class="py-2" />
    </v-card-text>
    <v-card-actions />
  </v-card>
</template>

<script>
import { computeTotalByKey } from '@/utility/helpers'
export default {
  computed: {
    vehicle_info: vm => vm.$store.getters['vehicle/getVehicleInfo'],
    totalFixedCosts: vm => vm.computeTotalByKey(vm.fixed_costs, 'amount'),
    totalFixedCPM: vm => vm.computeTotalByKey(vm.fixed_costs, 'cpm'),
    totalVariableCosts: vm => vm.computeTotalByKey(vm.variable_costs, 'amount'),
    totalVariableCPM: vm => vm.computeTotalByKey(vm.variable_costs, 'cpm'),
    grandTotalCosts: vm => { return vm.totalFixedCosts + vm.totalVariableCosts },
    grandTotalCPM: vm => { return vm.totalFixedCPM + vm.totalVariableCPM },
    inServiceTitle () {
      return `${this.$i18n.t('in_service_date')}: ${this.$options.filters.date(this.vehicle_info.in_service_date)}`
    },
    mileageTitle () {
      return `${this.$i18n.t('total')}: ${this.vehicle_info.miles_driven || 0}`
    },
    headers () {
      return [
        '',
        'amount',
        'cpm'
      ]
    },
    fixed_costs () {
      return [
        {
          key: 'depreciation',
          amount: 0.00,
          cpm: 0.000
        },
        {
          key: 'interest',
          amount: 53.38,
          cpm: 0.0141
        },
        {
          key: 'licensing',
          amount: 346.95,
          cpm: 0.0022
        },
        {
          key: 'tax',
          amount: 0.00,
          cpm: 0.000
        }
      ]
    },
    variable_costs () {
      return [
        {
          key: 'maintenance',
          amount: 368.00,
          cpm: 0.015
        },
        {
          key: 'accident',
          amount: 505.38,
          cpm: 0.0205
        },
        {
          key: 'fuel',
          amount: 3534.59,
          cpm: 0.1437
        }
      ]
    }
  },
  methods: {
    computeTotalByKey
  }
}
</script>

<style>

</style>
