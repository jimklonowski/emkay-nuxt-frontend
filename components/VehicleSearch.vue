<template>
  <v-autocomplete
    v-model="selection"
    :label="$t('search')"
    :loading="loading"
    :items="items"
    :menu-props="{ 'nudgeBottom': 10, 'maxHeight': 360 }"
    :search-input.sync="query"
    @change="selectVehicle"
    @keydown.enter.stop="selectVehicle"
    item-value="vehicle_number"
    item-text="description"
    autocomplete="off"
    clearable
    solo
    hide-details
    no-filter
    return-object
    full-width
  >
    <template #progress>
      <v-progress-linear
        :buffer-value="0"
        color="primary lighten-2"
        height="4"
        absolute
        indeterminate
        stream
      />
    </template>
    <template #no-data>
      <v-list-item dense>
        <v-list-item-title v-if="query && query.length > 2 && !results.length" v-t="{ path: 'no_search_results', args: { query } }" />
        <v-list-item-title v-else v-t="'search_placeholder'" />
      </v-list-item>
    </template>
    <template #selection="{ item }">
      {{ item.vehicle_number }}
    </template>
    <template #item="{ item }">
      <v-list-item-avatar :size="64" :title="$t('vehicle_#')" color="grey darken-2 white--text">
        <span class="caption">{{ item.vehicle_number }}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        <p v-if="item.client_vehicle_number">
          <v-chip
            :title="$t('client_vehicle_#')"
            x-small
            label
            dark
          >
            {{ item.client_vehicle_number }}
          </v-chip>
        </p>
        <v-list-item-title class="subtitle-2">
          <span v-text="yearMakeModel(item)" :title="$t('vehicle')" />
        </v-list-item-title>
        <v-list-item-subtitle class="body-2">
          <span v-text="driverName(item)" :title="$t('driver')" />
        </v-list-item-subtitle>
        <v-list-item-subtitle style="opacity:0.8;" class="caption">
          <span v-text="item.vin" :title="$t('vin')" />
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="align-center justify-start">
        <v-list-item-action-text v-if="item.plate_number" class="px-2">
          {{ $t('plate_#') }}
        </v-list-item-action-text>
        <v-chip v-if="item.plate_number" :title="$t('plate_#')" label small dark>
          {{ item.plate_number }}
        </v-chip>
      </v-list-item-action>
    </template>
  </v-autocomplete>
</template>

<script>
// import axios from 'axios'
// let axiosCancelTokenSource = axios.CancelToken.source()
export default {
  name: 'VehicleSearch',
  data: () => ({
    axiosCancelTokenSource: null,
    query: '',
    selection: null
  }),
  computed: {
    error: vm => vm.$store.getters['search/getError'],
    loading: vm => vm.$store.getters['search/getLoading'],
    results: vm => vm.$store.getters['search/getResults'],
    items () {
      if (!this.results.length) { return [] }
      // remove duplicates
      const res = this.results.map((result) => { return { ...result } })
      return res
    },
    schema () {
      return {
        vehicle: {
          label: this.$t('search'),
          type: 'text',
          placeholder: this.$t('search_placeholder'),
          hint: this.$t('search_hint'),
          counter: 6,
          appendOuterIcon: 'send',
          required: true,
          persistentHint: true,
          autocomplete: false,
          outlined: true
        }
      }
    }
  },
  watch: {
    async query () {
      if (!this.query) {
        this.$store.commit('search/reset')
      } else if (this.query.length >= 3) {
        await this.search()
      }
    }
  },
  mounted () {
    this.axiosCancelTokenSource = this.$axios.CancelToken.source()
    // clear existing results before rendering search box (back button perhaps, stale results)
    if (this.results && this.results.length !== 0) {
      this.$store.dispatch('search/reset')
    }
  },
  methods: {
    filters () {
      const filters = {
        command: 'WEBVEHICLE',
        subcommand: 'VEHICLE_SEARCH',
        search_type: 'VEHICLE_NUMBER',
        search_data: this.query || '',
        customer: 'EM102'
        // ,user: 'EMKSALE'
      }
      return filters
    },
    driverName (item) {
      // return [item.driver_first_name, item.driver_last_name].filter(Boolean).join(' ')
      const name = [item.driver_first_name, item.driver_last_name].filter(Boolean).join(' ')
      return this.$options.filters.capitalize(this.$options.filters.lowercase(name))
    },
    yearMakeModel (item) {
      return [item.color, item.year, item.make, item.model].filter(Boolean).join(' ')
    },
    selectVehicle () {
      if (this.selection && this.selection.vehicle_number) {
        this.$router.push(this.localePath({ path: `/vehicle/${this.selection.vehicle_number}` }))
      }
    },
    async search () {
      if (this.loading) {
        this.axiosCancelTokenSource.cancel()
        this.axiosCancelTokenSource = this.$axios.CancelToken.source()
      }
      await this.$store.dispatch('search/fetchVehicles', { filters: this.filters(), cancelToken: this.axiosCancelTokenSource.token })
    }
  }
}
</script>
