<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="billingRoute" link style="height:80px">
        <v-list-item-avatar>
          <v-icon v-text="'mdi-cash-usd-outline'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="vehicle_info.status" class="overline" />
          <v-list-item-title v-text="$t('billing_history')" />
          <client-only>
            <nuxt-link :to="billingRoute" v-text="$t('more')" class="caption text-decoration-none" />
          </client-only>
        </v-list-item-content>
        <!-- <v-list-item-action>
          <v-list-item-action-text v-text="$t('status')" class="caption" />
          <client-only>
            <v-chip v-text="vehicle_info.lease_type" :title="$t('lease_type')" x-small />
            <span />
          </client-only>
        </v-list-item-action> -->
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :hide-default-footer="items.length <= 5"
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
              {{ item.bill_date | date }}
            </td>
            <td>
              {{ item.bill_for_date | date }}
            </td>
            <td>
              {{ item.amount | currency }}
            </td>
          </tr>
        </template>
      </v-data-table>
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
      initialized: false
    }
  },
  computed: {
    billingRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/billing` }),
    vehicle_info: vm => vm.$store.getters['vehicle/getVehicleInfo'],
    columns () {
      return [
        'invoice_number',
        'description',
        'bill_date',
        'bill_for_date',
        'amount'
      ]
    },
    items () {
      return [
        {
          invoice_number: 'BH7004',
          description: 'FMS BILLING',
          bill_date: '2019-12',
          bill_for_date: '2019-12',
          amount: 431.73
        },
        {
          invoice_number: 'BH6150',
          description: 'RENTAL BILLING',
          bill_date: '2019-12',
          bill_for_date: '2019-12',
          amount: 53.46
        },
        {
          invoice_number: 'BH2857',
          description: 'FMS BILLING',
          bill_date: '2019-11',
          bill_for_date: '2019-11',
          amount: 261.37
        },
        {
          invoice_number: 'BH0900',
          description: 'RENTAL BILLING',
          bill_date: '2019-11',
          bill_for_date: '2019-11',
          amount: 53.46
        },
        {
          invoice_number: 'BH0900',
          description: 'RENTAL BILLING',
          bill_date: '2019-11',
          bill_for_date: '2019-10',
          amount: 53.46
        },
        {
          invoice_number: 'BH0900',
          description: 'RENTAL BILLING',
          bill_date: '2019-11',
          bill_for_date: '2019-09',
          amount: 53.46
        }
      ]
    }
  },
  methods: {
    invoiceRoute (invoice) {
      return this.localePath({ path: `/vehicle/${this.$route.params.vehicle}/billing`, query: { invoice } })
    }
  }
}
</script>
