<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="rentalRoute" link style="height:80px;">
        <v-list-item-avatar>
          <v-icon v-text="'mdi-bus-clock'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="$tc('past_days', days)" class="overline" />
          <v-list-item-title v-text="$t('rental_history')" />
          <client-only>
            <nuxt-link :to="rentalRoute" v-text="$t('more')" class="caption text-decoration-none" />
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
    columns () {
      return [
        'date',
        'voucher',
        'days',
        'rental_rate',
        'total_amount',
        'reason'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('date'),
          value: 'date',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('voucher'),
          value: 'voucher',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('days'),
          value: 'days',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('rental_rate'),
          value: 'rental_rate',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('total_amount'),
          value: 'total_amount',
          class: 'report-column'
        },
        {
          text: this.$i18n.t('reason'),
          value: 'reason',
          class: 'report-column'
        }
      ]
    },
    rentalRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/rentals` }),
    items: vm => vm.$store.getters['vehicle/getOdometerHistory'],
    vehicle_number: vm => vm.$store.getters['vehicle/getVehicleNumber']
  },
  async mounted () {
    const vehicle = this.vehicle_number
    const end = this.$moment().format('YYYY-MM-DD')
    const start = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    await this.$store.dispatch('vehicle/fetchRentalHistory', { start, end, vehicle })
    this.initialized = true
  }
}
</script>
