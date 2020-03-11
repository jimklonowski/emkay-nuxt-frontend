<template>
  <v-card outlined class="vehicle-dashboard-widget">
    <!-- Toolbar -->
    <v-toolbar flat color="transparent">
      <v-avatar class="mr-2" size="36">
        <v-icon v-text="icon" color="grey" />
      </v-avatar>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <!-- Dropdown Menu -->
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
            <v-list-item v-for="(action, a) in actions" :key="`action-${a}`" :to="action.to" link>
              <v-list-item-action>
                <v-icon v-text="action.icon" />
              </v-list-item-action>
              <v-list-item-title v-text="action.text" />
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-divider />

    <!-- Vehicle Data -->
    <v-container>
      <v-row no-gutters>
        <v-col v-for="(column, c) in columns" :key="`col-${c}`" cols="6">
          <v-list class="widget-list" subheader dense>
            <v-subheader v-text="column.label" class="overline" />
            <v-list-item v-for="(item, i) in column.items" :key="`item-${c}-${i}`">
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.value" />
                <v-list-item-subtitle v-text="item.label" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>

    <!-- Expansion Panel and button for extra columns -->
    <v-card-actions class="pt-0">
      <v-btn
        @click="expanded = !expanded"
        depressed
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
            <v-col v-for="(column, c) in extra_columns" :key="`ecol-${c}`" cols="6">
              <v-list class="widget-list" subheader dense>
                <v-subheader v-text="column.label" class="overline" />
                <v-list-item v-for="(item, i) in column.items" :key="`eitem-${c}-${i}`">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.value" />
                    <v-list-item-subtitle v-text="item.label" />
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
  data: vm => ({
    expanded: false,
    icon: 'mdi-car',
    menu: false
  }),
  computed: {
    ...mapGetters({
      custom_labels: 'account/getCustomLabels',
      vehicle_details: 'vehicle-dashboard/getVehicleDetails',
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
    }),
    columns () {
      return [
        {
          label: this.$i18n.t('vehicle_details'),
          items: [
            {
              icon: 'mdi-car-key',
              label: this.$i18n.t('vehicle_number'),
              value: this.vehicle_details.vehicle_number || '--'
            },
            {
              icon: 'mdi-car-key',
              label: this.$i18n.t('client_vehicle_number'),
              value: this.vehicle_details.client_vehicle_number || '--'
            },
            {
              icon: 'mdi-bus-multiple',
              label: this.$i18n.t('vehicle_category'),
              value: this.vehicle_details.category || '--'
            },
            {
              icon: 'mdi-palette',
              label: this.$i18n.t('vehicle_color'),
              value: this.vehicle_details.exterior_color || '--'
            },
            {
              icon: 'mdi-shape',
              label: this.$i18n.t('status'),
              value: this.vehicle_details.status || '--'
            },
            {
              icon: 'mdi-subtitles',
              label: this.$i18n.t('lease_type'),
              value: this.vehicle_details.lease_type || '--'
            }
          ]
        },
        {
          label: this.$i18n.t('additional_information'),
          items: [
            {
              icon: 'mdi-calendar-arrow-left',
              label: this.$i18n.t('in_service_date'),
              value: this.$options.filters.date(this.vehicle_details.in_service_date) || '--'
            },
            {
              icon: 'mdi-calendar-arrow-right',
              label: this.$i18n.t('out_of_service_date'),
              value: this.$options.filters.date(this.vehicle_details.out_of_service_date) || '--'
            },
            {
              icon: 'mdi-calendar-month-outline',
              label: this.$i18n.t('months_in_service'),
              value: this.vehicle_details.months_in_service || '--'
            },
            {
              icon: 'mdi-counter',
              label: this.$i18n.t('reported_odometer'),
              value: this.vehicle_details.reported_odometer || '--'
            },
            {
              icon: 'mdi-label-variant',
              label: this.$i18n.t('license_plate_number'),
              value: this.licensePlate || '--'
            },
            {
              icon: 'mdi-remote',
              label: this.$i18n.t('transponder'),
              value: this.tollTransponder || '--'
            }
          ]
        }
      ]
    },
    extra_columns () {
      return [
        {
          label: this.$i18n.t('custom_labels'),
          items: [
            {
              icon: 'mdi-label',
              label: this.custom_labels.client_use_label_1 || this.$i18n.t('client_use_label_1'),
              value: this.vehicle_details.client_use_1 || '--'
            },
            {
              icon: 'mdi-label',
              label: this.custom_labels.client_use_label_2 || this.$i18n.t('client_use_label_2'),
              value: this.vehicle_details.client_use_2 || '--'
            },
            {
              icon: 'mdi-label',
              label: this.custom_labels.client_use_label_3 || this.$i18n.t('client_use_label_3'),
              value: this.vehicle_details.client_use_3 || '--'
            },
            {
              icon: 'mdi-label',
              label: this.custom_labels.client_use_label_4 || this.$i18n.t('client_use_label_4'),
              value: this.vehicle_details.client_use_4 || '--'
            },
            {
              icon: 'mdi-label',
              label: this.custom_labels.client_use_label_5 || this.$i18n.t('client_use_label_5'),
              value: this.vehicle_details.client_use_5 || '--'
            }
          ]
        },
        {
          label: this.$i18n.t('cost_center_information'),
          items: [
            {
              icon: 'mdi-label-outline',
              label: this.$i18n.t('level_01'),
              value: this.vehicle_details.level_01 || '--'
            },
            {
              icon: 'mdi-label-outline',
              label: this.$i18n.t('level_02'),
              value: this.vehicle_details.level_02 || '--'
            },
            {
              icon: 'mdi-label-outline',
              label: this.$i18n.t('level_03'),
              value: this.vehicle_details.level_03 || '--'
            },
            {
              icon: 'mdi-label-outline',
              label: this.$i18n.t('level_04'),
              value: this.vehicle_details.level_04 || '--'
            },
            {
              icon: 'mdi-label-outline',
              label: this.$i18n.t('level_05'),
              value: this.vehicle_details.level_05 || '--'
            }
          ]
        }
      ]
    },
    actions () {
      return [
        {
          text: this.$i18n.t('edit_vehicle'),
          icon: 'mdi-car-info',
          to: this.editVehicleRoute
        },
        {
          text: this.$i18n.t('assign_new_driver'),
          icon: 'mdi-smart-card',
          to: this.reassignDriverRoute
        }
      ]
    },
    licensePlate () {
      const plate = this.vehicle_details.license_plate_number || '--'
      const state = `(${this.vehicle_details.license_plate_state_province || '--'})`
      return [plate, state].join(' ')
    },
    reassignDriverRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/reassign-vehicle` }),
    editVehicleRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/edit-vehicle` }),
    title: vm => vm.$options.filters.uppercase(vm.yearMakeModel),
    tollTransponder: vm => [vm.vehicle_details.toll_type, vm.vehicle_details.transponder_number].filter(Boolean).join(' - '),
    yearMakeModel: vm => [vm.vehicle_details.year, vm.vehicle_details.make, vm.vehicle_details.model].filter(Boolean).join(' ')
  }
}
</script>
