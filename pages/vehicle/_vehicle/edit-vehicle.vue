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
          <v-card-text>
            Vehicle summary goes here
          </v-card-text>
          <v-card-actions class="d-flex justify-space-around">
            <v-btn :to="editDriverRoute">
              {{ $t('edit_driver') }}
            </v-btn>
            <v-btn>
              {{ $t('assign_new_driver') }}
            </v-btn>
            <change-plate :vehicle="vehicleNumber" />
          </v-card-actions>
          <v-divider class="mx-4" />
          <ValidationObserver ref="vehicleForm" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(submitVehicleEdit)">
              <v-card-title>
                {{ $t('edit_vehicle') }}
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-subheader>{{ $t('vehicle_details') }}</v-subheader>
                      <v-row>
                        <v-col cols="12">
                          <v-dialog
                            ref="driver_effective_date_modal"
                            v-model="driver_effective_date_modal"
                            :return-value.sync="model.driver_effective_date"
                            persistent
                            width="290px"
                          >
                            <template #activator="{ on }">
                              <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_effective_date')" rules="required">
                                <v-text-field
                                  v-model="model.driver_effective_date"
                                  v-on="on"
                                  :prepend-inner-icon="'mdi-calendar'"
                                  :error-messages="errors"
                                  :success="valid"
                                  :label="$t('driver_effective_date')"
                                  outlined
                                  dense
                                />
                              </ValidationProvider>
                            </template>
                            <v-date-picker v-model="model.driver_effective_date" scrollable>
                              <v-spacer />
                              <v-btn @click="driver_effective_date_modal = false" v-text="$t('cancel')" text />
                              <v-btn @click="$refs.driver_effective_date_modal.save(model.driver_effective_date)" v-text="$t('ok')" />
                            </v-date-picker>
                          </v-dialog>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('center_code')">
                            <v-select
                              v-model="model.center_code"
                              :label="$t('center_code')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('bill_sort')">
                            <v-select
                              v-model="model.bill_sort"
                              :label="$t('bill_sort')"
                              :error-messages="errors"
                              :success="valid"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('client_vehicle_number')">
                            <v-text-field
                              v-model="model.client_vehicle_number"
                              :label="$t('client_vehicle_number')"
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
                      <v-subheader>{{ $t('client_use_fields') }}</v-subheader>
                      <v-row>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('client_use_1')">
                            <v-text-field
                              v-model="model.client_use_1"
                              :error-messages="errors"
                              :success="valid"
                              :label="custom_labels.client_use_label_1"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('client_use_2')">
                            <v-text-field
                              v-model="model.client_use_2"
                              :error-messages="errors"
                              :success="valid"
                              :label="custom_labels.client_use_label_2"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('client_use_3')">
                            <v-text-field
                              v-model="model.client_use_3"
                              :error-messages="errors"
                              :success="valid"
                              :label="custom_labels.client_use_label_3"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('client_use_4')">
                            <v-text-field
                              v-model="model.client_use_4"
                              :error-messages="errors"
                              :success="valid"
                              :label="custom_labels.client_use_label_4"
                              outlined
                              dense
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <ValidationProvider v-slot="{ errors, valid }" :name="$t('client_use_5')">
                            <v-text-field
                              v-model="model.client_use_5"
                              :error-messages="errors"
                              :success="valid"
                              :label="custom_labels.client_use_label_5"
                              outlined
                              dense
                            />
                          </ValidationProvider>
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
import ChangePlate from '@/components/vehicle/ChangePlate'
export default {
  name: 'edit-vehicle',
  components: {
    ChangePlate
  },
  mixins: [vehicleRoute],
  head () {
    const title = this.$t('edit_vehicle')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  computed: {
    custom_labels: vm => vm.$store.getters['account/getCustomLabels'],
    vehicleNumber: vm => vm.$store.getters['vehicle/getVehicleNumber'],
    editDriverRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/edit-driver` })
  },
  async asyncData ({ store }) {
    let loading, driver_effective_date_modal
    // create an object to store the form model
    const model = {
      bill_sort: '',
      center_code: '',
      center_name: '',
      client_vehicle_number: '',
      client_use_1: '',
      client_use_2: '',
      client_use_3: '',
      client_use_4: '',
      client_use_5: '',
      driver_effective_date: ''
    }
    // get the vehicle info from current vehicle vuex and populate the model
    const vehicle_info = await store.getters['vehicle/getVehicleInfo']
    if (vehicle_info) {
      model.bill_sort = vehicle_info.bill_sort
      model.center_code = vehicle_info.center_code
      model.center_name = vehicle_info.center_name
      model.client_vehicle_number = vehicle_info.client_vehicle_number
      model.client_use_1 = vehicle_info.client_use_1
      model.client_use_2 = vehicle_info.client_use_2
      model.client_use_3 = vehicle_info.client_use_3
      model.client_use_4 = vehicle_info.client_use_4
      model.client_use_5 = vehicle_info.client_use_5
    }

    return {
      loading,
      model,
      driver_effective_date_modal
    }
  },
  methods: {
    async submitVehicleEdit () {
      this.loading = true
      try {
        await this.$axios.post(`${process.env.EMKAY_API}/vehicle/edit`, this.model)
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
