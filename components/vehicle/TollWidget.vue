<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="tollRoute" link>
        <v-list-item-avatar>
          <v-icon v-text="'mdi-highway'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="$tc('past_days', days)" class="overline" />
          <v-list-item-title v-text="$t('tolls')" />
          <client-only>
            <nuxt-link :to="tollRoute" v-text="$t('more')" class="caption text-decoration-none" />
          </client-only>
        </v-list-item-content>
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
        :sort-by="['date']"
        :sort-desc="[true]"
        class="striped"
        dense
      />
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
    tollRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/toll` }),
    items: vm => vm.$store.getters['vehicle/getTollHistory'],
    vehicleNumber: vm => vm.$store.getters['vehicle/getVehicleNumber'],
    columns () {
      return [
        'date',
        'location',
        'details',
        'in_network',
        'amount'
      ]
    }
  },
  async mounted () {
    const vehicle_number = this.vehicleNumber || ''
    const start_date = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    const end_date = this.$moment().format('YYYY-MM-DD')

    const filters = {
      command: 'TOLL',
      customer: 'EM102',
      start_date,
      end_date,
      vehicle_number,
      json: 'Y'
    }
    await this.$store.dispatch('vehicle/fetchTollHistory', filters)
    this.initialized = true
  }
}
</script>

<style>

</style>
