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
        <v-card outlined shaped>
          <v-card-title>
            <v-tabs v-model="tabs" grow show-arrows>
              <v-tab @click="setHash('#status')" v-t="'transport_status'" />
              <v-tab @click="setHash('#quote')" v-t="'transport_storage_quote'" />
              <v-tab @click="setHash('#create')" v-t="'create_order'" />
            </v-tabs>
          </v-card-title>
          <v-card-text>
            <v-tabs-items v-model="tabs">
              <v-tab-item>
                <v-data-table
                  :items="items"
                  :headers="headers"
                  class="striped"
                />
              </v-tab-item>
              <v-tab-item>
                Quote
              </v-tab-item>
              <v-tab-item>
                <v-card-title v-t="'create_order'" />
                <v-card-text>
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
                          <v-form @submit.prevent="handleSubmit(nextStep)">
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
                                <v-col cols="12" sm="6">
                                  <v-dialog
                                    ref="pickup_modal"
                                    v-model="pickup_modal"
                                    :return-value.sync="pickup_date"
                                    persistent
                                    width="290px"
                                  >
                                    <template #activator="{ on }">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('pickup_date')" vid="pickup_date" rules="required|notPast|before:@delivery_date">
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
                                      <v-btn @click="pickup_modal = false" v-t="'cancel'" text />
                                      <v-btn @click="$refs.pickup_modal.save(pickup_date)" v-t="'ok'" />
                                    </v-date-picker>
                                  </v-dialog>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-dialog
                                    ref="delivery_modal"
                                    v-model="delivery_modal"
                                    :return-value.sync="delivery_date"
                                    persistent
                                    width="290px"
                                  >
                                    <template #activator="{ on }">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('delivery_date')" vid="delivery_date" rules="required|notPast|after:@pickup_date">
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
                                      <v-btn @click="delivery_modal = false" v-t="'cancel'" text />
                                      <v-btn @click="$refs.delivery_modal.save(delivery_date)" v-t="'ok'" />
                                    </v-date-picker>
                                  </v-dialog>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-spacer />
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
                          <v-form @submit.prevent="handleSubmit(nextStep)">
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="6">
                                  <v-row>
                                    <v-col cols="12">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('contact_name')" vid="contact_name" rules="required">
                                        <v-text-field v-model="pickup_contact_name" :error-messages="errors" :success="valid" :label="$t('contact_name')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="6">
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
                                        <v-text-field v-model="pickup_address_1" :error-messages="errors" :success="valid" :label="$t('address_1')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12">
                                      <ValidationProvider v-slot="{ errors }" :name="$t('address_2')" vid="address_2">
                                        <v-text-field v-model="pickup_address_2" :error-messages="errors" :label="$t('address_2')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('city')" vid="city" rules="required">
                                        <v-text-field v-model="pickup_city" :error-messages="errors" :success="valid" :label="$t('city')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="6">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('state_province')" vid="state_province" rules="required">
                                        <v-text-field v-model="pickup_state_province" :error-messages="errors" :success="valid" :label="$t('state_province')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="6">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('postal_code')" vid="postal_code" rules="required">
                                        <v-text-field v-model="pickup_postal_code" :error-messages="errors" :success="valid" :label="$t('postal_code')" />
                                      </ValidationProvider>
                                    </v-col>
                                  </v-row>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-row>
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
                                        <v-text-field v-model="pickup_phone" :error-messages="errors" :success="valid" :label="$t('phone')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="4">
                                      <ValidationProvider v-slot="{ errors }" :name="$t('extension')" vid="extension">
                                        <v-text-field v-model="pickup_phone_ext" :error-messages="errors" :label="$t('extension')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('email')" vid="email" rules="required">
                                        <v-text-field v-model="pickup_email" :error-messages="errors" :success="valid" :label="$t('email')" />
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
                          <v-form @submit.prevent="handleSubmit(nextStep)">
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="6">
                                  <v-row>
                                    <v-col cols="12">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('contact_name')" vid="contact_name" rules="required">
                                        <v-text-field v-model="delivery_contact_name" :error-messages="errors" :success="valid" :label="$t('contact_name')" />
                                      </ValidationProvider>
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
                                        <v-text-field v-model="delivery_address_1" :error-messages="errors" :success="valid" :label="$t('address_1')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12">
                                      <ValidationProvider v-slot="{ errors }" :name="$t('address_2')" vid="address_2">
                                        <v-text-field v-model="delivery_address_2" :error-messages="errors" :label="$t('address_2')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('city')" vid="city" rules="required">
                                        <v-text-field v-model="delivery_city" :error-messages="errors" :success="valid" :label="$t('city')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="6">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('state_province')" vid="state_province" rules="required">
                                        <v-text-field v-model="delivery_state_province" :error-messages="errors" :success="valid" :label="$t('state_province')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="6">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('postal_code')" vid="postal_code" rules="required">
                                        <v-text-field v-model="delivery_postal_code" :error-messages="errors" :success="valid" :label="$t('postal_code')" />
                                      </ValidationProvider>
                                    </v-col>
                                  </v-row>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-row>
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
                                        <v-text-field v-model="delivery_phone" :error-messages="errors" :success="valid" :label="$t('phone')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="4">
                                      <ValidationProvider v-slot="{ errors }" :name="$t('extension')" vid="extension">
                                        <v-text-field v-model="delivery_phone_ext" :error-messages="errors" :label="$t('extension')" />
                                      </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12">
                                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('email')" vid="email" rules="required">
                                        <v-text-field v-model="delivery_email" :error-messages="errors" :success="valid" :label="$t('email')" />
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
                          <v-form @submit.prevent="handleSubmit(submitOrder)">
                            <v-container>
                              <v-row>
                                <v-col cols="12" md="6">
                                  <ValidationProvider v-slot="{ errors }" :name="$t('approve_auto_detail')" vid="approve_auto_detail">
                                    <v-checkbox v-model="approve_auto_detail" :error-messages="errors" :label="$t('approve_auto_detail')" />
                                  </ValidationProvider>
                                </v-col>
                                <v-col cols="12" md="6">
                                  <ValidationProvider v-slot="{ errors }" :name="$t('approve_oil_change')" vid="approve_oil_change">
                                    <v-checkbox v-model="approve_oil_change" :error-messages="errors" :label="$t('approve_oil_change')" />
                                  </ValidationProvider>
                                </v-col>
                                <v-col cols="12" md="6">
                                  <ValidationProvider v-slot="{ errors }" :name="$t('other_services')" vid="other_services">
                                    <v-textarea v-model="other_services" :error-messages="errors" :label="$t('other_services')" outlined />
                                  </ValidationProvider>
                                </v-col>
                                <v-col cols="12" md="6">
                                  <ValidationProvider v-slot="{ errors }" :name="$t('special_instructions')" vid="special_instructions">
                                    <v-textarea v-model="special_instructions" :error-messages="errors" :label="$t('special_instructions')" outlined />
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
                </v-card-text>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { headers } from '@/mixins/datatables'
import { vehicleRoute } from '@/mixins/routing'
export default {
  mixins: [headers, vehicleRoute],
  data: () => ({
    currentStep: 1,
    tabs: 0,

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
  }),
  computed: {
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
    },
    columns () {
      return [
        'order_date',
        'order_#',
        'pickup_location',
        'delivery_location',
        'actions'
      ]
    },
    items: vm => vm.$store.getters['vehicle/getTransportStatus']
  },
  async mounted () {
    const vehicle_number = this.vehicleNumber || ''

    const filters = {
      command: 'TRANSTOR',
      customer: 'EM102',
      vehicle_number,
      json: 'Y'
    }
    await this.$store.dispatch('vehicle/fetchTransportStatus', filters)
    this.initialized = true

    if (this.$route.hash) {
      console.log(this.$route.hash)
      // switch tab based on hash
      if (this.$route.hash === '#status') {
        this.tabs = 0
      } else if (this.$route.hash === '#quote') {
        this.tabs = 1
      } else if (this.$route.hash === '#create') {
        this.tabs = 2
      }
      // remove hash
      // this.$router.replace({ hash: '' })
    }
    // this.initTest()
  },
  methods: {
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
      // debugger
      this.currentStep++
    },
    prevStep () {
      this.currentStep--
    },
    submitOrder () {
      alert('SUBMITTING ORDER')
    },
    setHash (hash) {
      if (this.$router.hash === hash) {
        // prevent NavigationDuplicated errors by not re-using the current exact route
        return
      }
      this.$router.replace(hash)
    }
  }

}
</script>
