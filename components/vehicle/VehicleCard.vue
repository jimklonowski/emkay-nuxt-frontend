<template>
  <v-card :shaped="!showTabs" outlined>
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
              {{ colorYearMakeModel }}
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

    <v-divider />

    <v-card-text>
      <v-row no-gutters>
        <v-col cols="6" sm="6">
          <v-list class="text-left">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-car-key</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle_info.vehicle_number }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('vehicle_number') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-car</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle_info.client_vehicle_number }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('client_vehicle_number') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bus-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle_info.category }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('vehicle_category') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="6" sm="6">
          <v-list class="text-left">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-label</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle_info.vin }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('vin') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-card-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle_info.bill_sort }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('bill_sort') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicleCenter }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('center') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="showTabs = !showTabs" text small block>
        {{ showTabs ? $t('less') : $t('details') }}
        <v-icon v-text="showTabs ? `mdi-chevron-up` : `mdi-chevron-down`" class="ml-2" />
      </v-btn>
    </v-card-actions>
    <!-- Vehicle Details -->
    <vehicle-card-details v-show="showTabs" />
  </v-card>
</template>

<script>
import VehicleCardDetails from '@/components/vehicle/VehicleCardDetails'

export default {
  components: {
    VehicleCardDetails
  },
  data: () => ({
    showTabs: false,
    tab: 0
  }),
  computed: {
    custom_labels: vm => vm.$store.getters['account/getCustomLabels'],
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
  async created () {
    if (!this.custom_labels) {
      debugger
      await this.$store.dispatch('account/init')
    }
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
