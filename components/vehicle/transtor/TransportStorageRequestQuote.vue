<template>
  <v-card>
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(getQuote)">
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <v-row>
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
              <v-row>
                <v-col cols="12">
                  <v-subheader v-t="'origin'" />
                  <v-row>
                    <v-col cols="12" lg="12" xl="5">
                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('city')" vid="origin_city" rules="required">
                        <v-text-field
                          v-model="origin_city"
                          :error-messages="errors"
                          :success="valid"
                          :label="$t('city')"
                          outlined
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="7" lg="6" xl="3">
                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('state_province')" vid="origin_state_province" rules="required">
                        <v-text-field
                          v-model="origin_state_province"
                          :error-messages="errors"
                          :success="valid"
                          :label="$t('state_province')"
                          outlined
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="5" lg="6" xl="4">
                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('postal_code')" vid="origin_postal_code" rules="required">
                        <v-text-field
                          v-model="origin_postal_code"
                          :error-messages="errors"
                          :success="valid"
                          :label="$t('postal_code')"
                          outlined
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-subheader v-t="'destination'" />
                  <v-row>
                    <v-col cols="12" lg="12" xl="5">
                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('city')" vid="destination_city" rules="required">
                        <v-text-field
                          v-model="destination_city"
                          :error-messages="errors"
                          :success="valid"
                          :label="$t('city')"
                          outlined
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="7" lg="6" xl="3">
                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('state_province')" vid="destination_state_province" rules="required">
                        <v-text-field
                          v-model="destination_state_province"
                          :error-messages="errors"
                          :success="valid"
                          :label="$t('state_province')"
                          outlined
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="5" lg="6" xl="4">
                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('postal_code')" vid="destination_postal_code" rules="required">
                        <v-text-field
                          v-model="destination_postal_code"
                          :error-messages="errors"
                          :success="valid"
                          :label="$t('postal_code')"
                          outlined
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-btn :loading="loading" v-t="'request_quote'" type="submit" color="success darken-1" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" lg="6">
              <template v-show="showQuote">
                <v-scale-transition>
                  <TransportStorageQuote id="quote" v-show="showQuote" :quote="quote" />
                </v-scale-transition>
                <v-btn
                  v-t="'create_order'"
                  v-if="showQuote"
                  @click.prevent="createOrder"
                  class="mt-4"
                  color="primary"
                  outlined
                  block
                />
              </template>
              <v-card v-if="!showQuote" height="100%" flat>
                <v-container fill-height>
                  <v-row class="text-center">
                    <v-col>
                      <h1 v-t="'transport_storage_quote'" class="font-weight-thin" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>

<script>
// import { SnotifyPosition } from 'vue-snotify'
import TransportStorageQuote from '@/components/vehicle/transtor/TransportStorageQuote'
export default {
  components: {
    TransportStorageQuote
  },
  data () {
    return {
      // model
      vehicle_info: null,
      type: 'transport_this_vehicle',
      transport_method: null,
      origin_city: null,
      origin_state_province: null,
      origin_postal_code: null,
      destination_city: null,
      destination_state_province: null,
      destination_postal_code: null,
      // quote
      showQuote: false
    }
  },
  computed: {
    loading: vm => vm.$store.getters['transtor/getLoading'],
    quote: vm => vm.$store.getters['transtor/getQuote']
  },
  methods: {
    createOrder () {
      // switch tab to order tab
      this.$emit('createOrder')
      // call init to populate the quote into the order form
      console.log('createOrder')
    },
    async getQuote () {
      this.showQuote = false
      // get the quote
      await this.$store.dispatch('transtor/fetchQuote', {
        type: this.type,
        vehicle_info: this.vehicle_info,
        transport_method: this.transport_method,
        origin_city: this.origin_city,
        origin_state_province: this.origin_state_province,
        origin_postal_code: this.origin_postal_code,
        destination_city: this.destination_city,
        destination_state_province: this.destination_state_province,
        destination_postal_code: this.destination_postal_code
      })
      this.showQuote = true
    }
  }
}
</script>
