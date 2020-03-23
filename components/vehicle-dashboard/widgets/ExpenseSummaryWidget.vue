<template>
  <v-card outlined class="vehicle-dashboard-widget">
    <!-- Toolbar -->
    <v-toolbar flat color="transparent">
      <v-avatar class="mr-2" size="36">
        <v-icon v-text="icon" color="grey" />
      </v-avatar>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <!-- Dropdown Menu -->
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        origin="top right"
        transition="scale-transition"
        left
      >
        <template #activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon v-text="'mdi-dots-vertical'" />
          </v-btn>
        </template>
        <v-card>
          <v-list nav dense>
            <v-list-item v-for="(action, a) in actions" :key="`action-${a}`" :to="action.to" link>
              <v-list-item-action>
                <v-icon v-text="action.icon" />
              </v-list-item-action>
              <v-list-item-title v-text="action.text" />
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-divider />

    <!-- Data -->
    <v-skeleton-loader :loading="!initialized" :types="{ 'table-tbody': 'table-row-divider@3' }" type="table-thead, table-tbody, table-tfoot">
      <v-container class="pa-0">
        <v-row dense no-gutters>
          <v-col cols="12" lg="4">
            <v-card outlined tile>
              <v-card-title class="justify-end subtitle-2 mx-4">
                {{ $t('fixed_costs') }} / {{ $t('cpm') }}
              </v-card-title>
              <v-list>
                <v-list-item>
                  <v-list-item-title>{{ $t('depreciation') }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.depreciation | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.depreciation_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>{{ $t('interest') }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.interest | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.interest_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>{{ $t('licensing') }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.licensing | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.licensing_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>{{ $t('tax') }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.tax | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.tax_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    {{ $t('total_fixed') }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-right font-weight-bold">
                    {{ total_fixed | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right font-weight-bold">
                    {{ total_fixed_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" lg="4">
            <v-card outlined tile>
              <v-card-title class="justify-end subtitle-2 mx-4">
                {{ $t('variable_costs') }} / {{ $t('cpm') }}
              </v-card-title>
              <v-list>
                <v-list-item>
                  <v-list-item-title>{{ $t('maintenance') }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.maintenance | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.maintenance_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>{{ $t('accident') }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.accident | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.accident_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>{{ $t('fuel') }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.fuel | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right">
                    {{ expense_summary.fuel_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item v-show="$vuetify.breakpoint.lgAndUp">
                  <v-list-item-title />
                  <v-list-item-subtitle class="text-right" />
                  <v-list-item-subtitle class="text-right" />
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    {{ $t('total_variable') }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-right font-weight-bold">
                    {{ total_variable | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right font-weight-bold">
                    {{ total_variable_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" lg="4">
            <v-card outlined tile>
              <v-card-title class="justify-end subtitle-2 mx-4">
                {{ $t('total_costs') }} / {{ $t('cpm') }}
              </v-card-title>
              <v-list>
                <v-list-item>
                  <v-list-item-title>{{ $t('total_fixed') }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ total_fixed | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right">
                    {{ total_fixed_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>{{ $t('total_variable') }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    {{ total_variable | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right">
                    {{ total_variable_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item v-show="$vuetify.breakpoint.lgAndUp">
                  <v-list-item-title />
                  <v-list-item-subtitle class="text-right" />
                  <v-list-item-subtitle class="text-right" />
                </v-list-item>
                <v-list-item v-show="$vuetify.breakpoint.lgAndUp">
                  <v-list-item-title />
                  <v-list-item-subtitle class="text-right" />
                  <v-list-item-subtitle class="text-right" />
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    {{ $t('grand_total') }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-right font-weight-bold">
                    {{ total_costs | currency }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right font-weight-bold">
                    {{ total_cpm | currency(3, 3) }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    icon: 'mdi-cash-usd',
    initialized: false,
    menu: false
  }),
  computed: {
    /**
     * Vuex Getters
     */
    ...mapGetters({
      expense_summary: 'vehicle-dashboard/getExpenseSummary',
      total_costs: 'vehicle-dashboard/getTotalCosts',
      total_cpm: 'vehicle-dashboard/getTotalCPM',
      total_fixed: 'vehicle-dashboard/getTotalFixed',
      total_fixed_cpm: 'vehicle-dashboard/getTotalFixedCPM',
      total_variable: 'vehicle-dashboard/getTotalVariable',
      total_variable_cpm: 'vehicle-dashboard/getTotalVariableCPM',
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
    }),
    /**
     * Dropdown menu actions
     */
    actions () {
      return [
        {
          text: this.$i18n.t('report_expenses'),
          icon: this.icon,
          to: this.reportExpensesRoute
        }
      ]
    },
    reportExpensesRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/report-expenses` }),
    title: vm => vm.$i18n.t('expense_summary')
  },
  async mounted () {
    await this.populateWidget()
  },
  methods: {
    /**
     * Vuex Actions
     */
    ...mapActions({
      populate: 'vehicle-dashboard/fetchExpenseSummary'
    }),
    /**
     * Populate widget and toggle initialized status while data is fetched
     */
    async populateWidget () {
      await this.populate({
        vehicle: this.vehicle_number
      })
      this.initialized = true
    }
  }
}
</script>
