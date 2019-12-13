<template>
  <v-card outlined shaped>
    <v-card-title>
      <v-list-item-content two-line>
        <p class="overline text--disabled">
          {{ $tc('date.past_days', days) }}
        </p>
        <v-list-item-title>
          {{ $t('vehicle.fuel') }}
        </v-list-item-title>
        <v-list-item-subtitle class="caption">
          <nuxt-link :to="{ path: `${this.$route.fullPath}/fuel` }" class="text-decoration-none">
            {{ $t('navigation.see_more') }}
          </nuxt-link>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('common.search')"
        clearable
        dense
        flat
        hide-details
        outlined
        prepend-inner-icon="mdi-magnify"
        rounded
        solo
        single-line
      />
    </v-card-title>
    <v-card-text>
      <v-skeleton-loader :loading="!initialized" type="table">
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :items-per-page="5"
          :sort-by="['bill_date']"
          :sort-desc="true"
        >
          <template #item.bill_date="{ item }">
            {{ item.bill_date | date }}
          </template>
          <template #item.unit_price="{ item }">
            {{ item.unit_price | currency(3,3) }}
          </template>
          <template #item.amount="{ item }">
            {{ item.amount | currency }}
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      days: 30,
      initialized: false,
      namespace: 'reports.expenses.fuel_detail',
      search: ''
    }
  },
  computed: {
    error: vm => vm.$store.getters['vehicle/getFuelError'],
    loading: vm => vm.$store.getters['vehicle/getFuelLoading'],
    items: vm => vm.$store.getters['vehicle/getFuelHistory'],
    vehicleNumber: vm => vm.$store.getters['vehicle/getVehicleNumber'],
    columns () {
      return [
        'bill_date',
        'card_number',
        'fuel_company_name',
        'product_type',
        'quantity',
        'unit_price',
        'amount'
      ]
    },
    headers () {
      return this.columns.map((column) => {
        return {
          text: this.$i18n.t(`${this.namespace}.${column}`),
          value: column,
          class: 'report-column'
        }
      })
    }
  },
  async mounted () {
    const vehicle_number = this.vehicleNumber
    const end_date = this.$moment().format('YYYY-MM-DD')
    const start_date = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    const filters = {
      command: 'FUEL',
      subcommand: 'JSONDETAIL',
      customer: 'EM102',
      vehicle_number,
      start_date,
      end_date
    }
    await this.$store.dispatch('vehicle/fetchFuelHistory', filters)
    this.initialized = true
  }
}
</script>
