<template>
  <v-card shaped outlined>
    <v-card-title class="pa-0">
      <v-list-item two-line>
        <v-list-item-avatar @click="goToEditDriver" tile size="25" style="cursor:pointer;">
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-icon v-on="on" v-text="'mdi-account-edit'" />
            </template>
            <span v-text="$t('edit')" />
          </v-tooltip>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="driverName" class="font-weight-bold" />
          <v-list-item-subtitle v-text="'todo'" class="caption font-weight-light" />
        </v-list-item-content>
        <v-list-item-action v-if="driver.reference_number">
          <v-list-item-action-text v-text="$t('driver_reference_#')" />
          <client-only>
            <v-chip v-text="driver.reference_number" :title="$t('driver_number')" x-small />
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
              <v-subheader v-text="$t('driver_details')" class="overline" />
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-map-marker'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="driver.address_1" />
                  <v-list-item-subtitle v-text="driver.address_2" class="font-weight-light" />
                  <v-list-item-subtitle v-text="cityStateZip" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon @click="dialTo(driver.phone)" style="cursor:pointer;">
                  <v-icon v-text="'mdi-phone-outgoing'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ driver.phone | phone }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('phone')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon @click="dialTo(driver.mobile)" style="cursor:pointer;">
                  <v-icon v-text="'mdi-cellphone-iphone'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ driver.mobile | phone }}</v-list-item-title>
                  <v-list-item-subtitle v-text="$t('mobile')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon @click="emailTo(driver.email)" style="cursor:pointer;">
                  <v-icon v-text="'mdi-email-send'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="driver.email" />
                  <v-list-item-subtitle v-text="$t('email')" class="font-weight-light" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <v-list subheader dense>
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
          <v-col cols="6">
            <v-list subheader dense>
              <v-subheader v-text="$t('custom_labels')" class="overline" />
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ driver.misc_1 || '&nbsp;' }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="font-weight-light">
                    {{ driver_labels.driver_misc_1_label }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ driver.misc_2 || '&nbsp;' }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="font-weight-light">
                    {{ driver_labels.driver_misc_2_label }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-label'" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ driver.misc_3 || '&nbsp;' }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="font-weight-light">
                    {{ driver_labels.driver_misc_3_label }}
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
                    {{ driver_labels.driver_misc_4_label }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
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
  <!-- </v-col> -->
</template>

<script>
import { dialTo, emailTo } from '@/utility/helpers'
export default {
  props: {
    driver: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({

  }),
  computed: {
    driver_labels: vm => vm.$store.getters['account/getDriverMiscLabels'],
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

</style>
