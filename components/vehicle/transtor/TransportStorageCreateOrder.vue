<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <v-stepper-step :complete="currentStep > 1" :step="1">
        {{ $t('authorization') }}
      </v-stepper-step>
      <v-stepper-step :complete="currentStep > 2" :step="2">
        {{ $t('pickup_information') }}
      </v-stepper-step>
      <v-stepper-step :complete="currentStep > 3" :step="3">
        {{ $t('delivery_information') }}
      </v-stepper-step>
      <v-stepper-step :complete="currentStep > 4" :step="4">
        {{ $t('additional_services') }}
      </v-stepper-step>
    </v-stepper-header>
    <v-divider />
    <v-stepper-items>
      <v-stepper-content :complete="currentStep > 1" step="1">
        <ValidationObserver ref="step1" v-slot="{ handleSubmit }">
          <v-form ref="formStep1" @submit.prevent="handleSubmit(nextStep)">
            <v-container>
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
                <v-col cols="12" sm="6">
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
              <v-row>
                <v-spacer />
                <v-btn @click.stop="resetForm" text>
                  Reset
                </v-btn>
                <v-btn v-if="currentStep < 4" type="submit" color="primary">
                  {{ $t('next') }}
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content :complete="currentStep > 2" step="2">
        <ValidationObserver ref="step2" v-slot="{ handleSubmit }">
          <v-form ref="formStep2" @submit.prevent="handleSubmit(nextStep)">
            <v-container>
              <v-row v-if="isTransportOrStorage">
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
              <v-row v-else>
                <v-col cols="12">
                  No pickup information needed
                </v-col>
              </v-row>
              <v-row>
                <v-spacer />
                <v-btn v-if="currentStep > 1" @click.prevent="prevStep" text>
                  {{ $t('back') }}
                </v-btn>
                <v-btn v-if="currentStep < 4" type="submit" color="primary">
                  {{ $t('next') }}
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content :complete="currentStep > 3" step="3">
        <ValidationObserver ref="step3" v-slot="{ handleSubmit }">
          <v-form ref="formStep3" @submit.prevent="handleSubmit(nextStep)">
            <!-- use a hidden field to pass forward the pickupdate, and allow cross-step validation of dates in different forms/observers -->
            <ValidationProvider :name="$t('pickup_date')" vid="pickup_date">
              <input :value="pickup_date" type="hidden">
            </ValidationProvider>
            <v-container>
              <v-row v-if="isStorage">
                <v-col cols="12">
                  No delivery information needed
                </v-col>
              </v-row>
              <v-row v-else>
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
                <v-btn v-if="currentStep > 1" @click.prevent="prevStep" text>
                  {{ $t('back') }}
                </v-btn>
                <v-btn v-if="currentStep < 4" type="submit" color="primary">
                  {{ $t('next') }}
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content :complete="currentStep > 4" step="4">
        <ValidationObserver ref="step4" v-slot="{ handleSubmit }">
          <v-form ref="formStep4" @submit.prevent="handleSubmit(submitOrder)">
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
                <v-btn v-if="currentStep > 1" @click.prevent="prevStep" text>
                  {{ $t('back') }}
                </v-btn>
                <v-btn v-if="currentStep === 4" type="submit" color="primary">
                  {{ $t('submit') }}
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  data () {
    return {
      currentStep: 1,

      // model
      // step 1
      type: null,
      transport_method: null,
      pickup_date: null,
      pickup_modal: false,
      delivery_date: null,
      delivery_modal: false,
      // step 2
      pickup_contact_name: '',
      pickup_address_type: null,
      pickup_phone_type: null,
      pickup_address_1: '',
      pickup_address_2: '',
      pickup_city: '',
      pickup_state_province: '',
      pickup_postal_code: '',
      pickup_phone: '',
      pickup_phone_ext: '',
      pickup_email: '',
      employee_terminated: false,
      // step 3
      delivery_contact_name: '',
      delivery_address_type: null,
      delivery_phone_type: null,
      delivery_address_1: '',
      delivery_address_2: '',
      delivery_city: '',
      delivery_state_province: '',
      delivery_postal_code: '',
      delivery_phone: '',
      delivery_phone_ext: '',
      delivery_email: '',
      // step 4
      approve_auto_detail: false,
      approve_oil_change: false,
      other_services: '',
      special_instructions: ''
    }
  },
  computed: {
    quote: vm => vm.$store.getters['transtor/getQuote'],
    driver_info: vm => vm.$store.getters['vehicle/getDriverInfo'],
    isTransportOrStorage () {
      return this.type !== 'transport_out_of_storage'
    },
    isStorage () {
      return this.type === 'store_this_vehicle'
    },
    addressTypes () {
      return [
        {
          text: this.$i18n.t('residential'),
          value: 'Residential'
        },
        {
          text: this.$i18n.t('business'),
          value: 'Business'
        }
      ]
    },
    phoneTypes () {
      return [
        {
          text: this.$i18n.t('home'),
          value: 'Home'
        },
        {
          text: this.$i18n.t('cell'),
          value: 'Cell'
        },
        {
          text: this.$i18n.t('office'),
          value: 'Office'
        }
      ]
    }
  },
  methods: {
    // if we are pre-filling some fields from a quote, set them here
    init () {
      console.log('init')
      // clear previous values and validation errors
      this.resetForm()
      if (this.quote) {
        this.type = this.quote.type
        this.transport_method = this.quote.transport_method
        if (this.driver_info) {
          this.pickup_contact_name = [this.driver_info.first_name, this.driver_info.last_name].filter(Boolean).join(' ')
          this.pickup_phone = this.driver_info.phone
          this.pickup_email = this.driver_info.email
          this.pickup_address_1 = this.driver_info.address_1
          this.pickup_address_2 = this.driver_info.address_2
          this.pickup_city = this.driver_info.city
          this.pickup_state_province = this.driver_info.state_province
          this.pickup_postal_code = this.driver_info.postal_code
        }
        // this.pickup_city = this.quote.origin_city
        // this.pickup_state_province = this.quote.origin_state_province
        // this.pickup_postal_code = this.quote.origin_postal_code
        this.delivery_city = this.quote.destination_city
        this.delivery_state_province = this.quote.destination_state_province
        this.delivery_postal_code = this.quote.destination_postal_code
      } else {
        debugger
      }
    },
    // Reset form model
    clear () {
      this.type = null
      this.transport_method = null
      this.pickup_date = null
      this.pickup_modal = false
      this.delivery_date = null
      this.delivery_modal = false
      // step 2
      this.pickup_contact_name = ''
      this.pickup_address_type = null
      this.pickup_phone_type = null
      this.pickup_address_1 = ''
      this.pickup_address_2 = ''
      this.pickup_city = ''
      this.pickup_state_province = ''
      this.pickup_postal_code = ''
      this.pickup_phone = ''
      this.pickup_phone_ext = ''
      this.pickup_email = ''
      this.employee_terminated = false
      // step 3
      this.delivery_contact_name = ''
      this.delivery_address_type = null
      this.delivery_phone_type = null
      this.delivery_address_1 = ''
      this.delivery_address_2 = ''
      this.delivery_city = ''
      this.delivery_state_province = ''
      this.delivery_postal_code = ''
      this.delivery_phone = ''
      this.delivery_phone_ext = ''
      this.delivery_email = ''
      // step 4
      this.approve_auto_detail = false
      this.approve_oil_change = false
      this.other_services = ''
      this.special_instructions = ''
    },
    // Clear form and reset validations
    resetForm () {
      this.clear()
      this.$refs.step1.reset()
      this.$refs.step2.reset()
      this.$refs.step3.reset()
      this.$refs.step4.reset()
    },
    // resetForm () {
    //   this.$nextTick(() => {
    //     this.$refs.formStep1.reset()
    //     this.$refs.formStep1.resetValidation()
    //     this.$refs.step2.reset()
    //     this.$refs.formStep2.resetValidation()
    //     this.$refs.step3.reset()
    //     this.$refs.formStep3.resetValidation()
    //     this.$refs.step4.reset()
    //     this.$refs.formStep4.resetValidation()
    //   })
    // },
    initTest () {
      this.type = 'transport_this_vehicle'
      this.transport_method = 'driven'
      this.pickup_date = '2019-01-01'
      this.delivery_date = '2019-01-05'
      this.pickup_contact_name = 'JOHN SMITH'
      this.pickup_address_type = 'Business'
      this.pickup_address_1 = 'EMKAY, Inc.'
      this.pickup_address_2 = '805 W THORNDALE AVE'
      this.pickup_city = 'ITASCA'
      this.pickup_state_province = 'IL'
      this.pickup_postal_code = '60143'
      this.pickup_phone_type = 'Office'
      this.pickup_phone = '630-864-0000'
      this.pickup_phone_ext = ''
      this.pickup_email = 'JKLO@EMKAY.COM'
      this.employee_terminated = true
      this.delivery_contact_name = 'JOHN SMITH'
      this.delivery_address_type = 'Business'
      this.delivery_address_1 = 'EMKAY, Inc.'
      this.delivery_address_2 = '805 W THORNDALE AVE'
      this.delivery_city = 'ITASCA'
      this.delivery_state_province = 'IL'
      this.delivery_postal_code = '60143'
      this.delivery_phone_type = 'Office'
      this.delivery_phone = '630-864-0000'
      this.delivery_phone_ext = ''
      this.delivery_email = 'JKLO@EMKAY.COM'
      this.approve_auto_detail = false
      this.approve_oil_change = false
      this.other_services = ''
      this.special_instructions = ''
    },
    nextStep () {
      this.currentStep++
    },
    prevStep () {
      this.currentStep--
    },
    submitOrder () {
      alert('SUBMITTING ORDER')
    }
  }
}
</script>
