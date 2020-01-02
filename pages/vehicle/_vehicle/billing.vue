<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn :to="vehicleRoute" exact nuxt text>
          <v-icon v-text="'mdi-chevron-left'" class="mr-2" />
          {{ $t('to_vehicle_dashboard') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-show="$route.query.invoice">
      <v-col cols="9">
        <v-card outlined shaped>
          <v-card-title>
            {{ $t('invoice') }}
          </v-card-title>
          <v-card-subtitle>
            {{ $route.query.invoice }}
          </v-card-subtitle>
          <v-divider />
          <v-card-text class="pa-0">
            <v-simple-table dense>
              <template #default>
                <thead>
                  <tr>
                    <th v-for="column in invoice_columns" v-t="column" :key="column" />
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in invoice_items" :key="item.voucher_number">
                    <td>{{ item.voucher_number }}</td>
                    <td>{{ item.voucher_date | date }}</td>
                    <td>{{ item.bill_date | date }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.amount | currency }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined shaped>
          <v-toolbar flat>
            <v-toolbar-title class="hidden-sm-and-down">
              {{ $t('billing_history') }}
              <span v-text="$route.params.vehicle" class="overline text--disabled" />
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="px-0">
            <v-data-table
              :headers="headers"
              :items="items"
              class="striped"
            >
              <template #item="{ item }">
                <tr>
                  <td>
                    <nuxt-link :to="localePath({ path: `/vehicle/${$route.params.vehicle}/billing`, query: { invoice: item.invoice_number } })">
                      {{ item.invoice_number }}
                    </nuxt-link>
                  </td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.bill_date | date }}</td>
                  <td>{{ item.bill_for_date | date }}</td>
                  <td>{{ item.amount | currency }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { headers } from '@/mixins/datatables'
import { vehicleRoute } from '@/mixins/routing'

export default {
  mixins: [headers, vehicleRoute],
  computed: {
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
    },
    invoice_columns () {
      return [
        'voucher_number',
        'voucher_date',
        'bill_date',
        'description',
        'amount'
      ]
    },
    invoice_items () {
      return [
        {
          voucher_number: '2HHMVZ',
          voucher_date: '2019-11',
          bill_date: '2019-12',
          description: 'ANCILLARY SERVICES',
          amount: 16.75
        },
        {
          voucher_number: '2J2XBL',
          voucher_date: '2019-12',
          bill_date: '2019-12',
          description: 'ANCILLARY SERVICES',
          amount: 16.75
        },
        {
          voucher_number: '2J8UB1',
          voucher_date: '2019-12',
          bill_date: '2019-12',
          description: '21 MURPHYUSA UNL',
          amount: 52.74
        },
        {
          voucher_number: '2J5BNH',
          voucher_date: '2019-12',
          bill_date: '2019-12',
          description: 'Toll Costs',
          amount: 65.90
        },
        {
          voucher_number: '2J5BNH',
          voucher_date: '2019-12',
          bill_date: '2019-12',
          description: 'Misc Toll Expenses',
          amount: 0.50
        }
      ]
    }
  }
}
</script>
