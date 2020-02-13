<template>
  <v-card outlined class="vehicle-widget">
    <!-- Title Toolbar and Dropdown Menu -->
    <v-card-title class="pa-0">
      <v-toolbar flat>
        <v-avatar class="mr-2" size="36">
          <v-icon v-text="'mdi-car'" color="grey" />
        </v-avatar>
        <v-toolbar-title>
          {{ yearMakeModel | uppercase }}
        </v-toolbar-title>
        <v-spacer />
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          origin="top right"
          transition="scale-transition"
          left
        >
          <template #activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon v-text="'mdi-dots-vertical'" />
            </v-btn>
          </template>
          <v-card>
            <v-list nav dense>
              <v-list-item :to="editVehicleRoute" link>
                <v-list-item-action>
                  <v-icon v-text="'mdi-car-info'" />
                </v-list-item-action>
                <v-list-item-title>{{ $t('edit_vehicle') }}</v-list-item-title>
              </v-list-item>
              <v-list-item :to="assignDriverRoute" link>
                <v-list-item-action>
                  <v-icon v-text="'mdi-smart-card'" />
                </v-list-item-action>
                <v-list-item-title>{{ $t('assign_new_driver') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar>
    </v-card-title>
    <v-divider />
    <!-- The Data -->
    <v-card-text class="pa-0">
      <v-container>
        <v-row no-gutters>
          <v-col cols="6">
            <v-list subheader dense class="widget-list">
              <v-subheader v-text="$t('vehicle_details')" class="overline" />
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-car-key'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="vehicle_details.vehicle_number" />
                  <v-list-item-subtitle v-text="$t('vehicle_number')" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-car-key'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_details.client_vehicle_number || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('client_vehicle_number')" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-bus-multiple'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_details.category || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('vehicle_category')" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-palette'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_details.exterior_color || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('vehicle_color')" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-shape'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_details.status || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('status')" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-subtitles'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_details.lease_type || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('lease_type')" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <v-list dense subheader class="widget-list">
              <v-subheader v-text="$t('additional_information')" class="overline" />
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-calendar-arrow-left'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ $options.filters.date(vehicle_details.in_service_date) || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('in_service_date')" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-calendar-arrow-right'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ $options.filters.date(vehicle_details.out_of_service_date) || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('out_of_service_date')" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-calendar-month-outline'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_details.months_in_service || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('months_in_service')" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-counter'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_details.reported_odometer || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('reported_odometer')" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label-variant'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ licensePlate }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('license_plate_number')" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-remote'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ tollTransponder || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('transponder')" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <!-- Show More/Less button -->
    <v-card-actions class="pt-0">
      <v-btn
        @click="expanded = !expanded"
        :text="!expanded"
        depressed
        block
        small
      >
        <v-icon v-text="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" class="mr-4" />
        {{ expanded ? $t('less') : $t('more') }}
      </v-btn>
    </v-card-actions>
    <!-- Expansion Panel -->
    <v-slide-y-transition>
      <v-card-text v-show="expanded" class="pa-0">
        <v-container class="py-0">
          <v-row>
            <v-col cols="6">
              <v-list subheader dense class="widget-list">
                <v-subheader v-text="$t('custom_labels')" class="overline" />
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle_details.client_use_1 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle>{{ custom_labels.client_use_label_1 || $t('client_use_label_1') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle_details.client_use_2 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle>{{ custom_labels.client_use_label_2 || $t('client_use_label_2') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle_details.client_use_3 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle>{{ custom_labels.client_use_label_3 || $t('client_use_label_3') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle_details.client_use_4 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle>{{ custom_labels.client_use_label_4 || $t('client_use_label_4') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle_details.client_use_5 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle>{{ custom_labels.client_use_label_5 || $t('client_use_label_5') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="6">
              <v-list subheader dense class="widget-list">
                <v-subheader v-text="$t('cost_center_information')" class="overline" />
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label-outline'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle_details.level_01 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="$t('level_01')" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label-outline'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle_details.level_02 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="$t('level_02')" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label-outline'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle_details.level_03 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="$t('level_03')" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label-outline'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle_details.level_04 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="$t('level_04')" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label-outline'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle_details.level_05 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="$t('level_05')" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      expanded: false,
      menu: false
    }
  },
  computed: {
    /**
     * Vuex Getters
     */
    ...mapGetters({
      custom_labels: 'account/getCustomLabels',
      vehicle_details: 'vehicle/getVehicleDetails',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    vehicleCenter () {
      // Concatenate those that exist https://stackoverflow.com/a/19903063
      return [this.vehicle_details.center_name, this.vehicle_details.center_code].filter(Boolean).join(' - ')
    },
    colorYearMakeModel () {
      return [this.vehicle_details.exterior_color, this.vehicle_details.year, this.vehicle_details.make, this.vehicle_details.model].filter(Boolean).join(' ')
    },
    licensePlate () {
      const license_plate = this.vehicle_details.license_plate_number || '--'
      const license_state = `(${this.vehicle_details.license_plate_state_province || '--'})`
      return [license_plate, license_state].join(' ')
    },
    tollTransponder () {
      return [this.vehicle_details.toll_type, this.vehicle_details.transponder_number].filter(Boolean).join(' - ')
    },
    yearMakeModel () {
      return [this.vehicle_details.year, this.vehicle_details.make, this.vehicle_details.model].filter(Boolean).join(' ')
    },
    assignDriverRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/reassign-vehicle` }),
    editVehicleRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/edit-vehicle` })
  }
}
</script>
