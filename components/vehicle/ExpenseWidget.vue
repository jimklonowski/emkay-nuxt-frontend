<template>
  <v-card shaped rounded>
    <v-card-title>
      <v-icon v-text="'mdi-currency-usd'" large left />
      <span class="title font-weight-light">
        {{ $t('expense_summary') }}
      </span>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-simple-table dense>
        <template #default>
          <thead>
            <tr>
              <th class="overline">
                {{ $t('fixed_costs') }} / {{ $t('cpm') }}
              </th>
              <th v-t="headers[1]" class="overline" />
              <th v-t="headers[2]" class="overline" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in fixed_costs" :key="item.key">
              <td>{{ $t(item.key) }}</td>
              <td>{{ item.amount | currency }}</td>
              <td>{{ item.cpm | currency(3,3) }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('total_fixed') }}
              </td>
              <td class="font-weight-bold">
                {{ totalFixedCosts | currency }}
              </td>
              <td class="font-weight-bold">
                {{ totalFixedCPM | currency(3,3) }}
              </td>
            </tr>
          </tbody>
          <tbody>
            <v-subheader class="overline">
              {{ $t('variable_costs') }} / {{ $t('cpm') }}
            </v-subheader>
            <tr v-for="item in variable_costs" :key="item.key">
              <td>{{ $t(item.key) }}</td>
              <td>{{ item.amount | currency }}</td>
              <td>{{ item.cpm | currency(3,3) }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('total_variable') }}
              </td>
              <td class="font-weight-bold">
                {{ totalVariableCosts | currency }}
              </td>
              <td class="font-weight-bold">
                {{ totalVariableCPM | currency(3,3) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="py-8">
              <td class="mr-3 font-weight-bold title">
                {{ $t('grand_total') }}
              </td>
              <td class="headline">
                {{ grandTotalCosts | currency }}
              </td>
              <td class="headline">
                {{ grandTotalCPM | currency(3,3) }}
              </td>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
    </v-card-text>
    <v-card-actions />
  </v-card>
</template>

<script>
import { computeTotalByKey } from '@/utility/helpers'
export default {
  computed: {
    totalFixedCosts: vm => vm.computeTotalByKey(vm.fixed_costs, 'amount'),
    totalFixedCPM: vm => vm.computeTotalByKey(vm.fixed_costs, 'cpm'),
    totalVariableCosts: vm => vm.computeTotalByKey(vm.variable_costs, 'amount'),
    totalVariableCPM: vm => vm.computeTotalByKey(vm.variable_costs, 'cpm'),
    grandTotalCosts: vm => { return vm.totalFixedCosts + vm.totalVariableCosts },
    grandTotalCPM: vm => { return vm.totalFixedCPM + vm.totalVariableCPM },
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
