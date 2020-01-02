<template>
  <v-card shaped rounded>
    <v-card-title>
      <v-icon v-text="'mdi-cash-register'" large left />
      <span class="title font-weight-light">
        {{ $t('cpm') }}
      </span>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th v-for="header in headers" :key="header" v-t="header" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.key">
              <td>{{ $t(item.key) }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.amount | currency }}</td>
              <td>{{ item.cpm | currency(3,3) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td class="font-weight-bold">
                {{ $t('total') }}:
              </td>
              <td>{{ totalAmount | currency }}</td>
              <td>{{ totalCPM | currency(3,3) }}</td>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
    </v-card-text>
    <v-card-actions />
  </v-card>
</template>

<script>
import { computeTotalByKey } from '@/utility/helpers'
export default {
  computed: {
    totalAmount: vm => vm.computeTotalByKey(vm.items, 'amount'),
    totalCPM: vm => vm.computeTotalByKey(vm.items, 'cpm'),
    headers () {
      return [
        '',
        'quantity',
        'amount',
        'cpm'
      ]
    },
    items () {
      return [
        {
          key: 'lube_oil_filter',
          quantity: 7,
          amount: 156.21,
          cpm: 0.006
        },
        {
          key: 'brakes',
          quantity: 0,
          amount: 0.00,
          cpm: 0.000
        },
        {
          key: 'tires',
          quantity: 2,
          amount: 46.00,
          cpm: 0.002
        },
        {
          key: 'other',
          quantity: 15,
          amount: 195.79,
          cpm: 0.008
        }
      ]
    }
  },
  methods: {
    computeTotalByKey
  }
}
</script>
