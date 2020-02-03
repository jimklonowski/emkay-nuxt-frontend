<template>
  <v-container class="vehicle-hero" fill-height>
    <v-row justify="center">
      <v-col cols="12" md="8">
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
          no-filter
          hide-details
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
              <v-list-item-title v-if="query && query.length > 2 && !results.length" v-text="$t('no_search_results', { query })" />
              <v-list-item-title v-else v-text="$t('search_placeholder')" />
            </v-list-item>
          </template>

          <!-- <template #no-data>
            <v-list-item dense>
              <v-list-item-title v-text="noDataText" />
            </v-list-item>
          </template> -->

          <template #selection="{ item }">
            {{ item.vehicle_number }}
          </template>

          <template #item="{ item }">
            <v-list-item-avatar :size="64" :title="$t('vehicle_#')" color="grey darken-2 white--text">
              <span class="caption">{{ item.vehicle_number }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <span v-if="item.client_vehicle_number">
                <v-chip :title="$t('client_vehicle_#')" dark label x-small>{{ item.client_vehicle_number }}</v-chip>
              </span>
              <v-list-item-title class="subtitle-2">
                {{ colorYearMakeModel(item) }}
              </v-list-item-title>
              <v-list-item-subtitle class="body-2">
                {{ driverName(item) }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="item.vin" class="caption font-weight-light">
                {{ item.vin }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="align-center justify-start">
              <v-list-item-action-text v-if="item.plate_number" class="px-2">
                {{ $t('plate_#') }}
              </v-list-item-action-text>
              <v-chip v-if="item.plate_number" label small dark>
                {{ item.plate_number }}
              </v-chip>
            </v-list-item-action>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import VehicleSearch from '@/components/VehicleSearch'
import { mapActions } from 'vuex'
export default {
  name: 'VehicleSearch',
  middleware: ['check-auth'],
  data: () => ({
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
      return this.results.map((result) => { return { ...result } })
    },
    noDataText () {
      if (this.query && this.query.length > 2 && !this.results.length) {
        return this.$i18n.t('no_search_results', { query: this.query })
      }
      return this.$i18n.t('search_placeholder')
    }
  },
  watch: {
    async query () {
      if (!this.query) {
        this.$store.commit('search/reset')
      } else if (this.query.length >= 3) {
        // call the mappedAction method from vuex 'search' store
        await this.search(this.query)
      }
    }
  },
  mounted () {
    // clear existing results before rendering search box (back button perhaps, stale results)
    if (this.results && this.results.length !== 0) {
      this.$store.dispatch('search/reset')
    }
  },
  methods: {
    ...mapActions({
      search: 'search/fetchVehicles'
    }),
    selectVehicle () {
      if (this.selection && this.selection.vehicle_number) {
        this.$router.push(this.localePath({ path: `/vehicle/${this.selection.vehicle_number}` }))
      }
    },
    colorYearMakeModel (item) {
      return [item.color, item.year, item.make, item.model].filter(Boolean).join(' ')
    },
    driverName (item) {
      return [item.driver_first_name, item.driver_last_name].filter(Boolean).join(' ')
    }
  },
  head () {
    const title = this.$t('vehicle_search')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>

<style>
.vehicle-hero::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.theme--dark .vehicle-hero::before {
  background-image: url(~@/assets/coveredcar--dark.jpg);
  opacity: 0.5;
}
.theme--light .vehicle-hero::before {
  background-image: url(~@/assets/coveredcar--light.jpg);
  opacity: 1.0;
}
</style>
