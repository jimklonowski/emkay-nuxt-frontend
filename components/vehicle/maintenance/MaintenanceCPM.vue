<template>
  <v-card shaped rounded>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon v-text="'mdi-cash-register'" />
        </v-list-item-avatar>
        <v-list-item-content two-line>
          <v-list-item-title>
            {{ $t('cpm') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-card-text>
      <v-simple-table dense>
        <template #default>
          <thead>
            <tr>
              <th v-t="headers[0]" width="40%" />
              <th v-t="headers[1]" class="overline text-right" width="20%" />
              <th v-t="headers[2]" class="overline text-right" width="20%" />
              <th v-t="headers[3]" class="overline text-right" width="20%" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.key">
              <td class="font-weight-regular">
                {{ $t(item.key) }}
              </td>
              <td class="font-weight-light text-right">
                {{ item.quantity }}
              </td>
              <td class="font-weight-light text-right">
                {{ item.amount | currency }}
              </td>
              <td class="font-weight-light text-right">
                {{ item.cpm | currency(3,3) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="font-weight-bold">
                {{ $t('total') }}:
              </td>
              <td class="text-right title">
                {{ totalQuantity }}
              </td>
              <td class="text-right title">
                {{ totalAmount | currency }}
              </td>
              <td class="text-right title">
                {{ totalCPM | currency(3,3) }}
              </td>
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
    totalQuantity: vm => vm.computeTotalByKey(vm.items, 'quantity'),
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
