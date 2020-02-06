<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="billingRoute" link style="height:80px">
        <v-list-item-avatar>
          <v-icon v-text="'mdi-cash-usd-outline'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="vehicle_details.status" class="overline" />
          <v-list-item-title v-text="$t('billing_history')" />
          <client-only>
            <nuxt-link :to="billingRoute" v-text="$t('more')" class="caption text-decoration-none" />
          </client-only>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :mobile-breakpoint="0"
          :sort-by="['invoice_number']"
          :sort-desc="[true]"
          class="striped"
          dense
        >
          <template #item="{ item }">
            <tr class="report-row">
              <td>
                <nuxt-link :to="invoiceRoute(item.invoice_number)" class="text-decoration-none">
                  {{ item.invoice_number }}
                </nuxt-link>
              </td>
              <td>
                {{ item.description }}
              </td>
              <td>
                {{ item.bill_date | date('YYYY-MM', 'MM/YYYY') }}
              </td>
              <td>
                {{ item.bill_for_date | date('YYYY-MM', 'MM/YYYY') }}
              </td>
              <td>
                {{ item.amount | currency }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
    <v-card-actions />
  </v-card>
</template>

<script>
import { headers } from '@/mixins/datatables'
export default {
  mixins: [headers],
  data () {
    return {
      days: 180,
      initialized: false
    }
  },
  computed: {
    billingRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/billing` }),
    vehicle_details: vm => vm.$store.getters['vehicle/getVehicleDetails'],
    vehicle_number: vm => vm.$store.getters['vehicle/getVehicleNumber'],
    items: vm => vm.$store.getters['vehicle/getBillingHistory'],
    columns () {
      return [
        'invoice_number',
        'description',
        'bill_date',
        'bill_for_date',
        'amount'
      ]
    }
  },
  async mounted () {
    const vehicle = this.vehicle_number
    const end = this.$moment().format('YYYY-MM-DD')
    const start = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    await this.$store.dispatch('vehicle/fetchBillingHistory', { start, end, vehicle })
    this.initialized = true
  },
  methods: {
    invoiceRoute (invoice) {
      return this.localePath({ path: `/vehicle/${this.vehicle_number}/billing`, query: { invoice } })
    }
  }
}
</script>
