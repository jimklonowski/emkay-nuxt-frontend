<template>
  <v-card tile>
    <ValidationObserver ref="quoteForm" v-slot="{ handleSubmit }">
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
                  <v-subheader v-text="$t('origin')" />
                  <v-row>
                    <v-col cols="12" xl="5">
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
                  <v-subheader v-text="$t('destination')" />
                  <v-row>
                    <v-col cols="12" xl="5">
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
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn @click.stop="reset" tabindex="-1" text>
                    {{ $t('reset') }}
                  </v-btn>
                  <v-btn :loading="loading" type="submit" color="success darken-1">
                    {{ $t('request_quote') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" lg="6">
              <v-container fill-height justify-center>
                <v-row>
                  <v-col cols="12">
                    <v-card v-if="!hasQuote" height="100%" flat>
                      <v-container fill-height>
                        <v-row class="text-center">
                          <v-col>
                            <h1 v-text="$t('transport_storage_quote')" class="font-weight-thin" />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                    <v-scale-transition>
                      <TransportStorageQuote id="quote" />
                    </v-scale-transition>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>

<script>
import TransportStorageQuote from '@/components/vehicle/transtor/TransportStorageQuote'
export default {
  name: 'RequestTranstorQuote',
  components: {
    TransportStorageQuote
  },
  data () {
    return {
      showQuote: false,
      type: null,
      transport_method: null,
      origin_city: null,
      origin_state_province: null,
      origin_postal_code: null,
      destination_city: null,
      destination_state_province: null,
      destination_postal_code: null
    }
  },
  computed: {
    hasQuote: vm => vm.$store.getters['transtor/hasQuote'],
    loading: vm => vm.$store.getters['transtor/getLoading']
  },
  mounted () {
    // reset any previous quotes on mounted
    this.reset()
  },
  methods: {
    async getQuote () {
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
      this.$vuetify.goTo('#quote')
    },
    init () {
      this.type = null
      this.transport_method = null
      this.origin_city = null
      this.origin_state_province = null
      this.origin_postal_code = null
      this.destination_city = null
      this.destination_state_province = null
      this.destination_postal_code = null
    },
    reset () {
      this.$store.dispatch('transtor/reset')
      this.init()
      this.$refs.quoteForm.reset()
    }
  }
}
</script>
