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
        <v-card :loading="loading" outlined>
          <ValidationObserver ref="driverForm" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(submitDriverEdit)">
              <v-card-title>
                {{ $t('edit_driver') }}
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-row>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('employee_id')" rules="required">
                            <v-text-field
                              v-model="model.employee_id"
                              :label="$t('employee_id')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_first_name')" rules="required">
                            <v-text-field
                              v-model="model.driver_first_name"
                              :label="$t('driver_first_name')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_last_name')" rules="required">
                            <v-text-field
                              v-model="model.driver_last_name"
                              :label="$t('driver_last_name')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_address_1')" rules="required">
                            <v-text-field
                              v-model="model.driver_address_1"
                              :label="$t('driver_address_1')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_address_2')">
                            <v-text-field
                              v-model="model.driver_address_2"
                              :label="$t('driver_address_2')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_city')" rules="required">
                            <v-text-field
                              v-model="model.driver_city"
                              :label="$t('driver_city')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_state_province')" rules="required">
                            <v-text-field
                              v-model="model.driver_state_province"
                              :label="$t('driver_state_province')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_postal_code')" rules="required">
                            <v-text-field
                              v-model="model.driver_postal_code"
                              :label="$t('driver_postal_code')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_county')" rules="required">
                            <v-text-field
                              v-model="model.driver_county"
                              :label="$t('driver_county')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_phone')" rules="required">
                            <v-text-field
                              v-model="model.driver_phone"
                              :label="$t('driver_phone')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_mobile')" rules="required">
                            <v-text-field
                              v-model="model.driver_mobile"
                              :label="$t('driver_mobile')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_email')" rules="required">
                            <v-text-field
                              v-model="model.driver_email"
                              :label="$t('email')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-row>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_misc_1')">
                            <v-text-field
                              v-model="model.driver_misc_1"
                              :label="driver_labels.driver_misc_1_label"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_misc_2')">
                            <v-text-field
                              v-model="model.driver_misc_2"
                              :label="driver_labels.driver_misc_2_label"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_misc_3')">
                            <v-text-field
                              v-model="model.driver_misc_3"
                              :label="driver_labels.driver_misc_3_label"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_misc_4')">
                            <v-text-field
                              v-model="model.driver_misc_4"
                              :label="driver_labels.driver_misc_4_label"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                      </v-row>
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
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
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
  computed: {
    driver_labels: vm => vm.$store.getters['account/getDriverMiscLabels'],
    vehicleNumber: vm => vm.$store.getters['vehicle/getVehicleNumber']
  },
  async asyncData ({ store }) {
    let loading
    // create an object to store the form model
    const model = {
      employee_id: '',
      driver_first_name: '',
      driver_last_name: '',
      driver_address_1: '',
      driver_address_2: '',
      driver_city: '',
      driver_state_province: '',
      driver_postal_code: '',
      driver_county: '',
      driver_phone: '',
      driver_mobile: '',
      driver_email: '',
      driver_misc_1: '',
      driver_misc_2: '',
      driver_misc_3: '',
      driver_misc_4: ''
    }
    // get the driver info from current vehicle vuex
    const driver_info = await store.getters['vehicle/getDriverInfo']
    if (driver_info) {
      model.employee_id = driver_info.employee_id
      model.driver_first_name = driver_info.first_name
      model.driver_last_name = driver_info.last_name
      model.driver_address_1 = driver_info.address_1
      model.driver_address_2 = driver_info.address_2
      model.driver_city = driver_info.city
      model.driver_state_province = driver_info.state_province
      model.driver_postal_code = driver_info.postal_code
      model.driver_county = driver_info.county
      model.driver_phone = driver_info.phone
      model.driver_mobile = driver_info.mobile
      model.driver_email = driver_info.email
      model.driver_misc_1 = driver_info.misc_1
      model.driver_misc_2 = driver_info.misc_2
      model.driver_misc_3 = driver_info.misc_3
      model.driver_misc_4 = driver_info.misc_4
    }
    return {
      loading,
      model
    }
  },
  methods: {
    async submitDriverEdit () {
      this.loading = true
      try {
        await this.$axios.post(`${process.env.EMKAY_API}/driver/edit`, this.model)
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
