<template>
  <v-card shaped outlined>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon v-text="'mdi-credit-card-settings'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('fuel_authorization_profiles') }}
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
          hide-default-footer
          class="striped"
        />
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
        'id',
        'authorization_profile',
        'center_name',
        'sort',
        'vehicle_type',
        'restrictions',
        'card_type',
        'actions'
      ]
    },
    items: vm => vm.$store.getters['vehicle/getFuelAuthorizationProfiles']
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
    await this.$store.dispatch('vehicle/fetchFuelAuthorizationProfiles', filters)
    this.initialized = true
  }
}
</script>
