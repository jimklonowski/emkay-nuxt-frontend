<template>
  <v-card shaped outlined>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon v-text="'mdi-credit-card-multiple'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('fuel_cards') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">
        <v-data-table
          :headers="headers"
          :items="items"
          disable-filtering
          disable-pagination
          hide-default-footer
        >
          <template #item="{ item }">
            <tr>
              <td>{{ item.card_number }}</td>
              <td>{{ item.vendor }}</td>
              <td>{{ item.issue_date | date }}</td>
              <td>{{ item.expiration_date | date }}</td>
              <td>{{ item.restrictions }}</td>
              <!-- <td>{{ item.pin }}</td> -->
              <td>
                <v-chip :outlined="$vuetify.theme.dark" v-text="item.status" small />
              </td>
              <td>
                <v-tooltip top>
                  <template #activator="{ on }">
                    <v-btn v-on="on" color="" icon>
                      <v-icon>mdi-credit-card-clock</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('replace_fuel_card') }}</span>
                </v-tooltip>
                <v-tooltip top>
                  <template #activator="{ on }">
                    <v-btn v-on="on" color="red lighten-2" icon>
                      <v-icon>mdi-credit-card-remove</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('terminate_fuel_card') }}</span>
                </v-tooltip>
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
      initialized: false
    }
  },
  computed: {
    columns () {
      return [
        'card_number',
        'vendor',
        'issue_date',
        'expiration_date',
        'restrictions',
        // 'pin',
        'status',
        'actions'
      ]
    },
    items () {
      return [
        {
          card_number: '8530-1',
          vendor: 'WEX',
          issue_date: '2019-10-25',
          expiration_date: '2023-10',
          restrictions: 'ID & ODOMETER, UNRESTRICTED',
          pin: 1234,
          status: 'ACTIVE',
          actions: ''
        }
      ]
    }
    // items: vm => vm.$store.getters['vehicle-dashboard/getFuelCardList']
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
    await this.$store.dispatch('vehicle-dashboard/fetchFuelCardList', filters)
    this.initialized = true
  }
}
</script>
