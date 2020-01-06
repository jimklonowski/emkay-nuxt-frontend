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
              <v-tab @click="setHash('#status')">
                Transport Status
              </v-tab>
              <v-tab @click="setHash('#quote')">
                Transport/Storage Quote
              </v-tab>
              <v-tab @click="setHash('#create')">
                Create Order
              </v-tab>
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
                                  <ValidationProvider v-slot="{ errors, valid }" :name="$t('type')" rules="required">
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
                                  <ValidationProvider v-slot="{ errors, valid }" name="transport_method" rules="required">
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
                                      <ValidationProvider v-slot="{ errors, valid }" name="pickup_date" rules="required">
                                        <v-text-field v-model="pickup_date" v-on="on" :error-messages="errors" :success="valid" :label="$t('pickup_date')" />
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
                                      <ValidationProvider v-slot="{ errors, valid }" name="delivery_date" rules="required|after:@pickup_date">
                                        <v-text-field v-model="delivery_date" v-on="on" :error-messages="errors" :success="valid" :label="$t('delivery_date')" />
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
                                <v-btn v-if="currentStep > 1" @click.prevent="prevStep" type="submit" text>
                                  {{ $t('back') }}
                                </v-btn>
                                <v-btn v-if="currentStep < 4" type="submit" color="primary">
                                  {{ $t('next') }}
                                </v-btn>
                                <v-btn v-else @click.prevent="submitOrder">
                                  {{ $t('create_order') }}
                                </v-btn>
                              </v-row>
                            </v-container>
                          </v-form>
                        </ValidationObserver>
                      </v-stepper-content>
                      <v-stepper-content :complete="currentStep > 2" step="2">
                        <ValidationObserver ref="step2" v-slot="{ handleSubmit }">
                          <v-form @submit.prevent="handleSubmit(nextStep)">
                            2
                            <v-spacer />
                            <v-btn v-if="currentStep > 1" @click="prevStep" type="submit" text>
                              {{ $t('back') }}
                            </v-btn>
                            <v-btn v-if="currentStep < 4" @click.prevent="nextStep" color="primary">
                              {{ $t('next') }}
                            </v-btn>
                            <v-btn v-else @click.prevent="submitOrder">
                              {{ $t('create_order') }}
                            </v-btn>
                          </v-form>
                        </ValidationObserver>
                      </v-stepper-content>
                      <v-stepper-content :complete="currentStep > 3" step="3">
                        <ValidationObserver ref="step3" v-slot="{ handleSubmit }">
                          <v-form @submit.prevent="handleSubmit(nextStep)">
                            3
                            <v-spacer />
                            <v-btn v-if="currentStep > 1" @click.prevent="prevStep" text>
                              {{ $t('back') }}
                            </v-btn>
                            <v-btn v-if="currentStep < 4" @click.prevent="nextStep" color="primary">
                              {{ $t('next') }}
                            </v-btn>
                            <v-btn v-else @click.prevent="submitOrder">
                              {{ $t('create_order') }}
                            </v-btn>
                          </v-form>
                        </ValidationObserver>
                      </v-stepper-content>
                      <v-stepper-content :complete="currentStep > 4" step="4">
                        <ValidationObserver ref="step4" v-slot="{ handleSubmit }">
                          <v-form @submit.prevent="handleSubmit(nextStep)">
                            4
                            <v-spacer />
                            <v-btn v-if="currentStep > 1" @click.prevent="prevStep" text>
                              {{ $t('back') }}
                            </v-btn>
                            <v-btn v-if="currentStep < 4" @click.prevent="nextStep" color="primary">
                              {{ $t('next') }}
                            </v-btn>
                            <v-btn v-else @click.prevent="submitOrder">
                              {{ $t('create_order') }}
                            </v-btn>
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
    // step 2
    pickup_date: null,
    pickup_modal: false,
    delivery_date: null,
    delivery_modal: false
  }),
  computed: {
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
  },
  methods: {
    nextStep () {
      // validate first
      debugger
      this.currentStep++
    },
    prevStep () {
      // re-validate?
      this.currentStep--
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
