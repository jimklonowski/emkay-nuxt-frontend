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

    <!-- Driver Data -->
    <v-container>
      <v-row no-gutters>
        <v-col v-for="(column, c) in columns" :key="`col-${c}`" cols="6">
          <v-list class="widget-list" subheader dense>
            <v-subheader v-text="column.label" class="overline" />
            <v-list-item v-for="(item, i) in column.items" :key="`item-${c}-${i}`">
              <v-list-item-icon class="action-icon">
                <v-btn v-if="item.action" @click="item.action" icon>
                  <v-icon v-text="item.icon" />
                </v-btn>
                <v-icon v-else v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.value" />
                <v-list-item-subtitle v-text="item.label" />
                <v-list-item-subtitle v-show="item.label2" v-text="item.label2" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { dialTo, emailTo } from '@/utility/helpers'
export default {
  data: vm => ({
    icon: 'mdi-account',
    menu: false
  }),
  computed: {
    ...mapGetters({
      custom_labels: 'account/getCustomLabels',
      driver_details: 'vehicle-dashboard/getDriverDetails',
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
    }),
    columns () {
      return [
        {
          label: this.$i18n.t('driver_details'),
          items: [
            {
              icon: 'mdi-map-marker',
              value: this.driver_details.address_1,
              label: this.driver_details.address_2,
              label2: this.cityStateZip
            },
            {
              icon: 'mdi-phone-outgoing',
              value: this.$options.filters.phone(this.driver_details.phone) || '--',
              label: this.$i18n.t('phone'),
              action: () => dialTo(this.driver_details.phone)
            },
            {
              icon: 'mdi-cellphone-iphone',
              value: this.$options.filters.phone(this.driver_details.mobile) || '--',
              label: this.$i18n.t('mobile'),
              action: () => dialTo(this.driver_details.mobile)
            },
            {
              icon: 'mdi-email-send',
              value: this.driver_details.email || '--',
              label: this.$i18n.t('email'),
              action: () => emailTo(this.driver_details.email)
            },
            {
              icon: 'mdi-smart-card',
              value: this.driver_details.selector || '--',
              label: this.$i18n.t('selector_level')
            },
            {
              icon: 'mdi-account-key',
              value: this.driver_details.reference_number || '--',
              label: this.$i18n.t('driver_reference_number')
            }
          ]
        },
        {
          label: this.$i18n.t('additional_information'),
          items: [
            {
              icon: 'mdi-card-account-details',
              value: this.driver_details.employee_id || '--',
              label: this.$i18n.t('employee_id')
            },
            {
              icon: 'mdi-label',
              value: this.driver_details.misc_1 || '--',
              label: this.custom_labels.driver_use_label_1 || this.$i18n.t('driver_use_label_1')
            },
            {
              icon: 'mdi-label',
              value: this.driver_details.misc_2 || '--',
              label: this.custom_labels.driver_use_label_2 || this.$i18n.t('driver_use_label_2')
            },
            {
              icon: 'mdi-label',
              value: this.driver_details.misc_3 || '--',
              label: this.custom_labels.driver_use_label_3 || this.$i18n.t('driver_use_label_3')
            },
            {
              icon: 'mdi-label',
              value: this.driver_details.misc_4 || '--',
              label: this.custom_labels.driver_use_label_4 || this.$i18n.t('driver_use_label_4')
            }
          ]
        }
      ]
    },
    actions () {
      return [
        {
          text: this.$i18n.t('edit_driver'),
          icon: 'mdi-account-edit',
          to: this.editDriverRoute
        }
      ]
    },
    cityState: vm => [vm.driver_details.city, vm.driver_details.state_province].filter(Boolean).join(', '),
    cityStateZip: vm => [vm.cityState, vm.driver_details.postal_code].filter(Boolean).join(' '),
    driverName: vm => [vm.driver_details.first_name, vm.driver_details.last_name].filter(Boolean).join(' '),
    editDriverRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/edit-driver` }),
    licenseStateNumber: vm => [vm.driver_details.license_number, vm.driver_details.license_state_province].filter(Boolean).join(' '),
    title: vm => vm.$options.filters.uppercase(vm.driverName)
  }
}
</script>
