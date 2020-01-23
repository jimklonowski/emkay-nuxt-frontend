<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="fuelRoute" link style="height:80px;">
        <v-list-item-avatar>
          <v-icon v-text="'mdi-gas-station'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="$tc('past_days', days)" class="overline" />
          <v-list-item-title v-text="$t('fuel')" />
          <client-only>
            <nuxt-link :to="fuelRoute" v-text="$t('more')" class="caption text-decoration-none" />
          </client-only>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">
        <!-- :hide-default-footer="items.length <= 5" -->
        <v-data-table
          :headers="headers"
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
            <tr class="report-row">
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
    headers () {
      return [
        {
          text: this.$i18n.t('service_date'),
          value: 'service_date',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('fuel_company_name'),
          value: 'fuel_company_name',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('product_type'),
          value: 'product_type',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('quantity'),
          value: 'quantity',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('unit_price'),
          value: 'unit_price',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('amount'),
          value: 'amount',
          class: 'report-column'
        }
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
  }
}
</script>
