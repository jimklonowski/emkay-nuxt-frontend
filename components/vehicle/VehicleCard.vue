<template>
  <v-card outlined shaped>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar @click.stop="editVehicle" tile size="32" class="d-flex flex-column" style="cursor:pointer;">
          <v-icon>mdi-car-info</v-icon>
          <p class="ma-0 overline">
            {{ $t('common.edit') }}
          </p>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="body-1">
            <span class="font-weight-bold">{{ vehicle.vehicle_number }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              {{ yearMakeModel }}
            </p>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              {{ vehicle.vehicle_color }}
            </p>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>{{ $t('vehicle.vehicle_#') }}</v-list-item-action-text>
          <v-chip :title="$t('vehicle.vehicle_number')" pill outlined x-small>
            {{ vehicle.vehicle_number }}
            <!-- {{ $route.params.vehicle }} -->
          </v-chip>
          <v-chip :title="$t('vehicle.client_vehicle_number')" pill outlined x-small>
            {{ vehicle.client_vehicle_number }}
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
                  {{ vehicle.vehicle_number }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('vehicle.vehicle_number') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-car</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle.client_vehicle_number }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('vehicle.client_vehicle_number') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bus-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle.vehicle_classification }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('vehicle.vehicle_classification') }}
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
                  {{ vehicle.vin }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('vehicle.vin') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-card-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle.billing_sort }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('common.billing_sort') }}
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
                  {{ $t('common.center') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <!-- <v-spacer />
      <v-btn text small>
        <v-icon small class="mr-1">
          mdi-pencil
        </v-icon>
        Edit
      </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    vehicle: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({

  }),
  computed: {
    vehicleCenter () {
      // Concatenate those that exist https://stackoverflow.com/a/19903063
      return [this.vehicle.center_name, this.vehicle.center_code].filter(Boolean).join(' - ')
    },
    yearMakeModel () {
      // return `${this.vehicle.vehicle_year} ${this.vehicle.vehicle_make} ${this.vehicle.vehicle_model}`
      return [this.vehicle.vehicle_year, this.vehicle.vehicle_make, this.vehicle.vehicle_model].filter(Boolean).join(' ')
    }
  },
  methods: {
    editVehicle () {
      this.$router.push({ path: `${this.$route.fullPath}/edit-vehicle` })
    }
  }
}
</script>

<style>

</style>
