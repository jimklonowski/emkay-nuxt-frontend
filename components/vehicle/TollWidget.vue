<template>
  <v-card outlined shaped>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-content two-line>
          <p class="overline text--disabled">
            {{ $tc('past_days', days) }}
          </p>
          <v-list-item-title>
            {{ $t('tolls') }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            <nuxt-link :to="{ path: `${this.$route.fullPath}/toll` }" class="text-decoration-none">
              {{ $t('more') }}
            </nuxt-link>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-spacer />
    </v-card-title>
    <v-card-title v-text="'$201.00'" class="display-2" />
    <v-card-text class="font-italic font-weight-light">
      This has
      <v-chip class="font-weight-regular mx-1 px-1" x-small label color="error">
        increased
      </v-chip>
      by 3.3% since last month.
    </v-card-text>
    <v-expand-transition>
      <v-card :loading="loading" v-show="showMore" flat>
        <v-data-table :headers="headers" :items="items" />
      </v-card>
    </v-expand-transition>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="showMore = !showMore" icon>
        <v-icon>{{ showMore ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'TollCard',
  data () {
    return {
      days: 30,
      initialized: false,
      loading: false,
      search: '',
      showMore: false
    }
  },
  computed: {
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
    },
    headers () {
      return this.columns.map((column, index) => {
        return {
          text: this.$i18n.t(column),
          value: column,
          class: 'report-column'
        }
      })
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
