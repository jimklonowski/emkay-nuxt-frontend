<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <vehicle-details-form :vehicle-number="vehicle_number">
          <template #title>
            {{ $t('edit_vehicle') }}
          </template>
          <template #subtitle>
            {{ vehicle_number }}
          </template>
        </vehicle-details-form>
      </v-col>
      <!-- <v-col cols="12">
        <v-card :loading="loading" outlined tile class="form">
          <v-expansion-panels v-model="panel" value="0" accordion hover tile>
            <v-expansion-panel v-show="hasVehicle" tile>
              <v-expansion-panel-header class="text-uppercase" color="primary white--text">
                {{ $t('vehicle_details') }}
                <template #actions>
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container>
                  <v-row class="flex-column-reverse flex-sm-row justify-space-between">
                    <v-col cols="12" sm="8">
                      <vehicle-detail-table />
                    </v-col>
                    <v-col cols="12" sm="4" class="d-flex flex-row justify-sm-start justify-space-around flex-sm-column align-end">
                      <nuxt-link v-text="$t('edit_driver')" :to="editDriverRoute" nuxt class="text-decoration-none" />
                      <nuxt-link v-text="$t('assign_new_driver')" :to="reassignVehicleRoute" nuxt class="text-decoration-none" />
                      <v-dialog
                        v-model="change_plate_dialog"
                        max-width="400px"
                      >
                        <template #activator="{ on }">
                          <a v-on="on" v-text="$t('change_plate')" />
                        </template>
                        <change-plate :vehicle="vehicle_number" />
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <ValidationObserver ref="vehicleForm" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(submitEditVehicle)">
              <v-card-title>
                {{ $t('edit_vehicle') }}
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <v-subheader v-text="$t('vehicle_details')" />
                      <v-container>
                        <v-row dense>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('client_vehicle_number')">
                              <v-text-field
                                v-model="client_vehicle_number"
                                :label="$t('client_vehicle_number')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12">
                            <v-dialog
                              ref="driver_effective_date_modal"
                              v-model="driver_effective_date_modal"
                              :return-value.sync="driver_effective_date"
                              persistent
                              width="290px"
                            >
                              <template #activator="{ on }">
                                <ValidationProvider v-slot="{ errors }" :name="$t('driver_effective_date')" rules="required">
                                  <v-text-field
                                    :value="$moment(driver_effective_date).format('L')"
                                    v-on="on"
                                    :error-messages="errors"
                                    :label="$t('driver_effective_date')"
                                    :prepend-inner-icon="'mdi-calendar'"
                                    clearable
                                    readonly
                                    outlined
                                    dense
                                  />
                                </ValidationProvider>
                              </template>
                              <v-date-picker v-model="driver_effective_date" scrollable>
                                <v-spacer />
                                <v-btn @click="driver_effective_date_modal = false" v-text="$t('cancel')" text />
                                <v-btn @click="$refs.driver_effective_date_modal.save(driver_effective_date)" v-text="$t('ok')" />
                              </v-date-picker>
                            </v-dialog>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('center_code')" rules="required">
                              <v-combobox
                                v-model="center_code"
                                :label="$t('center_code')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('bill_sort')">
                              <v-combobox
                                v-model="bill_sort"
                                :label="$t('bill_sort')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-subheader v-text="$t('client_use_fields')" />
                      <v-container>
                        <v-row dense>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('client_use_1')" rules="max:40">
                              <v-text-field
                                v-model="client_use_1"
                                :error-messages="errors"
                                :label="custom_labels.client_use_label_1 || $t('client_use_label_1')"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('client_use_2')" rules="max:40">
                              <v-text-field
                                v-model="client_use_2"
                                :error-messages="errors"
                                :label="custom_labels.client_use_label_2 || $t('client_use_label_2')"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('client_use_3')" rules="max:40">
                              <v-text-field
                                v-model="client_use_3"
                                :error-messages="errors"
                                :label="custom_labels.client_use_label_3 || $t('client_use_label_3')"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('client_use_4')" rules="max:40">
                              <v-text-field
                                v-model="client_use_4"
                                :error-messages="errors"
                                :label="custom_labels.client_use_label_4 || $t('client_use_label_4')"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('client_use_5')" rules="max:40">
                              <v-text-field
                                v-model="client_use_5"
                                :error-messages="errors"
                                :label="custom_labels.client_use_label_5 || $t('client_use_label_5')"
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
                  {{ $t('save_changes') }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { SnotifyPosition } from 'vue-snotify'
import { vehicleRoute } from '@/mixins/routing'
export default {
  name: 'EditVehicle',
  components: {
    'vehicle-details-form': () => import(/* webpackChunkName: "VehicleDetailsForm" */ `@/components/vehicle-dashboard/forms/VehicleDetailsForm`)
    // 'vehicle-detail-table': () => import(/* webpackChunkName: "VehicleDetailTable" */ `@/components/vehicle-dashboard/VehicleDetailTable`),
    // 'change-plate': () => import(/* webpackChunkName: "ChangePlateForm" */ `@/components/vehicle-dashboard/forms/ChangePlate`)
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
  data: () => ({
    change_plate_dialog: false,
    driver_effective_date_modal: false,
    loading: false,
    panel: 0,
    // Model
    bill_sort: null,
    center_code: null,
    center_name: null,
    client_vehicle_number: null,
    client_use_1: null,
    client_use_2: null,
    client_use_3: null,
    client_use_4: null,
    client_use_5: null,
    driver_effective_date: null
  }),
  computed: {
    ...mapGetters({
      custom_labels: 'account/getCustomLabels',
      driver_details: 'vehicle-dashboard/getDriverDetails',
      hasVehicle: 'vehicle-dashboard/hasVehicle',
      vehicle_details: 'vehicle-dashboard/getVehicleDetails',
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
    }),
    editDriverRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/edit-driver` }),
    reassignVehicleRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/reassign-vehicle` }),
    model () {
      return {
        vehicle_number: this.vehicle_number,
        bill_sort: this.bill_sort,
        center_code: this.center_code,
        center_name: this.center_name,
        client_vehicle_number: this.client_vehicle_number,
        client_use_1: this.client_use_1,
        client_use_2: this.client_use_2,
        client_use_3: this.client_use_3,
        client_use_4: this.client_use_4,
        client_use_5: this.client_use_5,
        driver_effective_date: this.driver_effective_date
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
      this.bill_sort = null
      this.center_code = null
      this.center_name = null
      this.client_vehicle_number = null
      this.client_use_1 = null
      this.client_use_2 = null
      this.client_use_3 = null
      this.client_use_4 = null
      this.client_use_5 = null
      this.driver_effective_date = null
      // load vehicle from vuex
      if (this.hasVehicle) {
        this.loadCurrentVehicle()
      }
      this.reset()
    },
    loadCurrentVehicle () {
      this.bill_sort = this.vehicle_details.bill_sort
      this.center_code = this.vehicle_details.center_code
      this.center_name = this.vehicle_details.center_name
      this.client_vehicle_number = this.vehicle_details.client_vehicle_number
      this.client_use_1 = this.vehicle_details.client_use_1
      this.client_use_2 = this.vehicle_details.client_use_2
      this.client_use_3 = this.vehicle_details.client_use_3
      this.client_use_4 = this.vehicle_details.client_use_4
      this.client_use_5 = this.vehicle_details.client_use_5
      this.driver_effective_date = this.vehicle_details.driver_effective_date
    },
    reset () {
      console.log('reset')
      // this.$refs.vehicleForm.reset()
    },
    async submitEditVehicle () {
      this.loading = true
      try {
        await this.$axios.post('/vehicle/edit', this.model)
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
