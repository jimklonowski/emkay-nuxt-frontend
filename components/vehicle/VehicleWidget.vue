<template>
  <v-card shaped outlined>
    <v-card-title class="pa-0">
      <v-list-item two-line>
        <v-list-item-avatar @click="goToEditVehicle" tile size="25" style="cursor:pointer;">
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-icon v-on="on" v-text="'mdi-square-edit-outline'" />
            </template>
            <span v-text="$t('edit')" />
          </v-tooltip>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="vehicle_info.vehicle_number" class="font-weight-bold" />
          <v-list-item-subtitle v-text="colorYearMakeModel" class="caption font-weight-light" />
        </v-list-item-content>
        <v-list-item-action v-if="vehicle_info.client_vehicle_number">
          <v-list-item-action-text v-text="$t('client_vehicle_#')" />
          <client-only>
            <v-chip v-text="vehicle_info.client_vehicle_number" :title="$t('client_vehicle_number')" x-small />
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
                  <v-list-item-title v-text="vehicle_info.vehicle_number" />
                  <v-list-item-subtitle v-text="$t('vehicle_number')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-car-key'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="vehicle_info.client_vehicle_number" />
                  <v-list-item-subtitle v-text="$t('client_vehicle_number')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-bus-multiple'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="vehicle_info.category" />
                  <v-list-item-subtitle v-text="$t('vehicle_category')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-shape'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="vehicle_info.status" />
                  <v-list-item-subtitle v-text="$t('status')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-subtitles'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="vehicle_info.lease_type" />
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
                  <v-list-item-title>{{ $options.filters.date(vehicle_info.in_service_date) || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('in_service_date')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-calendar-arrow-right'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ $options.filters.date(vehicle_info.out_of_service_date) || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('out_of_service_date')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-calendar-month-outline'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.months_in_service || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('months_in_service')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-counter'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.reported_odometer || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('reported_odometer')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label-variant'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.license_plate_number || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('license_plate_number')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <v-list subheader dense>
              <v-subheader v-text="$t('custom_labels')" class="overline" />
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.client_use_1 || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="client_labels.client_use_1_label" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.client_use_2 || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="client_labels.client_use_2_label" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.client_use_3 || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="client_labels.client_use_3_label" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.client_use_4 || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="client_labels.client_use_4_label" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.client_use_5 || '&nbsp;' }}</v-list-item-title>
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
                  <v-list-item-title>{{ vehicle_info.level_01 || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('level_01')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label-outline'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.level_02 || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('level_02')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label-outline'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.level_03 || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('level_03')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label-outline'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.level_04 || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('level_04')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label-outline'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ vehicle_info.level_05 || '&nbsp;' }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('level_05')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions />
  </v-card>
</template>

<script>
// import VehicleWidgetDetails from '@/components/vehicle/VehicleWidgetDetails'

export default {
  components: {
    // VehicleWidgetDetails
  },
  data: () => ({}),
  computed: {
    client_labels: vm => vm.$store.getters['account/getClientUseLabels'],
    // order_status: vm => vm.$store.getters['vehicle/getOrderStatus'],
    // sale_info: vm => vm.$store.getters['vehicle/getSaleInfo'],
    vehicle_info: vm => vm.$store.getters['vehicle/getVehicleInfo'],
    vehicleCenter () {
      // Concatenate those that exist https://stackoverflow.com/a/19903063
      return [this.vehicle_info.center_name, this.vehicle_info.center_code].filter(Boolean).join(' - ')
    },
    colorYearMakeModel () {
      return [this.vehicle_info.exterior_color, this.vehicle_info.year, this.vehicle_info.make, this.vehicle_info.model].filter(Boolean).join(' ')
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
