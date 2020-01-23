<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="editDriverRoute" link style="height:80px;">
        <v-list-item-avatar>
          <v-icon v-text="'mdi-account-edit'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle class="overline">
            {{ driver.employee_id || '&nbsp;' }}
          </v-list-item-subtitle>
          <v-list-item-title v-text="driverName" />
          <client-only>
            <nuxt-link :to="editDriverRoute" v-text="$t('edit')" class="caption text-decoration-none" />
          </client-only>
        </v-list-item-content>
        <v-list-item-action v-if="driver.reference_number">
          <v-list-item-action-text v-text="$t('driver_reference_#')" class="caption" />
          <client-only>
            <v-chip v-text="driver.reference_number" :title="$t('driver_number')" x-small />
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
                  <v-list-item-title v-text="driver.address_1" />
                  <v-list-item-subtitle v-text="driver.address_2" />
                  <v-list-item-subtitle v-text="cityStateZip" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="action-icon">
                  <v-btn @click="dialTo(driver.phone)" icon>
                    <v-icon v-text="'mdi-phone-outgoing'" />
                  </v-btn>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ driver.phone | phone }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('phone')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="action-icon">
                  <v-btn @click="dialTo(driver.mobile)" icon>
                    <v-icon v-text="'mdi-cellphone-iphone'" />
                  </v-btn>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ driver.mobile | phone }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('mobile')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="action-icon">
                  <v-btn @click="emailTo(driver.email)" icon>
                    <v-icon v-text="'mdi-email-send'" />
                  </v-btn>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="driver.email" />
                  <v-list-item-subtitle v-text="$t('email')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <v-list subheader dense class="widget-list">
              <v-subheader v-text="$t('additional_information')" class="overline" />
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-account-card-details'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="driver.employee_id" />
                  <v-list-item-subtitle v-text="$t('employee_id')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-smart-card'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="driver.selector" />
                  <v-list-item-subtitle v-text="$t('selector_level')" class="font-weight-light" />
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
        :text="!expanded"
        block
        depressed
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
              <v-list subheader dense class="widget-list">
                <v-subheader v-text="$t('custom_labels')" class="overline" />
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ driver.misc_1 || '--' }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="font-weight-light">
                      {{ driverLabels.driver_misc_1_label }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ driver.misc_2 || '--' }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="font-weight-light">
                      {{ driverLabels.driver_misc_2_label }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ driver.misc_3 || '--' }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="font-weight-light">
                      {{ driverLabels.driver_misc_3_label }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-label'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ driver.misc_4 || '&nbsp;' }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="font-weight-light">
                      {{ driverLabels.driver_misc_4_label }}
                    </v-list-item-subtitle>
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
import { dialTo, emailTo } from '@/utility/helpers'
export default {
  data: () => ({
    expanded: false
  }),
  computed: {
    driver: vm => vm.$store.getters['vehicle/getDriverInfo'],
    driverLabels: vm => vm.$store.getters['account/getDriverMiscLabels'],
    cityStateZip () {
      const city_state = [this.driver.city, this.driver.state_province].filter(Boolean).join(', ')
      return [city_state, this.driver.postal_code].filter(Boolean).join(' ')
    },
    licenseStateNumber () {
      return [this.driver.license_number, this.driver.license_state_province].filter(Boolean).join(' ')
    },
    driverName () {
      return [this.driver.first_name, this.driver.last_name].filter(Boolean).join(' ')
    },
    editDriverRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/edit-driver` })
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
