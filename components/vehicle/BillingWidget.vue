<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon v-text="'mdi-cash-usd-outline'" />
        </v-list-item-avatar>
        <v-list-item-content two-line>
          <p class="overline text--disabled">
            {{ vehicle_info.billing_status || 'ON BILLING' }}
          </p>
          <v-list-item-title>
            {{ $t('billing_history') }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            <nuxt-link :to="billingRoute" class="text-decoration-none">
              {{ $t('more') }}
            </nuxt-link>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>{{ $t('status') }}</v-list-item-action-text>
          <v-chip :title="$t('lease_type')" pill outlined x-small>
            {{ vehicle_info.lease_type }}
          </v-chip>
        </v-list-item-action>
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
          <tr>
            <td>
              <nuxt-link :to="localePath({ path: `/vehicle/${$route.params.vehicle}/billing`, query: { invoice: item.invoice_number } })">
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
  }
}
</script>
