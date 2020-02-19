<template>
  <v-card outlined class="vehicle-widget">
    <v-toolbar flat color="transparent">
      <v-avatar class="mr-2" size="36">
        <v-icon v-text="'mdi-cash-usd'" color="grey" />
      </v-avatar>
      <v-toolbar-title>
        {{ $t('expense_summary') }}
      </v-toolbar-title>
    </v-toolbar>

    <v-divider />

    <!-- Datatable -->
    <v-skeleton-loader :loading="!initialized" type="table">
      <v-simple-table class="striped" dense>
        <template #default>
          <thead>
            <tr>
              <th class="overline" width="50%">
                {{ $t('fixed_costs') }} / {{ $t('cpm') }}
              </th>
              <th v-text="$t('amount')" class="report-column text-right" width="25%" />
              <th v-text="$t('cpm')" class="report-column text-right" width="25%" />
            </tr>
          </thead>
          <tbody>
            <!-- Fixed Costs/CPM -->
            <tr class="report-row">
              <td class="font-weight-regular pl-8">
                {{ $t('depreciation') }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.depreciation | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.depreciation_cpm | currency(3, 3) }}
              </td>
            </tr>
            <tr class="report-row">
              <td class="font-weight-regular pl-8">
                {{ $t('interest') }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.interest | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.interest_cpm | currency(3, 3) }}
              </td>
            </tr>
            <tr class="report-row">
              <td class="font-weight-regular pl-8">
                {{ $t('licensing') }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.licensing | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.licensing_cpm | currency(3, 3) }}
              </td>
            </tr>
            <tr class="report-row">
              <td class="font-weight-regular pl-8">
                {{ $t('tax') }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.tax | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.tax_cpm | currency(3, 3) }}
              </td>
            </tr>
            <!-- Total Fixed -->
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
              <th v-text="$t('amount')" class="report-column text-right" width="25%" />
              <th v-text="$t('cpm')" class="report-column text-right" width="25%" />
            </tr>
          </thead>
          <tbody>
            <!-- Variable Costs/CPM -->
            <tr class="report-row">
              <td class="font-weight-regular pl-8">
                {{ $t('maintenance') }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.maintenance | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.maintenance_cpm | currency(3, 3) }}
              </td>
            </tr>
            <tr class="report-row">
              <td class="font-weight-regular pl-8">
                {{ $t('accident') }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.accident | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.accident_cpm | currency(3, 3) }}
              </td>
            </tr>
            <tr class="report-row">
              <td class="font-weight-regular pl-8">
                {{ $t('fuel') }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.fuel | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ expense_summary.fuel_cpm | currency(3, 3) }}
              </td>
            </tr>
            <!-- Total Fixed -->
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
    </v-skeleton-loader>
  </v-card>
</template>

<script>
import { computeTotalByKey } from '@/utility/helpers'
export default {
  data () {
    return {
      initialized: false
    }
  },
  computed: {
    expensesRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/expenses` }),
    vehicle_details: vm => vm.$store.getters['vehicle/getVehicleDetails'],
    vehicle_number: vm => vm.$store.getters['vehicle/getVehicleNumber'],
    expense_summary: vm => vm.$store.getters['vehicle/getExpenseSummary'],
    totalFixedCosts () {
      return this.expense_summary.depreciation +
             this.expense_summary.interest +
             this.expense_summary.licensing +
             this.expense_summary.tax
    },
    totalFixedCPM () {
      return this.expense_summary.depreciation_cpm +
             this.expense_summary.interest_cpm +
             this.expense_summary.licensing_cpm +
             this.expense_summary.tax_cpm
    },
    totalVariableCosts () {
      return this.expense_summary.maintenance +
             this.expense_summary.accident +
             this.expense_summary.fuel
    },
    totalVariableCPM () {
      return this.expense_summary.maintenance_cpm +
             this.expense_summary.accident_cpm +
             this.expense_summary.fuel_cpm
    },
    grandTotalCosts () {
      return this.totalFixedCosts + this.totalVariableCosts
    },
    grandTotalCPM () {
      return this.totalFixedCPM + this.totalVariableCPM
    }
  },
  async mounted () {
    const vehicle = this.vehicle_number
    await this.$store.dispatch('vehicle/fetchExpenseSummary', { vehicle })
    this.initialized = true
  },
  methods: {
    computeTotalByKey
  }
}
</script>
