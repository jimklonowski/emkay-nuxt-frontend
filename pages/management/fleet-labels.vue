<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loading" shaped outlined>
          <ValidationObserver v-slot="{ invalid, handleSubmit }">
            <v-form @submit.prevent="handleSubmit(submit)">
              <v-card-title v-text="$t('customize_fleet_labels')" />
              <v-card-text>
                <v-container class="px-0">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-subheader v-text="$t('client')" />
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('client_use_1_label')" rules="max:40">
                              <v-text-field
                                v-model="client_use_labels.client_use_1_label"
                                :label="$t('client_use_1_label')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('client_use_2_label')" rules="max:40">
                              <v-text-field
                                v-model="client_use_labels.client_use_2_label"
                                :label="$t('client_use_2_label')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('client_use_3_label')" rules="max:40">
                              <v-text-field
                                v-model="client_use_labels.client_use_3_label"
                                :label="$t('client_use_3_label')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('client_use_4_label')" rules="max:40">
                              <v-text-field
                                v-model="client_use_labels.client_use_4_label"
                                :label="$t('client_use_4_label')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('client_use_5_label')" rules="max:40">
                              <v-text-field
                                v-model="client_use_labels.client_use_5_label"
                                :label="$t('client_use_5_label')"
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
                      <v-subheader v-text="$t('driver')" />
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_1_label')" rules="max:40">
                              <v-text-field
                                v-model="driver_misc_labels.driver_misc_1_label"
                                :label="$t('driver_misc_1_label')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_2_label')" rules="max:40">
                              <v-text-field
                                v-model="driver_misc_labels.driver_misc_2_label"
                                :label="$t('driver_misc_2_label')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_3_label')" rules="max:40">
                              <v-text-field
                                v-model="driver_misc_labels.driver_misc_3_label"
                                :label="$t('driver_misc_3_label')"
                                :error-messages="errors"
                                outlined
                                dense
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_4_label')" rules="max:40">
                              <v-text-field
                                v-model="driver_misc_labels.driver_misc_4_label"
                                :label="$t('driver_misc_4_label')"
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
                <v-btn
                  v-text="$t('cancel')"
                  :ripple="false"
                  :to="localePath({ path: `/management/` })"
                  color="error"
                  exact
                  nuxt
                  text
                />
                <v-btn :disabled="invalid" type="submit" color="primary">
                  {{ $t('save') }}
                  <v-icon v-text="'mdi-content-save-all'" class="ml-2" small />
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
export default {
  name: 'FleetLabels',
  data () {
    return {
      client_use_labels: null,
      driver_misc_labels: null,
      feedback: null,
      loading: false
    }
  },
  computed: {
    model () {
      return {
        client_use_labels: this.client_use_labels,
        driver_misc_labels: this.driver_misc_labels
      }
    }
  },
  async asyncData ({ store, query, $axios }) {
    // fetch the current labels by calling the account/fetchCustomLabels action
    console.log('dispatching fetchCustomLabels')
    await store.dispatch('account/fetchCustomLabels')

    // asyncData's return object is merged with data's return object
    return {
      client_use_labels: store.getters['account/getClientUseLabels'],
      driver_misc_labels: store.getters['account/getDriverMiscLabels']
    }
  },
  mounted () {
    // this.client_use_labels = Object.assign({}, this.$store.getters['account/getClientUseLabels'])
    // this.driver_misc_labels = Object.assign({}, this.$store.getters['account/getDriverMiscLabels'])
  },
  methods: {
    async submit () {
      this.loading = true
      try {
        const { data: { data, success, message } } = await this.$axios.post('account/update-custom-labels', this.model)
        if (!success) {
          throw new Error(message)
        }
        // success handler
        this.$snotify.success(message, '', { position: SnotifyPosition.centerTop })
        console.dir(data)
      } catch (error) {
        this.$snotify.error(error, '', { position: SnotifyPosition.centerTop })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
