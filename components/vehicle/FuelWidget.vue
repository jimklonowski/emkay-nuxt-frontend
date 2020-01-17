<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="fuelRoute" link>
        <v-list-item-avatar>
          <v-icon v-text="'mdi-gas-station'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <p v-text="$tc('past_days', days)" class="overline text--disabled" />
          <v-list-item-title v-text="$t('fuel')" />
          <!-- <v-list-item-subtitle v-text="$t('more')" class="caption" /> -->
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">
        <v-data-table
          :headers="headers"
          :hide-default-footer="items.length <= 5"
          :items="items"
          :items-per-page="5"
          :mobile-breakpoint="0"
          :sort-by="['service_date']"
          :sort-desc="true"
          class="striped"
          dense
        >
          <!-- Configure each #item row is rendered -->
          <template #item="{ item }">
            <tr>
              <td>{{ item.service_date | date }}</td>
              <td>{{ item.fuel_company_name }}</td>
              <td>
                <v-chip :outlined="$vuetify.theme.dark" v-text="item.product_type" x-small />
              </td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.unit_price | currency(3,3) }}</td>
              <td>{{ item.amount | currency }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
    <!-- <v-card-actions /> -->
  </v-card>
</template>

<script>
import { headers } from '@/mixins/datatables'
export default {
  mixins: [headers],
  data () {
    return {
      days: 30,
      initialized: false
    }
  },
  computed: {
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
    fuelRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/fuel` }),
    items: vm => vm.$store.getters['vehicle/getFuelHistory']
  },
  async mounted () {
    const vehicle_number = this.$route.params.vehicle
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
    await this.$store.dispatch('vehicle/fetchFuelHistory', { filters })
    this.initialized = true
  },
  methods: {
    goToFuel () {
      this.$router.push(this.fuelRoute)
    }
  }
}
</script>
