<template>
  <v-card :loading="loading" outlined>
    <v-card-title class="font-lato">
      {{ $t('fleet_navigator') }}
    </v-card-title>
    <v-card-actions>
      <v-container>
        <v-subheader>{{ $t('filters') }}</v-subheader>
        <v-row>
          <v-flex>
            <template v-for="(value, name, index) in currentFilters">
              <v-chip
                v-for="(filter, key) in currentFilters[name]"
                :key="`${key}.${index}`"
                @click:close="removeFilter(filter)"
                close-icon="mdi-filter-remove"
                class="caption mx-2"
                close
              >
                <!-- <v-avatar color="primary white--text" left>
                  {{ filter.value }}
                </v-avatar> -->
                <!-- <v-avatar left>
                  <v-icon v-text="'mdi-filter'" />
                </v-avatar> -->
                <strong>{{ $t(filter.name) }}</strong>&nbsp;
                <span>({{ filter.value }})</span>
              </v-chip>
            </template>
          </v-flex>
        </v-row>
        <v-row>
          <v-col v-show="currentFilters.center_code.length < 1" cols="6" md="3">
            <v-text-field
              v-model="center_code"
              @keydown.enter="addFilter('center_code', center_code)"
              prepend-inner-icon="mdi-filter"
              label="Filter by Center Code"
              hint="Press Enter"
              outlined
              dense
            />
          </v-col>
          <v-col v-show="currentFilters.vehicle_make.length < 1" cols="6" md="3">
            <v-text-field
              v-model="vehicle_make"
              @keydown.enter="addFilter('vehicle_make', vehicle_make)"
              prepend-inner-icon="mdi-filter"
              label="Filter by Vehicle Make"
              hint="Press Enter"
              outlined
              dense
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
    <v-card-text class="pa-0">
      <v-container>
        <v-row>
          <v-scroll-y-transition>
            <v-col v-if="!!selectedItem" :cols="!!selectedItem ? 3 : undefined">
              <v-card elevation="4" shaped>
                <v-card-title>
                  {{ [selectedItem.driver_first_name, selectedItem.driver_last_name].filter(Boolean).join(' ') }}
                  <v-spacer />
                  <v-btn @click="selectedItem = null" color="primary" icon>
                    <v-icon v-text="'mdi-close'" />
                  </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text class="pa-0">
                  <v-simple-table dense>
                    <template #default>
                      <tbody>
                        <tr>
                          <th>{{ $t('center_code') }}</th>
                          <td>{{ selectedItem.center_code }}</td>
                        </tr>
                        <tr>
                          <th>{{ $t('center_name') }}</th>
                          <td>{{ selectedItem.center_name }}</td>
                        </tr>
                        <tr>
                          <th>{{ $t('model_year') }}</th>
                          <td>{{ selectedItem.model_year }}</td>
                        </tr>
                        <tr>
                          <th>{{ $t('vehicle_make') }}</th>
                          <td>{{ selectedItem.vehicle_make }}</td>
                        </tr>
                        <tr>
                          <th>{{ $t('vehicle_model') }}</th>
                          <td>{{ selectedItem.vehicle_model }}</td>
                        </tr>
                        <tr>
                          <th>{{ $t('vehicle_color') }}</th>
                          <td>{{ selectedItem.vehicle_color }}</td>
                        </tr>
                        <tr>
                          <th>{{ $t('in_service_date') }}</th>
                          <td>{{ selectedItem.in_service_date | date }}</td>
                        </tr>
                        <tr>
                          <th>{{ $t('vin') }}</th>
                          <td>{{ selectedItem.vin }}</td>
                        </tr>
                        <tr>
                          <th>{{ $t('contract_description') }}</th>
                          <td>{{ selectedItem.contract_description }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
                <v-card-actions />
              </v-card>
            </v-col>
          </v-scroll-y-transition>
          <v-col :cols="!!selectedItem ? 9 : 12">
            <v-slide-y-transition class="d-flex flex-wrap" group>
              <client-only>
                <v-card
                  v-for="(item, key) in filteredItems"
                  :key="key"
                  max-width="350"
                  class="ma-2"
                  outlined
                  tile
                >
                  <v-card-title @click="selectItem(item)">
                    {{ item.vehicle_number }}
                  </v-card-title>
                  <v-card-subtitle>{{ item.center_code }} - {{ item.center_name }}</v-card-subtitle>
                  <!-- <v-card-text>{{ item.center_name }}</v-card-text> -->
                  <v-card-text class="pa-0">
                    <v-simple-table dense>
                      <template #default>
                        <tbody>
                          <tr>
                            <td>{{ $t('model_year') }}</td>
                            <td>{{ item.model_year }}</td>
                          </tr>
                          <tr>
                            <td>{{ $t('vehicle_make') }}</td>
                            <td>{{ item.vehicle_make }}</td>
                          </tr>
                          <tr>
                            <td>{{ $t('vehicle_model') }}</td>
                            <td>{{ item.vehicle_model }}</td>
                          </tr>
                          <tr>
                            <td>{{ $t('vehicle_category') }}</td>
                            <td>{{ item.vehicle_category }}</td>
                          </tr>
                          <tr>
                            <td>{{ $t('vehicle_color') }}</td>
                            <td>{{ item.vehicle_color }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </client-only>
            </v-slide-y-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'FleetNavigator',
  computed: {
    items: vm => vm.$store.getters['fleet/getVehicles'],
    filteredItems () {
      // this needs to handle arrays of filters with AND
      // TODO: should be able to filter 001 and 002 and see BOTH sets of vehicles ([001 OR 002]), not an empty set of vehicles with center_code===[001 and 002]
      let filtered = this.items

      this.currentFilters.center_code.forEach(filter => {
        filtered = filtered.filter(record => {
          return filter.name === 'center_code'
            ? new RegExp(filter.value, 'i').test(record[filter.name])
            : record[filter.name] === filter.value
        })
      })
      return filtered
    }
  },
  async asyncData ({ store }) {
    let center_code, vehicle_make
    let loading, search
    const filters = {
      command: 'VEHICLEAUDIT',
      customer: 'EM102',
      json: 'Y'
    }
    // Fetch fleet
    await store.dispatch('fleet/fetchVehicles', filters)
    return {
      // currentFilters: [{ name: 'center_code', value: '001' }],
      center_code,
      // object that contains arrays of filters we will support
      currentFilters: {
        center_code: [],
        vehicle_make: []
      },
      loading,
      search,
      selectedItem: null,
      vehicle_make
    }
  },
  methods: {
    addFilter (name, value) {
      this.currentFilters[name].push({
        name,
        value
      })
      this.center_code = null
      this.vehicle_make = null
    },
    removeFilter (x) {
      this.currentFilters[x.name].splice(this.currentFilters[x.name].findIndex(item => item === x), 1)
    },
    selectItem (item) {
      this.selectedItem = { ...item }
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
