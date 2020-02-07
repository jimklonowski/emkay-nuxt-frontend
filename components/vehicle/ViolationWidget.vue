<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="violationsRoute" link style="height:80px;">
        <v-list-item-avatar>
          <v-icon v-text="'mdi-shield-car'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="$tc('past_days', days)" class="overline" />
          <v-list-item-title v-text="$t('violations')" />
          <client-only>
            <nuxt-link :to="violationsRoute" v-text="$t('more')" class="caption text-decoration-none" />
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
  </v-card>
</template>

<script>
import { headers } from '@/mixins/datatables'
export default {
  mixins: [headers],
  data: () => ({
    days: 30,
    initialized: false
  }),
  computed: {
    vehicleNumber: vm => vm.$store.getters['vehicle/getVehicleNumber'],
    violationsRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/violations` }),
    items: vm => vm.$store.getters['vehicle/getViolationHistory'],
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
    const vehicle = this.vehicleNumber
    const start = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    const end = this.$moment().format('YYYY-MM-DD')
    await this.$store.dispatch('vehicle/fetchViolationHistory', { start, end, vehicle })
    this.initialized = true
  }
}
</script>
