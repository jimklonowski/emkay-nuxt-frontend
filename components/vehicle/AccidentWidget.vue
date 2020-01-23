<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="accidentRoute" link style="height:80px;">
        <v-list-item-avatar>
          <v-icon v-text="'mdi-car-parking-lights'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="$tc('past_days', days)" class="overline" />
          <v-list-item-title v-text="$t('accidents')" />
          <client-only>
            <nuxt-link :to="accidentRoute" v-text="$t('more')" class="caption text-decoration-none" />
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
          :sort-by="['date']"
          :sort-desc="[true]"
          class="striped"
          dense
        />
      </v-skeleton-loader>
    </v-card-text>
    <!-- <v-card-actions /> -->
  </v-card>
</template>

<script>
import { headers } from '@/mixins/datatables'
export default {
  name: 'AccidentCard',
  mixins: [headers],
  data () {
    return {
      days: 30,
      initialized: false
    }
  },
  computed: {
    accidentRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/accident` }),
    columns () {
      return [
        'date',
        'location',
        'details',
        'in_network',
        'amount'
      ]
    },
    items: vm => vm.$store.getters['vehicle/getAccidentHistory'],
    vehicleNumber: vm => vm.$store.getters['vehicle/getVehicleNumber']
  },
  async mounted () {
    const vehicle_number = this.vehicleNumber || ''
    const start_date = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    const end_date = this.$moment().format('YYYY-MM-DD')

    const filters = {
      command: 'ACCIDENT',
      customer: 'EM102',
      start_date,
      end_date,
      vehicle_number,
      json: 'Y'
    }
    await this.$store.dispatch('vehicle/fetchAccidentHistory', filters)
    this.initialized = true
  }
}
</script>

<style></style>
