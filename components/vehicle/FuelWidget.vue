<template>
  <v-card outlined>
    <v-toolbar flat>
      <v-avatar class="mr-2">
        <v-icon v-text="'mdi-gas-station'" />
      </v-avatar>
      <v-toolbar-title @click="$router.push(fuelRoute)" class="font-lato" style="cursor:pointer;">
        {{ $t('fuel') }}
      </v-toolbar-title>
      <v-spacer />
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
            <v-list-item :to="fuelRoute" link>
              <v-list-item-avatar>
                <v-icon v-text="'mdi-gas-station'" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="$t('fuel_history')" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="fuelCardRoute" link>
              <v-list-item-avatar>
                <v-icon v-text="'mdi-credit-card-settings'" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="$t('fuel_cards')" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="fuelProfilesRoute" link>
              <v-list-item-avatar>
                <v-icon v-text="'mdi-credit-card-multiple'" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="$t('fuel_authorization_profiles')" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">
        <!-- :hide-default-footer="items.length <= 5" -->
        <v-data-table
          :dense="items && items.length !== 0"
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :mobile-breakpoint="0"
          :sort-by="['service_date']"
          :sort-desc="true"
          class="striped"
        >
          <!-- Configure individual column rendering -->
          <template #item.service_date="{ item }">
            {{ item.service_date | date }}
          </template>

          <template #item.product_type="{ item }">
            <v-chip :outlined="!$vuetify.theme.dark" v-text="item.product_type" x-small />
          </template>

          <template #item.unit_price="{ item }">
            {{ item.unit_price | currency(3, 3) }}
          </template>

          <template #item.amount="{ item }">
            {{ item.amount | currency }}
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
    <!-- <v-card-actions>
      <v-slider
        v-model="days"
        :max="120"
        :min="30"
        :step="30"
        :tick-labels="[30, 60, 90, 120]"
        class="align-center"
        tick-size="5"
        ticks="always"
        width="100"
      />
    </v-card-actions> -->
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      days: 30,
      initialized: false,
      menu: false
    }
  },
  computed: {
    ...mapGetters({
      items: 'vehicle/getFuelHistory',
      loading: 'vehicle/getFuelLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'service_date',
        'fuel_company_name',
        'product_type',
        'quantity',
        'unit_price',
        'amount'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('service_date'),
          value: 'service_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('fuel_company_name'),
          value: 'fuel_company_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('product_type'),
          value: 'product_type',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('quantity'),
          value: 'quantity',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('unit_price'),
          value: 'unit_price',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('amount'),
          value: 'amount',
          class: 'report-column'
        }
      ]
    },
    fuelRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/fuel` }),
    fuelCardRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/fuel/fuel-cards` }),
    fuelProfilesRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/fuel/fuel-profiles` })
  },
  watch: {
    /**
     * When the 'days' variable changes, re-fetch data.
     */
    async days () {
      await this.populateWidget()
    }
  },
  /**
   * Fetch Fuel Data when widget is mounted
   */
  async mounted () {
    await this.populateWidget()
  },
  methods: {
    async populateWidget () {
      const vehicle = this.vehicle_number
      const end = this.$moment().format('YYYY-MM-DD')
      const start = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
      const use_bill_date = false
      await this.$store.dispatch('vehicle/fetchFuelHistory', { start, end, use_bill_date, vehicle })
      this.initialized = true
    }
  }
}
</script>
