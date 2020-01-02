<template>
  <v-card outlined shaped>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar @click="goToEditDriver" tile size="32" class="d-flex flex-column" style="cursor:pointer;">
          <v-icon>mdi-account-edit</v-icon>
          <p class="ma-0 overline">
            {{ $t('edit') }}
          </p>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="body-1">
            <span class="font-weight-bold">{{ driverName }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              {{ driver.license_number }}
            </p>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              {{ driver.license_state_province }}
            </p>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>{{ $t('driver_#') }}</v-list-item-action-text>
          <v-chip :title="$t('driver_number')" pill outlined x-small>
            {{ driver.reference_number || 'driver_number' }}
          </v-chip>
          <!-- <v-chip pill outlined x-small>
            {{ 'asdf' }}
          </v-chip> -->
        </v-list-item-action>
      </v-list-item>
    </v-card-title>

    <v-divider />

    <v-card-text class="px-0">
      <v-row no-gutters>
        <v-col cols="6">
          <v-list class="text-left" dense>
            <!-- address -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ driver.address_1 }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ driver.address_2 || '' }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="font-weight-light">
                  {{ cityStateZip }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- employee id -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-card-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ driver.employee_id }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('employee_id') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- selector level -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-badge</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ driver.selector }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('selector_level') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="6">
          <v-list class="text-left" dense shaped>
            <v-list-item @click="dialTo(driver.phone)">
              <v-list-item-icon>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ driver.phone }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('phone') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="dialTo(driver.mobile)">
              <v-list-item-icon>
                <v-icon>mdi-cellphone-basic</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ driver.mobile }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('mobile') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="emailTo(driver.email)">
              <v-list-item-icon>
                <v-icon>mdi-email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ driver.email }}
                </v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">
                  {{ $t('email') }}
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
    cityStateZip () {
      const city_state = [this.driver.city, this.driver.state_province].filter(Boolean).join(', ')
      return [city_state, this.driver.postal_code].filter(Boolean).join(' ')
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
