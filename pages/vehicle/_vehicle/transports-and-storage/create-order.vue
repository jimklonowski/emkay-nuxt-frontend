<template>
  <v-card tile>
    <v-stepper v-model="currentStep" class="elevation-0" tile>
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" :step="1">
          {{ $t('requestor_information') }}
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="currentStep > 2" :step="2" :color="type === 'transport_out_of_storage' ? 'grey' : 'primary'">
          {{ $t('pickup_information') }}
          <small v-show="type === 'transport_out_of_storage'">Skipped if transporting out of storage</small>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="currentStep > 3" :step="3">
          {{ $t('assign_driver_on_delivery') }}
          <small v-if="type === 'store_this_vehicle'">Skipped if storing this vehicle</small>
          <small v-else>Optional</small>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="currentStep > 4" :step="4">
          {{ $t('delivery_information') }}
          <small v-show="type === 'store_this_vehicle'">Skipped if storing this vehicle</small>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="currentStep > 5" :step="5">
          {{ $t('additional_services') }}
        </v-stepper-step>
      </v-stepper-header>
      <v-divider />
      <v-expansion-panels accordion multiple>
        <v-expansion-panel v-show="hasVehicle">
          <v-expansion-panel-header>Vehicle</v-expansion-panel-header>
          <v-expansion-panel-content>{{ vehicle_info }}</v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-show="hasQuote">
          <v-expansion-panel-header>Quote</v-expansion-panel-header>
          <v-expansion-panel-content>{{ quote }}</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-stepper-items>
        <v-stepper-content :complete="currentStep > 1" step="1">
          <ValidationObserver ref="step1" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(nextStep)">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('type')" vid="type" rules="required">
                          <v-radio-group
                            v-model="type"
                            :label="$t('type')"
                            :error-messages="errors"
                            :success="valid"
                          >
                            <v-radio :label="$t('transport_this_vehicle')" value="transport_this_vehicle" />
                            <v-radio :label="$t('store_this_vehicle')" value="store_this_vehicle" />
                            <v-radio :label="$t('transport_out_of_storage')" value="transport_out_of_storage" />
                          </v-radio-group>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('transport_method')" vid="transport_method" rules="required">
                          <v-radio-group
                            v-model="transport_method"
                            :label="$t('transport_method')"
                            :error-messages="errors"
                            :success="valid"
                          >
                            <v-radio :label="$t('driven')" value="driven" />
                            <v-radio :label="$t('trucked')" value="trucked" />
                          </v-radio-group>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-row>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('contact_name')" vid="contact_name" rules="required">
                          <v-text-field
                            v-model="requestor_contact_name"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('contact_name')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="8">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('phone')" vid="phone" rules="required">
                          <v-text-field
                            v-model="requestor_phone"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('phone')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider v-slot="{ errors }" :name="$t('extension')" vid="extension">
                          <v-text-field
                            v-model="requestor_phone_ext"
                            :error-messages="errors"
                            :label="$t('extension')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('email')" vid="email" rules="required">
                          <v-text-field
                            v-model="requestor_email"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('email')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-spacer />
                  <v-btn v-if="currentStep < 5" type="submit" color="primary">
                    {{ $t('next') }}
                  </v-btn>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
        </v-stepper-content>
        <v-stepper-content :complete="currentStep > 2" step="2">
          <ValidationObserver ref="step2" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(nextStep)">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-row>
                      <v-col cols="12">
                        <v-dialog
                          ref="pickup_modal"
                          v-model="pickup_modal"
                          :return-value.sync="pickup_date"
                          persistent
                          width="290px"
                        >
                          <template #activator="{ on }">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('pickup_date')" vid="pickup_date" rules="required|not_past">
                              <v-text-field
                                v-model="pickup_date"
                                v-on="on"
                                :prepend-inner-icon="'mdi-calendar'"
                                :error-messages="errors"
                                :success="valid"
                                :label="$t('pickup_date')"
                                outlined
                              />
                            </ValidationProvider>
                          </template>
                          <v-date-picker v-model="pickup_date" scrollable>
                            <v-spacer />
                            <v-btn @click="pickup_modal = false" v-text="$t('cancel')" text />
                            <v-btn @click="$refs.pickup_modal.save(pickup_date)" v-text="$t('ok')" />
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                      <v-col cols="12" md="6">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('address_type')" vid="address_type" rules="required">
                          <v-select
                            v-model="pickup_address_type"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('address_type')"
                            :items="addressTypes"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('address_1')" vid="address_1" rules="required">
                          <v-text-field v-model="pickup_address_1" :error-messages="errors" :success="valid" :label="$t('address_1')" outlined />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors }" :name="$t('address_2')" vid="address_2">
                          <v-text-field v-model="pickup_address_2" :error-messages="errors" :label="$t('address_2')" outlined />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('city')" vid="city" rules="required">
                          <v-text-field v-model="pickup_city" :error-messages="errors" :success="valid" :label="$t('city')" outlined />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="6">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('state_province')" vid="state_province" rules="required">
                          <v-text-field v-model="pickup_state_province" :error-messages="errors" :success="valid" :label="$t('state_province')" outlined />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="6">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('postal_code')" vid="postal_code" rules="required">
                          <v-text-field v-model="pickup_postal_code" :error-messages="errors" :success="valid" :label="$t('postal_code')" outlined />
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-row>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('contact_name')" vid="contact_name" rules="required">
                          <v-text-field v-model="pickup_contact_name" :error-messages="errors" :success="valid" :label="$t('contact_name')" outlined />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('phone_type')" vid="phone_type" rules="required">
                          <v-select
                            v-model="pickup_phone_type"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('phone_type')"
                            :items="phoneTypes"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="8">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('phone')" vid="phone" rules="required">
                          <v-text-field v-model="pickup_phone" :error-messages="errors" :success="valid" :label="$t('phone')" outlined />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider v-slot="{ errors }" :name="$t('extension')" vid="extension">
                          <v-text-field v-model="pickup_phone_ext" :error-messages="errors" :label="$t('extension')" outlined />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('email')" vid="email" rules="required">
                          <v-text-field v-model="pickup_email" :error-messages="errors" :success="valid" :label="$t('email')" outlined />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors }" :name="$t('employee_terminated')" vid="employee_terminated">
                          <v-checkbox v-model="employee_terminated" :error-messages="errors" :label="$t('employee_terminated')" />
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-spacer />
                  <v-btn @click.prevent="prevStep" text>
                    {{ $t('back') }}
                  </v-btn>
                  <v-btn type="submit" color="primary">
                    {{ $t('next') }}
                  </v-btn>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
        </v-stepper-content>
        <v-stepper-content :complete="currentStep > 3" step="3">
          <ValidationObserver ref="step5" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(nextStep)">
              <v-banner>
                Upon completion of this transport order, the EMKAY system will be updated to show the selected driver and contact information as assigned to this vehicle.
                <template #actions>
                  <v-btn @click.prevent="$snotify.error('todo')" text color="primary">
                    Select Driver
                  </v-btn>
                </template>
              </v-banner>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-subheader v-text="'Assigned To:'" />
                    <v-row v-text="assigned_driver_name" />
                    <v-row v-text="assigned_driver_address_1" />
                    <v-row v-if="assigned_driver_address_2" v-text="assigned_driver_address_2" />
                    <v-row v-text="assignedDriverCityStateZip" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <ValidationProvider v-slot="{ errors }" :name="$t('use_as_delivery_address')" vid="use_as_delivery_address">
                      <v-checkbox
                        v-model="use_as_delivery_address"
                        @change="setDeliveryAddress"
                        :error-messages="errors"
                        :label="$t('use_as_delivery_address')"
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-spacer />
                  <v-btn @click.prevent="prevStep" text>
                    {{ $t('back') }}
                  </v-btn>
                  <v-btn type="submit" color="primary">
                    {{ $t('next') }}
                  </v-btn>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
        </v-stepper-content>
        <v-stepper-content :complete="currentStep > 4" step="4">
          <ValidationObserver ref="step4" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(nextStep)">
              <!-- use a hidden field to pass forward the pickupdate, and allow cross-step validation of dates in different forms/observers -->
              <ValidationProvider :name="$t('pickup_date')" vid="pickup_date">
                <input :value="pickup_date" type="hidden">
              </ValidationProvider>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-row>
                      <v-col cols="12">
                        <v-dialog
                          ref="delivery_modal"
                          v-model="delivery_modal"
                          :return-value.sync="delivery_date"
                          persistent
                          width="290px"
                        >
                          <template #activator="{ on }">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('delivery_date')" vid="delivery_date" rules="required|not_past|on_or_after:@pickup_date">
                              <v-text-field
                                v-model="delivery_date"
                                v-on="on"
                                :prepend-inner-icon="'mdi-calendar'"
                                :error-messages="errors"
                                :success="valid"
                                :label="$t('delivery_date')"
                                outlined
                              />
                            </ValidationProvider>
                          </template>
                          <v-date-picker v-model="delivery_date" scrollable>
                            <v-spacer />
                            <v-btn @click="delivery_modal = false" v-text="$t('cancel')" text />
                            <v-btn @click="$refs.delivery_modal.save(delivery_date)" v-text="$t('ok')" />
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('address_type')" vid="address_type" rules="required">
                          <v-select
                            v-model="delivery_address_type"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('address_type')"
                            :items="addressTypes"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('address_1')" vid="address_1" rules="required">
                          <v-text-field
                            v-model="delivery_address_1"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('address_1')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors }" :name="$t('address_2')" vid="address_2">
                          <v-text-field
                            v-model="delivery_address_2"
                            :error-messages="errors"
                            :label="$t('address_2')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('city')" vid="city" rules="required">
                          <v-text-field
                            v-model="delivery_city"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('city')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="6">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('state_province')" vid="state_province" rules="required">
                          <v-text-field
                            v-model="delivery_state_province"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('state_province')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="6">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('postal_code')" vid="postal_code" rules="required">
                          <v-text-field
                            v-model="delivery_postal_code"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('postal_code')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-row>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('contact_name')" vid="contact_name" rules="required">
                          <v-text-field
                            v-model="delivery_contact_name"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('contact_name')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('phone_type')" vid="phone_type" rules="required">
                          <v-select
                            v-model="delivery_phone_type"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('phone_type')"
                            :items="phoneTypes"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="8">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('phone')" vid="phone" rules="required">
                          <v-text-field
                            v-model="delivery_phone"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('phone')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider v-slot="{ errors }" :name="$t('extension')" vid="extension">
                          <v-text-field
                            v-model="delivery_phone_ext"
                            :error-messages="errors"
                            :label="$t('extension')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('email')" vid="email" rules="required">
                          <v-text-field
                            v-model="delivery_email"
                            :error-messages="errors"
                            :success="valid"
                            :label="$t('email')"
                            outlined
                          />
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-spacer />
                  <v-btn @click.prevent="prevStep" text>
                    {{ $t('back') }}
                  </v-btn>
                  <v-btn type="submit" color="primary">
                    {{ $t('next') }}
                  </v-btn>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
        </v-stepper-content>
        <v-stepper-content :complete="currentStep > 5" step="5">
          <ValidationObserver ref="step5" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(submitOrder)">
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <ValidationProvider v-slot="{ errors }" :name="$t('approve_auto_detail')" vid="approve_auto_detail">
                      <v-checkbox
                        v-model="approve_auto_detail"
                        :error-messages="errors"
                        :label="$t('approve_auto_detail')"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" md="6">
                    <ValidationProvider v-slot="{ errors }" :name="$t('approve_oil_change')" vid="approve_oil_change">
                      <v-checkbox
                        v-model="approve_oil_change"
                        :error-messages="errors"
                        :label="$t('approve_oil_change')"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" md="6">
                    <ValidationProvider v-slot="{ errors }" :name="$t('other_services')" vid="other_services">
                      <v-textarea
                        v-model="other_services"
                        :error-messages="errors"
                        :label="$t('other_services')"
                        outlined
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" md="6">
                    <ValidationProvider v-slot="{ errors }" :name="$t('special_instructions')" vid="special_instructions">
                      <v-textarea
                        v-model="special_instructions"
                        :error-messages="errors"
                        :label="$t('special_instructions')"
                        outlined
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-spacer />
                  <v-btn @click.prevent="prevStep" text>
                    {{ $t('back') }}
                  </v-btn>
                  <v-btn @click="$snotify.info('todo')" type="submit" color="primary">
                    {{ $t('submit') }}
                  </v-btn>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
export default {
  name: 'CreateOrder',
  data () {
    return {
      currentStep: 1,
      pickup_modal: false,
      delivery_modal: false
    }
  },
  computed: {
    // quote: vm => vm.$store.getters['transtor/getQuote'],
    hasQuote: vm => vm.$store.getters['transtor/hasQuote'],
    hasVehicle: vm => Object.keys(vm.vehicle_info).length !== 0,
    vehicle_info: vm => vm.$store.getters['vehicle/getVehicleInfo'],
    addressTypes () {
      return [
        { text: this.$i18n.t('residential'), value: 'Residential' },
        { text: this.$i18n.t('business'), value: 'Business' }
      ]
    },
    phoneTypes () {
      return [
        { text: this.$i18n.t('home'), value: 'Home' },
        { text: this.$i18n.t('cell'), value: 'Cell' },
        { text: this.$i18n.t('office'), value: 'Office' }
      ]
    },
    assignedDriverCityStateZip () {
      const city_state = [this.assigned_driver_city, this.assigned_driver_state_province].filter(Boolean).join(', ')
      return [city_state, this.assigned_driver_postal_code].filter(Boolean).join(' ')
    }
  },
  asyncData ({ store, query }) {
    const debug = true
    let quote, transport_method, type
    let requestor_contact_name, requestor_phone, requestor_phone_ext, requestor_email
    let pickup_date, pickup_address_type, pickup_address_1, pickup_address_2, pickup_city, pickup_state_province, pickup_postal_code, pickup_phone_type, pickup_phone, pickup_phone_ext, pickup_email, pickup_contact_name, employee_terminated
    let delivery_date, delivery_address_type, delivery_address_1, delivery_address_2, delivery_city, delivery_state_province, delivery_postal_code, delivery_phone_type, delivery_phone, delivery_phone_ext, delivery_email, delivery_contact_name
    let assigned_driver_name, assigned_driver_address_1, assigned_driver_address_2, assigned_driver_city, assigned_driver_state_province, assigned_driver_postal_code, use_as_delivery_address
    let approve_auto_detail, approve_oil_change, other_services, special_instructions

    // populate requestor information (step 1) from current driver (?)
    const driver_info = store.getters['vehicle/getDriverInfo']
    if (driver_info) {
      requestor_contact_name = driver_info.last_name
      requestor_phone = driver_info.phone
      requestor_phone_ext = driver_info.phone_ext
      requestor_email = driver_info.email
    }

    // if quote flag is true and quote exists in vuex, populate what fields we can from it
    if (query.quote) {
      quote = store.getters['transtor/getQuote']
      if (quote) {
        transport_method = quote.transport_method
        pickup_city = quote.origin_city
        pickup_postal_code = quote.origin_postal_code
        pickup_state_province = quote.origin_state_province
        delivery_city = quote.destination_city
        delivery_postal_code = quote.destination_postal_code
        delivery_state_province = quote.destination_state_province
      }
    }

    if (debug) {
      assigned_driver_name = 'jimmy klonowski'
      assigned_driver_address_1 = '805 w thorndale ave'
      assigned_driver_city = 'itasca'
      assigned_driver_state_province = 'IL'
      assigned_driver_postal_code = '60143'
    }

    return {
      quote,
      transport_method,
      type,
      requestor_contact_name,
      requestor_phone,
      requestor_phone_ext,
      requestor_email,
      pickup_date,
      pickup_address_type,
      pickup_address_1,
      pickup_address_2,
      pickup_city,
      pickup_state_province,
      pickup_postal_code,
      pickup_phone_type,
      pickup_phone,
      pickup_phone_ext,
      pickup_email,
      pickup_contact_name,
      employee_terminated,
      assigned_driver_name,
      assigned_driver_address_1,
      assigned_driver_address_2,
      assigned_driver_city,
      assigned_driver_state_province,
      assigned_driver_postal_code,
      use_as_delivery_address,
      delivery_date,
      delivery_address_type,
      delivery_address_1,
      delivery_address_2,
      delivery_city,
      delivery_state_province,
      delivery_postal_code,
      delivery_phone_type,
      delivery_phone,
      delivery_phone_ext,
      delivery_email,
      delivery_contact_name,
      approve_auto_detail,
      approve_oil_change,
      other_services,
      special_instructions
    }
  },
  methods: {
    nextStep () {
      this.currentStep++
      // skip the pickup info step if transporting from storage
      if (this.currentStep === 2 && this.type === 'transport_out_of_storage') {
        this.currentStep++
      }
      // skip the assign new driver step AND delivery info step if storing this vehicle
      if (this.currentStep === 3 && this.type === 'store_this_vehicle') {
        this.currentStep += 2
      }
    },
    prevStep () {
      this.currentStep--
      // skip
      if (this.currentStep === 2 && this.type === 'transport_out_of_storage') {
        this.currentStep--
      }
      // skip
      if (this.currentStep === 4 && this.type === 'store_this_vehicle') {
        this.currentStep -= 2
      }
    },
    setDeliveryAddress (shouldSet) {
      if (shouldSet) {
        this.delivery_contact_name = this.assigned_driver_name
        this.delivery_address_1 = this.assigned_driver_address_1
        this.delivery_address_2 = this.assigned_driver_address_2
        this.delivery_city = this.assigned_driver_city
        this.delivery_state_province = this.assigned_driver_state_province
        this.delivery_postal_code = this.assigned_driver_postal_code
      } else {
        this.delivery_contact_name = ''
        this.delivery_address_1 = ''
        this.delivery_address_2 = ''
        this.delivery_city = ''
        this.delivery_state_province = ''
        this.delivery_postal_code = ''
      }
    }
  }
}
</script>
