<template>
  <v-form @submit.stop="onSubmit">
    <v-autocomplete
      v-model="selection"
      :append-outer-icon="'mdi-search-web'"
      :label="$t('common.search')"
      :loading="loading"
      :items="items"
      :menu-props="{ 'nudgeBottom': 10, 'maxHeight': 360 }"
      :search-input.sync="query"
      @change="onSubmit"
      @click:append-outer="onSubmit"
      @keydown.enter.native.prevent="onSubmit"
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
          <v-list-item-title v-t="'vehicle_dashboard.search_placeholder'" />
        </v-list-item>
      </template>
      <template #selection="data">
        {{ data.item.vehicle_number }}
      </template>
      <template #item="data">
        <v-list-item-avatar :size="48" color="primary lighten-2">
          <span class="white--text caption">{{ data.item.vehicle_number }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="data.item.description" />
          <v-list-item-subtitle v-text="data.item.driver_name" />
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </v-form>
</template>

<script>
export default {
  name: 'VehicleSearch',
  data: () => ({
    loading: false,
    query: null,
    results: [],
    driverResults: [],
    vehicleResults: [],
    selection: null
  }),
  computed: {
    items () {
      if (!this.results.length) { return [] }
      // remove duplicates
      const res = this.results.map((result) => { return { ...result } })
      return res
    },
    schema () {
      return {
        vehicle: {
          label: this.$t('common.search'),
          type: 'text',
          placeholder: this.$t('vehicle_dashboard.search_placeholder'),
          hint: this.$t('vehicle_dashboard.search_hint'),
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
      if (this.loading) { return }
      const self = this
      this.loading = true
      const vehicleUrl = '/vehicles/search'
      const driverUrl = '/drivers/search'

      // Lazily load input items
      const vehicleRes = await this.$axios.get(vehicleUrl, { params: { query: this.query } })
      const driverRes = await this.$axios.get(driverUrl, { params: { query: this.query } })
      self.results = [...vehicleRes.data, ...driverRes.data]
      this.loading = false
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      if (this.selection && this.selection.vehicle_number) {
        // this.$router.push(this.localePath({ path: `/vehicle/${this.query}` }))
        this.$router.push(this.localePath({ path: `/vehicle/${this.selection.vehicle_number}` }))
      }
      this.loading = false
    }
  }
}
</script>

<style>

</style>
