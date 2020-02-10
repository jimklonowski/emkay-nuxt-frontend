<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="tollRoute" link style="height:80px;">
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
      <v-skeleton-loader :loading="!initialized" type="table">
        <v-data-table
          :dense="items && items.length !== 0"
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :mobile-breakpoint="0"
          :sort-by="['date']"
          :sort-desc="[true]"
          class="striped"
        />
      </v-skeleton-loader>
    </v-card-text>
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
    vehicle_number: vm => vm.$store.getters['vehicle/getVehicleNumber'],
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
    const vehicle = this.vehicle_number
    const start = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    const end = this.$moment().format('YYYY-MM-DD')
    await this.$store.dispatch('vehicle/fetchTollHistory', { start, end, vehicle })
    this.initialized = true
  }
}
</script>

<style>

</style>
