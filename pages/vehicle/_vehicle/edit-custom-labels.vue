<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <ValidationObserver ref="labelsForm" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(submitLabels)">
              <v-card-title>{{ $t('edit_custom_labels') }}</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="client_use_1"
                        :label="custom_labels.client_use_label_1"
                        outlined
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="client_use_2"
                        :label="custom_labels.client_use_label_2"
                        outlined
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="client_use_3"
                        :label="custom_labels.client_use_label_3"
                        outlined
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="client_use_4"
                        :label="custom_labels.client_use_label_4"
                        outlined
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="client_use_5"
                        :label="custom_labels.client_use_label_5"
                        outlined
                      />
                    </v-col>
                    <!-- <v-col v-for="(item, name, key) in model" :key="key" cols="12">
                      <v-text-field
                        v-model="model[name]"
                        :label="custom_labels[`client_use_label_${key+1}`]"
                        outlined
                      />
                    </v-col> -->
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EditCustomLabels',
  data: () => ({
    loading: false,
    // Model
    client_use_1: '',
    client_use_2: '',
    client_use_3: '',
    client_use_4: '',
    client_use_5: ''
  }),
  head () {
    const title = this.$t('edit_custom_labels')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  computed: {
    vehicle_details: vm => vm.$store.getters['vehicle/getVehicleDetails'],
    custom_labels: vm => vm.$store.getters['account/getCustomLabels']
  },
  mounted () {
    // reset form and load model
    this.init()
  },
  methods: {
    init () {
      // clear inputs
      this.client_use_1 = null
      this.client_use_2 = null
      this.client_use_3 = null
      this.client_use_4 = null
      this.client_use_5 = null
      // load labels from vuex
      this.loadLabels()
      this.reset()
    },
    loadLabels () {
      this.client_use_1 = this.vehicle_details.client_use_1
      this.client_use_2 = this.vehicle_details.client_use_2
      this.client_use_3 = this.vehicle_details.client_use_3
      this.client_use_4 = this.vehicle_details.client_use_4
      this.client_use_5 = this.vehicle_details.client_use_5
    },
    reset () {
      this.$refs.labelsForm.reset()
    },
    async submitLabels () {
      await console.log('submit labels...')
      debugger
    }
  }
}
</script>

<style>

</style>
