<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="expensesRoute" link style="height:80px;">
        <v-list-item-avatar>
          <v-icon v-text="'mdi-cash-usd'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle class="overline">
            {{ $tc('months_in_service', vehicle_info.months_in_service || 0) }}
          </v-list-item-subtitle>
          <v-list-item-title v-text="$t('expense_summary')" />
          <client-only>
            <nuxt-link :to="expensesRoute" v-text="$t('more')" class="caption text-decoration-none" />
          </client-only>
        </v-list-item-content>
        <!-- <v-list-item-action>
          <v-list-item-action-text v-text="$t('mileage')" class="caption" />
          <client-only>
            <v-chip v-text="$tc('miles_driven', vehicle_info.miles_driven || 0)" :title="$tc('miles_per_month', vehicle_info.miles_per_month || 0)" x-small />
            <span />
          </client-only>
        </v-list-item-action> -->
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-simple-table class="striped" dense>
        <template #default>
          <thead>
            <tr>
              <th class="overline" width="50%">
                {{ $t('fixed_costs') }} / {{ $t('cpm') }}
              </th>
              <th v-text="$t(headers[1])" class="report-column text-right" width="25%" />
              <th v-text="$t(headers[2])" class="report-column text-right" width="25%" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in fixed_costs" :key="item.key" class="report-row">
              <td class="font-weight-regular pl-8">
                {{ $t(item.key) }}
              </td>
              <td class="font-weight-light text-right">
                {{ item.amount | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ item.cpm | currency(3,3) }}
              </td>
            </tr>
            <tr class="report-row">
              <td>
                {{ $t('total_fixed') }}
              </td>
              <td class="font-weight-medium text-right">
                {{ totalFixedCosts | currency }}
              </td>
              <td class="font-weight-medium text-right">
                {{ totalFixedCPM | currency(3,3) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-divider />
      <v-simple-table class="striped" dense>
        <template #default>
          <thead>
            <tr>
              <th class="overline" width="50%">
                {{ $t('variable_costs') }} / {{ $t('cpm') }}
              </th>
              <th v-text="$t(headers[1])" class="report-column text-right" width="25%" />
              <th v-text="$t(headers[2])" class="report-column text-right" width="25%" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in variable_costs" :key="item.key" class="report-row">
              <td class="font-weight-regular pl-8">
                {{ $t(item.key) }}
              </td>
              <td class="font-weight-light text-right">
                {{ item.amount | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ item.cpm | currency(3,3) }}
              </td>
            </tr>
            <tr class="report-row">
              <td>
                {{ $t('total_variable') }}
              </td>
              <td class="font-weight-medium text-right">
                {{ totalVariableCosts | currency }}
              </td>
              <td class="font-weight-medium text-right">
                {{ totalVariableCPM | currency(3,3) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="report-row">
              <td style="font-size:1.5rem;">
                {{ $t('grand_total') }}
              </td>
              <td class="text-right" style="font-size:1.5rem;">
                {{ grandTotalCosts | currency }}
              </td>
              <td class="text-right" style="font-size:1.5rem;">
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
    expensesRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/expenses` }),
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
