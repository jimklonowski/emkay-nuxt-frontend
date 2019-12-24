<template>
  <v-card outlined shaped>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar @click="$router.push(localePath(toFuelDashboard))" style="cursor:pointer;">
          <v-icon>mdi-gas-station</v-icon>
        </v-list-item-avatar>
        <v-list-item-content two-line>
          <p class="overline text--disabled">
            {{ $tc('past_days', days) }}
          </p>
          <v-list-item-title>
            {{ $t('fuel') }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            <nuxt-link :to="localePath(toFuelDashboard)" class="text-decoration-none">
              {{ $t('more') }}
            </nuxt-link>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">
        <v-data-table
          :headers="headers"
          :items="rows"
          :items-per-page="5"
          :sort-by="['service_date']"
          :sort-desc="true"
          class="striped"
        >
          <!-- Configure each #item row is rendered -->
          <template #item="{ item }">
            <tr>
              <td>{{ item.service_date | date }}</td>
              <td>{{ item.fuel_company_name }}</td>
              <td>
                <v-chip :outlined="$vuetify.theme.dark" v-text="item.product_type" small />
              </td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.unit_price | currency(3,3) }}</td>
              <td>{{ item.amount | currency }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
    <v-card-actions />
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      days: 30,
      initialized: false
    }
  },
  computed: {
    toFuelDashboard () {
      return { path: `${this.$route.fullPath}/fuel` }
    },
    rows: vm => vm.$store.getters['vehicle/getFuelHistory'],
    vehicleNumber: vm => vm.$store.getters['vehicle/getVehicleNumber'],
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
      return this.columns.map((column, index) => {
        return {
          text: this.$i18n.t(column),
          value: column,
          class: 'report-column'
        }
      })
    }
  },
  async mounted () {
    const vehicle_number = this.vehicleNumber || ''
    const end_date = this.$moment().format('YYYY-MM-DD')
    const start_date = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    const use_bill_date = false
    const filters = {
      command: 'FUEL',
      customer: 'EM102',
      start_date,
      end_date,
      use_bill_date,
      vehicle_number,
      json: 'Y'
    }
    await this.$store.dispatch('vehicle/fetchFuelHistory', filters)
    this.initialized = true
  }
}
</script>
