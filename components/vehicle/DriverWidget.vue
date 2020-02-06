<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="editDriverRoute" link style="height:80px;">
        <v-list-item-avatar>
          <v-icon v-text="'mdi-account-edit'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle class="overline">
            {{ driver_details.employee_id || '&nbsp;' }}
          </v-list-item-subtitle>
          <v-list-item-title v-text="driverName" />
          <client-only>
            <nuxt-link :to="editDriverRoute" v-text="$t('edit')" class="caption text-decoration-none" />
          </client-only>
        </v-list-item-content>
        <v-list-item-action v-if="driver_details.reference_number">
          <v-list-item-action-text v-text="$t('driver_reference_#')" class="caption" />
          <client-only>
            <v-chip v-text="driver_details.reference_number" :title="$t('driver_number')" x-small />
            <span />
          </client-only>
        </v-list-item-action>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-container>
        <v-row no-gutters>
          <v-col cols="6">
            <v-list subheader dense class="widget-list">
              <v-subheader v-text="$t('driver_details')" class="overline" />
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-map-marker'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="driver_details.address_1" />
                  <v-list-item-subtitle v-text="driver_details.address_2" />
                  <v-list-item-subtitle v-text="cityStateZip" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="action-icon">
                  <v-btn @click="dialTo(driver_details.phone)" icon>
                    <v-icon v-text="'mdi-phone-outgoing'" />
                  </v-btn>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ driver_details.phone | phone }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('phone')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="action-icon">
                  <v-btn @click="dialTo(driver_details.mobile)" icon>
                    <v-icon v-text="'mdi-cellphone-iphone'" />
                  </v-btn>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ driver_details.mobile | phone }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('mobile')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="action-icon">
                  <v-btn @click="emailTo(driver_details.email)" icon>
                    <v-icon v-text="'mdi-email-send'" />
                  </v-btn>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="driver_details.email" />
                  <v-list-item-subtitle v-text="$t('email')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-account-card-details'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="driver_details.employee_id" />
                  <v-list-item-subtitle v-text="$t('employee_id')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-smart-card'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="driver_details.selector" />
                  <v-list-item-subtitle v-text="$t('selector_level')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <v-list subheader dense class="widget-list">
              <v-subheader v-text="$t('custom_labels')" class="overline" />
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ driver_details.misc_1 || '--' }}</v-list-item-title>
                  <v-list-item-subtitle>{{ custom_labels.driver_use_label_1 || $t('driver_use_label_1') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ driver_details.misc_2 || '--' }}</v-list-item-title>
                  <v-list-item-subtitle>{{ custom_labels.driver_use_label_2 || $t('driver_use_label_2') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ driver_details.misc_3 || '--' }}</v-list-item-title>
                  <v-list-item-subtitle>{{ custom_labels.driver_use_label_3 || $t('driver_use_label_3') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ driver_details.misc_4 || '--' }}</v-list-item-title>
                  <v-list-item-subtitle>{{ custom_labels.driver_use_label_4 || $t('driver_use_label_4') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="pt-0" />
  </v-card>
</template>

<script>
import { dialTo, emailTo } from '@/utility/helpers'
export default {
  computed: {
    custom_labels: vm => vm.$store.getters['account/getCustomLabels'],
    driver_details: vm => vm.$store.getters['vehicle/getDriverDetails'],
    vehicle_number: vm => vm.$store.getters['vehicle/getVehicleNumber'],
    cityStateZip () {
      const city_state = [this.driver_details.city, this.driver_details.state_province].filter(Boolean).join(', ')
      return [city_state, this.driver_details.postal_code].filter(Boolean).join(' ')
    },
    licenseStateNumber () {
      return [this.driver_details.license_number, this.driver_details.license_state_province].filter(Boolean).join(' ')
    },
    driverName () {
      return [this.driver_details.first_name, this.driver_details.last_name].filter(Boolean).join(' ')
    },
    editDriverRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/edit-driver` })
  },
  methods: {
    dialTo,
    emailTo,
    goToEditDriver () {
      this.$router.push(this.editDriverRoute)
    }
  }
}
</script>
<style>
.action-icon {
  justify-content: center;
  align-items: center;
  max-width:24px;
}
</style>
