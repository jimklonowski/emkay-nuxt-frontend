<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn :to="vehicleRoute" exact nuxt text>
          <v-icon v-text="'mdi-chevron-left'" class="mr-2" />
          {{ $t('to_vehicle_dashboard') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loading" outlined tile>
          <v-expansion-panels v-model="panel" value="0" accordion hover tile>
            <v-expansion-panel tile>
              <v-expansion-panel-header>
                {{ $t('vehicle_history') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container>
                  <v-row>
                    <v-subheader>These vehicle are currently assigned to this driver</v-subheader>
                    <v-col cols="12">
                      <v-simple-table>
                        <template #default>
                          <thead>
                            <tr>
                              <th>Vehicle</th>
                              <th>Year</th>
                              <th>Model</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>269967</td>
                              <td>2012</td>
                              <td>EXPLORER LTD</td>
                              <td>CLOSE OUT</td>
                            </tr>
                            <tr>
                              <td>442545</td>
                              <td>2014</td>
                              <td>DURANGO CITADEL</td>
                              <td>CLOSE OUT</td>
                            </tr>
                            <tr>
                              <td>E66429</td>
                              <td>2020</td>
                              <td>DURANGO GT AWD</td>
                              <td>ON BILLING</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <ValidationObserver ref="driverForm" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(submitEditDriver)">
              <v-card-title class="display-1">
                {{ $t('edit_driver') }}
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row justify="center">
                    <v-col cols="12" md="6">
                      <v-subheader v-text="$t('driver_details')" />
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <ValidationProvider v-slot="{ errors }" :name="$t('employee_id')" rules="max:9">
                              <v-text-field
                                v-model="employee_id"
                                :label="$t('employee_id')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_first_name')">
                              <v-text-field
                                v-model="driver_first_name"
                                :label="$t('driver_first_name')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_last_name')">
                              <v-text-field
                                v-model="driver_last_name"
                                :label="$t('driver_last_name')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_address_1')" rules="max:30">
                              <v-text-field
                                v-model="driver_address_1"
                                :label="$t('driver_address_1')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_address_2')" rules="max:30">
                              <v-text-field
                                v-model="driver_address_2"
                                :label="$t('driver_address_2')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_city')">
                              <v-text-field
                                v-model="driver_city"
                                :label="$t('driver_city')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_state_province')">
                              <v-text-field
                                v-model="driver_state_province"
                                :label="$t('driver_state_province')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_postal_code')" rules="max:10">
                              <v-text-field
                                v-model="driver_postal_code"
                                :label="$t('driver_postal_code')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_county')">
                              <v-text-field
                                v-model="driver_county"
                                :label="$t('driver_county')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_phone')" rules="numeric|max:10">
                              <v-text-field
                                v-model="driver_phone"
                                :label="$t('driver_phone')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_mobile')" rules="numeric|max:10">
                              <v-text-field
                                v-model="driver_mobile"
                                :label="$t('driver_mobile')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('email')" rules="max:60|email">
                              <v-text-field
                                v-model="driver_email"
                                :label="$t('email')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-subheader v-text="$t('client_use_fields')" />
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_1')" rules="max:40">
                              <v-text-field
                                v-model="driver_misc_1"
                                :label="custom_labels.driver_use_label_1 || $t('driver_use_label_1')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_2')" rules="max:40">
                              <v-text-field
                                v-model="driver_misc_2"
                                :label="custom_labels.driver_use_label_2 || $t('driver_use_label_2')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_3')" rules="max:40">
                              <v-text-field
                                v-model="driver_misc_3"
                                :label="custom_labels.driver_use_label_3 || $t('driver_use_label_3')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_4')" rules="max:40">
                              <v-text-field
                                v-model="driver_misc_4"
                                :label="custom_labels.driver_use_label_4 || $t('driver_use_label_4')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="init" text>
                  {{ $t('reset') }}
                </v-btn>
                <v-btn :loading="loading" type="submit" color="primary">
                  {{ $t('submit') }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { SnotifyPosition } from 'vue-snotify'
import { vehicleRoute } from '@/mixins/routing'

export default {
  name: 'edit-driver',
  mixins: [vehicleRoute],
  head () {
    const title = this.$t('edit_driver')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  data: () => ({
    loading: false,
    panel: 0,
    // Model
    employee_id: null,
    driver_first_name: null,
    driver_last_name: null,
    driver_address_1: null,
    driver_address_2: null,
    driver_city: null,
    driver_state_province: null,
    driver_postal_code: null,
    driver_county: null,
    driver_phone: null,
    driver_mobile: null,
    driver_email: null,
    driver_misc_1: null,
    driver_misc_2: null,
    driver_misc_3: null,
    driver_misc_4: null
  }),
  computed: {
    ...mapGetters({
      custom_labels: 'account/getCustomLabels',
      driver_details: 'vehicle/getDriverDetails',
      hasDriver: 'vehicle/hasDriver',
      hasVehicle: 'vehicle/hasVehicle',
      vehicle_details: 'vehicle/getVehicleDetails',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    model () {
      return {
        employee_id: this.employee_id,
        driver_first_name: this.driver_first_name,
        driver_last_name: this.driver_last_name,
        driver_address_1: this.driver_address_1,
        driver_address_2: this.driver_address_2,
        driver_city: this.driver_city,
        driver_state_province: this.driver_state_province,
        driver_postal_code: this.driver_postal_code,
        driver_county: this.driver_county,
        driver_phone: this.driver_phone,
        driver_mobile: this.driver_mobile,
        driver_email: this.driver_email,
        driver_misc_1: this.driver_misc_1,
        driver_misc_2: this.driver_misc_2,
        driver_misc_3: this.driver_misc_3,
        driver_misc_4: this.driver_misc_4
      }
    }
  },
  mounted () {
    // reset form and load model
    this.init()
  },
  methods: {
    init () {
      // clear inputs
      this.employee_id = null
      this.driver_first_name = null
      this.driver_last_name = null
      this.driver_address_1 = null
      this.driver_address_2 = null
      this.driver_city = null
      this.driver_state_province = null
      this.driver_postal_code = null
      this.driver_county = null
      this.driver_phone = null
      this.driver_mobile = null
      this.driver_email = null
      this.driver_misc_1 = null
      this.driver_misc_2 = null
      this.driver_misc_3 = null
      this.driver_misc_4 = null
      // load driver from vuex
      if (this.hasDriver) {
        this.loadCurrentDriver()
      }
      this.reset()
    },
    loadCurrentDriver () {
      this.employee_id = this.driver_details.employee_id
      this.driver_first_name = this.driver_details.first_name
      this.driver_last_name = this.driver_details.last_name
      this.driver_address_1 = this.driver_details.address_1
      this.driver_address_2 = this.driver_details.address_2
      this.driver_city = this.driver_details.city
      this.driver_state_province = this.driver_details.state_province
      this.driver_postal_code = this.driver_details.postal_code
      this.driver_county = this.driver_details.county
      this.driver_phone = this.driver_details.phone
      this.driver_mobile = this.driver_details.mobile
      this.driver_email = this.driver_details.email
      this.driver_misc_1 = this.driver_details.misc_1
      this.driver_misc_2 = this.driver_details.misc_2
      this.driver_misc_3 = this.driver_details.misc_3
      this.driver_misc_4 = this.driver_details.misc_4
    },
    reset () {
      this.$refs.driverForm.reset()
    },
    async submitEditDriver () {
      this.loading = true
      try {
        await this.$axios.post('/driver/edit', this.model)
      } catch (error) {
        console.error(error)
        this.$snotify.error(error.message, this.$i18n.t('error'), { position: SnotifyPosition.centerTop })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
