<template>
  <v-card
    max-width="600"
    class="mx-auto"
    color="primary"
    dark
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-simple-table class="primary pa-2" dense>
          <template #default>
            <thead>
              <tr>
                <th />
                <th v-text="$t('quantity')" class="overline text-right" />
                <th v-text="$t('amount')" class="overline text-right" />
                <th v-text="$t('cpm')" class="overline text-right" />
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
      </v-sheet>
    </v-card-text>
    <v-card-text>
      <div class="display-1 font-weight-thin text-center">
        {{ $t('cpm') }}
      </div>
    </v-card-text>

    <v-divider />

    <v-card-actions class="justify-center">
      <v-btn block text>
        This is a button
      </v-btn>
    </v-card-actions>
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
