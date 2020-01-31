<template>
  <v-flex class="d-flex">
    <v-card class="ma-6" width="300" outlined>
      <v-navigation-drawer
        left
        permanent
        floating
        width="100%"
      >
        <template #prepend>
          <v-list-item v-show="filterCount > 0" class="error" link dark>
            <v-list-item-avatar class="ma-0">
              <v-avatar v-text="filterCount" size="20" color="white error--text" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ $tc('filters_applied', filterCount) }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action @click="resetFilters">
              <v-icon v-text="'mdi-filter-variant-remove'" :title="$t('clear_filters')" />
            </v-list-item-action>
          </v-list-item>
        </template>
        <v-subheader class="overline">
          {{ $t('filters') }}
        </v-subheader>
        <v-list dense rounded>
          <v-list-item v-for="(field, index) in filterFields" :key="index">
            <v-list-item-content>
              <v-text-field
                v-model.trim="model[field]"
                @keydown.enter="addFilter(field, model[field])"
                :label="$t(field)"
                prepend-inner-icon="mdi-filter-variant"
                clearable
                dense
                outlined
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template #append>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="caption text-right grey--text">
                <span>{{ items.length }}</span>
                {{ $tc('vehicles', items.length) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-navigation-drawer>
    </v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card :loading="loading" outlined>
            <v-card-title class="font-lato">
              {{ $t('fleet_navigator') }}
            </v-card-title>
            <v-subheader v-show="hasFilters" class="overline px-4">
              {{ $t('current_filters') }}
            </v-subheader>
            <v-card-actions class="px-4">
              <!-- Applied Filters -->
              <v-flex>
                <!-- iterate each category -->
                <template v-for="(value, name, index) in currentFilters">
                  <!-- iterate each filter within that category -->
                  <v-chip
                    v-for="(filter, key) in currentFilters[name]"
                    :key="`${key}.${index}`"
                    @click:close="removeFilter(name, filter)"
                    close-icon="mdi-filter-variant-remove"
                    class="caption mx-2"
                    close
                  >
                    <strong>{{ $t(name) }}</strong>&nbsp;
                    <span>({{ filter }})</span>
                  </v-chip>
                </template>
              </v-flex>
            </v-card-actions>
            <v-card-actions>
              <v-col cols="auto">
                <v-select
                  v-model="sortBy"
                  :label="$t('sort')"
                  :items="displayFields.map(x => { return { text: $t(x), value: x }})"
                  @change="sortBy = $event"
                />
                <v-btn
                  :outlined="sortDesc"
                  :text="!sortDesc"
                  :color="sortDesc ? 'primary' : undefined"
                  @click="sortDesc = true"
                  icon
                >
                  <v-icon v-text="'mdi-sort-descending'" />
                </v-btn>
                <v-btn
                  :outlined="!sortDesc"
                  :text="sortDesc"
                  :color="!sortDesc ? 'primary' : undefined"
                  @click="sortDesc = false"
                  icon
                >
                  <v-icon v-text="'mdi-sort-ascending'" />
                </v-btn>
              </v-col>
            </v-card-actions>
            <v-card-text class="d-flex">
              <v-scale-transition>
                <!-- Selected Item Card -->
                <v-card v-if="hasSelection" outlined min-width="400" height="400" class="ma-2">
                  <v-card-title>
                    {{ [selectedItem.driver_first_name, selectedItem.driver_last_name].filter(Boolean).join(' ') }}
                    <v-spacer />
                    <v-btn @click="clearSelection" color="primary" icon>
                      <v-icon v-text="'mdi-close'" />
                    </v-btn>
                  </v-card-title>
                  <v-card-subtitle>
                    <nuxt-link :title="$t('to_vehicle_dashboard')" :to="localePath({ path: `/vehicle/${selectedItem.vehicle_number}` })" v-text="selectedItem.vehicle_number" class="text-decoration-none" nuxt />
                  </v-card-subtitle>
                  <v-divider />
                  <v-card-text class="pa-0">
                    <v-simple-table dense>
                      <template #default>
                        <tbody>
                          <tr v-for="(field, key) in displayFields" :key="key">
                            <th v-text="$t(field)" class="overflow-ellipsis" />
                            <td v-html="selectedItem[field]" class="overflow-ellipsis" />
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                  <v-card-actions />
                </v-card>
              </v-scale-transition>
              <v-slide-y-transition class="d-flex flex-wrap" group>
                <v-card
                  v-for="(item, key) in items"
                  :key="key"
                  :color="item.vehicle_number === selectedItem.vehicle_number ? 'primary' : undefined"
                  :dark="item.vehicle_number === selectedItem.vehicle_number"
                  @click="selectItem(item)"
                  height="100"
                  width="150"
                  class="ma-2"
                  outlined
                  shaped
                  tile
                >
                  <v-card-title>
                    {{ item.vehicle_number }}
                  </v-card-title>
                  <v-card-subtitle class="overflow-ellipsis">
                    {{ item.center_code }} - {{ item.center_name }}
                  </v-card-subtitle>
                </v-card>
              </v-slide-y-transition>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-flex>
</template>

<script>
// import { multiFilter, compareObjectByKey } from '@/utility/helpers'
export default {
  name: 'FleetNavigator',
  data () {
    return {
      // to start off, return a default object with no filters in each filterType array
      currentFilters: this.defaultFilter(),
      displayFields: ['center_code', 'center_name', 'model_year', 'vehicle_make', 'vehicle_model', 'vehicle_color', 'in_service_date', 'vin', 'contract_description'],
      filterFields: ['center_code', 'model_year', 'vehicle_make', 'vehicle_model'],
      sortBy: 'center_code',
      sortDesc: false
    }
  },
  computed: {
    // rawItems: vm => vm.$store.getters['fleet/getVehicles'],
    items () {
      const order = this.sortDesc ? 'desc' : 'asc'
      const sortBy = this.sortBy || 'center_code'
      return this.$store.getters['fleet/filteredVehicles'](this.currentFilters, sortBy, order)
    },
    // items2 () {
    //   const filteredItems = multiFilter(this.rawItems, this.currentFilters)
    //   return filteredItems.sort(compareObjectByKey(sortBy, order))
    // },
    // filteredItems2 () {
    //   // console.log(this.currentFilters)
    //   return multiFilter(this.items, this.currentFilters)
    // },
    filterCount () {
      return [].concat(...Object.values(this.currentFilters)).length
    },
    hasFilters: vm => Object.values(vm.currentFilters).map(x => x.filter(Boolean).length).reduce((a, b) => a + b, 0),
    hasSelection: vm => Object.keys(vm.selectedItem).length > 0
  },
  async asyncData ({ store }) {
    const model = {
      center_code: '',
      vehicle_make: ''
    }
    let loading, search
    const filters = {
      command: 'VEHICLEAUDIT',
      customer: 'EM102',
      json: 'Y'
    }

    // Fetch fleet
    await store.dispatch('fleet/fetchVehicles', filters)
    return {
      model,
      loading,
      search,
      // TODO: It might be better to use selectedIndex to track which vehicle is currently selected, instead of storing a copy of the selection Object.
      selectedItem: {}
    }
  },
  methods: {
    addFilter (name, value) {
      if (!value) { return }
      if (!this.currentFilters[name].includes(value)) {
        this.currentFilters[name].push(value.toUpperCase())
        this.model[name] = null // clear the textfield since we successfully added a filter
        this.clearSelection()
      }
      console.dir(this.currentFilters)
    },
    clearSelection () {
      this.selectedItem = {}
    },
    defaultFilter () {
      return {
        center_code: [],
        vehicle_make: [],
        vehicle_model: [],
        vehicle_category: [],
        driver_state_province: [],
        model_year: []
      }
    },
    removeFilter (name, value) {
      this.currentFilters[name].splice(this.currentFilters[name].findIndex(item => item === value), 1)
      this.selectedItem = {}
    },
    resetFilters () {
      this.currentFilters = this.defaultFilter()
    },
    selectItem (item) {
      this.selectedItem = {}
      // adding 100ms between clearing the old selection and selecting a new item lets us see the animation
      setTimeout(() => {
        this.selectedItem = { ...item }
      }, 100)
    }
  },
  head () {
    const title = this.$t('fleet_navigator')
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
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
