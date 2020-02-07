<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="odometerRoute" link style="height:80px;">
        <v-list-item-avatar>
          <v-icon v-text="'mdi-counter'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="$tc('past_days', days)" class="overline" />
          <v-list-item-title v-text="$t('odometer')" />
          <client-only>
            <nuxt-link :to="odometerRoute" v-text="$t('more')" class="caption text-decoration-none" />
          </client-only>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">
        <!-- :hide-default-footer="items.length <= 5" -->
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :mobile-breakpoint="0"
          :sort-by="['odometer_date']"
          :sort-desc="true"
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
  mixins: [headers],
  data () {
    return {
      days: 30,
      initialized: false
    }
  },
  computed: {
    columns () {
      return [
        'odometer_date',
        'odometer',
        'type'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('odometer_date'),
          value: 'odometer_date',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('odometer'),
          value: 'odometer',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('type'),
          value: 'type',
          class: 'report-column'
        }
      ]
    },
    odometerRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/odometer` }),
    items: vm => vm.$store.getters['vehicle/getOdometerHistory'],
    vehicle_number: vm => vm.$store.getters['vehicle/getVehicleNumber']
  },
  async mounted () {
    const vehicle = this.vehicle_number
    const end = this.$moment().format('YYYY-MM-DD')
    const start = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    await this.$store.dispatch('vehicle/fetchOdometerHistory', { start, end, vehicle })
    this.initialized = true
  }
}
</script>
