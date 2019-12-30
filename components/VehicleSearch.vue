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
      <v-list-item-avatar :size="48" color="primary lighten-2">
        <span class="white--text caption">{{ item.vehicle_number }}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ yearMakeModel(item) }}</v-list-item-title>
        <v-list-item-subtitle>{{ driverName(item) | lowercase | capitalize }}</v-list-item-subtitle>
      </v-list-item-content>
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
      // if (this.loading) { return }
      // if (!this.query) {
      //   this.$store.commit('search/reset')
      //   return
      // }
      // if (this.query.length < 3) { return }
    }
  },
  mounted () {
    this.axiosCancelTokenSource = this.$axios.CancelToken.source()
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
      return [item.driver_first_name, item.driver_last_name].filter(Boolean).join(' ')
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

<style>

</style>
