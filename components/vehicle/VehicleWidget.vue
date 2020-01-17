<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="editVehicleRoute" link>
        <v-list-item-avatar>
          <v-icon v-text="'mdi-car'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="colorYearMakeModel" class="overline" />
          <v-list-item-title v-text="vehicle.vehicle_number" />
          <client-only>
            <nuxt-link :to="editVehicleRoute" v-text="$t('edit')" class="caption text-decoration-none" />
          </client-only>
        </v-list-item-content>
        <v-list-item-action v-if="vehicle.client_vehicle_number">
          <v-list-item-action-text v-text="$t('client_vehicle_#')" class="caption" />
          <client-only>
            <v-chip v-text="vehicle.client_vehicle_number" :title="$t('client_vehicle_number')" x-small />
          </client-only>
        </v-list-item-action>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-container>
        <v-row no-gutters>
          <v-col cols="6">
            <v-list subheader dense>
              <v-subheader v-text="$t('vehicle_details')" class="overline" />
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-car-key'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="vehicle.vehicle_number" />
                  <v-list-item-subtitle v-text="$t('vehicle_number')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-car-key'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle.client_vehicle_number || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('client_vehicle_number')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-bus-multiple'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle.category || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('vehicle_category')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-shape'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle.status || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('status')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-subtitles'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle.lease_type || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('lease_type')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <v-list dense subheader>
              <v-subheader v-text="$t('additional_information')" class="overline" />
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-calendar-arrow-left'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ $options.filters.date(vehicle.in_service_date) || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('in_service_date')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-calendar-arrow-right'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ $options.filters.date(vehicle.out_of_service_date) || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('out_of_service_date')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-calendar-month-outline'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle.months_in_service || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('months_in_service')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-counter'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle.reported_odometer || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('reported_odometer')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label-variant'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle.license_plate_number || '--' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('license_plate_number')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn
        @click="expanded = !expanded"
        :raised="expanded"
        :depressed="!expanded"
        :text="!expanded"
        color="primary"
        block
        small
      >
        <v-icon v-text="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" class="mr-4" />
        {{ expanded ? $t('less') : $t('more') }}
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="expanded" class="pa-0">
        <v-container class="py-0">
          <v-row>
            <v-col cols="6">
              <v-list subheader dense>
                <v-subheader v-text="$t('custom_labels')" class="overline" />
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle.client_use_1 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="client_labels.client_use_1_label" class="font-weight-light" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle.client_use_2 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="client_labels.client_use_2_label" class="font-weight-light" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle.client_use_3 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="client_labels.client_use_3_label" class="font-weight-light" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle.client_use_4 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="client_labels.client_use_4_label" class="font-weight-light" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle.client_use_5 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="client_labels.client_use_5_label" class="font-weight-light" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="6">
              <v-list subheader dense>
                <v-subheader v-text="$t('cost_center_information')" class="overline" />
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label-outline'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle.level_01 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="$t('level_01')" class="font-weight-light" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label-outline'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle.level_02 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="$t('level_02')" class="font-weight-light" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label-outline'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle.level_03 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="$t('level_03')" class="font-weight-light" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label-outline'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle.level_04 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="$t('level_04')" class="font-weight-light" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label-outline'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ vehicle.level_05 || '--' }}</v-list-item-title>
                    <v-list-item-subtitle v-text="$t('level_05')" class="font-weight-light" />
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
// import VehicleWidgetDetails from '@/components/vehicle/VehicleWidgetDetails'

export default {
  components: {
    // VehicleWidgetDetails
  },
  data: () => ({
    expanded: false
  }),
  computed: {
    client_labels: vm => vm.$store.getters['account/getClientUseLabels'],
    vehicle: vm => vm.$store.getters['vehicle/getVehicleInfo'],
    vehicleCenter () {
      // Concatenate those that exist https://stackoverflow.com/a/19903063
      return [this.vehicle.center_name, this.vehicle.center_code].filter(Boolean).join(' - ')
    },
    colorYearMakeModel () {
      return [this.vehicle.exterior_color, this.vehicle.year, this.vehicle.make, this.vehicle.model].filter(Boolean).join(' ')
    },
    editVehicleRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/edit-vehicle` })
  },
  methods: {
    goToEditVehicle () {
      this.$router.push(this.editVehicleRoute)
    }
  }
}
</script>

<style>

</style>
