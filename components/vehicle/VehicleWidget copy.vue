<template>
  <v-card shaped outlined>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar @click="goToEditVehicle" tile size="32" class="d-flex flex-column" style="cursor:pointer;">
          <v-icon>mdi-car-info</v-icon>
          <p class="ma-0 overline">
            {{ $t('edit') }}
          </p>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="body-1">
            <span class="font-weight-bold">{{ vehicle_info.vehicle_number }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              {{ yearMakeModel }}
            </p>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              {{ vehicle_info.exterior_color }}
            </p>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>{{ $t('vehicle_#') }}</v-list-item-action-text>
          <v-chip :title="$t('vehicle_number')" pill outlined x-small>
            {{ vehicle_info.vehicle_number }}
            <!-- {{ $route.params.vehicle }} -->
          </v-chip>
          <v-chip v-if="vehicle_info.client_vehicle_number" :title="$t('client_vehicle_number')" pill outlined x-small>
            {{ vehicle_info.client_vehicle_number }}
          </v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-card-title>

    <v-divider class="mb-2" />

    <v-card-text class="pa-0">
      <v-row no-gutters>
        <v-col cols="6">
          <v-list class="text-left py-0" dense>
            <v-subheader class="overline">
              {{ $t('vehicle_details') }}
            </v-subheader>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-car-key</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.vehicle_number }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('vehicle_number') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-car</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.client_vehicle_number || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('client_vehicle_number') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bus-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.category || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('vehicle_category') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bus-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.status || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('status') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-2" />
            <v-subheader class="overline">
              {{ $t('labels') }}
            </v-subheader>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-label</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.client_use_1 || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ client_labels.client_use_1_label }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-label</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.client_use_2 || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ client_labels.client_use_2_label }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-label</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.client_use_3 || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ client_labels.client_use_3_label }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-label</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.client_use_4 || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ client_labels.client_use_4_label }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-label</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.client_use_5 || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ client_labels.client_use_5_label }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="6">
          <v-list class="text-left py-0" dense>
            <v-subheader class="overline">
              {{ $t('labels') }}
            </v-subheader>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-label</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.vin || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('vin') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-card-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.bill_sort || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('bill_sort') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.center_code }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('center_code') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicle_info.center_name }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('center_name') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-2" />
            <v-subheader class="overline">
              {{ $t('labels') }}
            </v-subheader>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicleCenter }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('center') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicleCenter }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('center') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ vehicleCenter }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('center') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <!-- <vehicle-widget-details /> -->
      <!-- <v-btn @click="showTabs = !showTabs" text small block>
        {{ showTabs ? $t('less') : $t('details') }}
        <v-icon v-text="showTabs ? `mdi-chevron-up` : `mdi-chevron-down`" class="ml-2" />
      </v-btn> -->
    </v-card-actions>
    <!-- Vehicle Details -->
    <!-- <vehicle-card-details v-show="showTabs" /> -->
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
    yearMakeModel () {
      return [this.vehicle_info.year, this.vehicle_info.make, this.vehicle_info.model].filter(Boolean).join(' ')
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
