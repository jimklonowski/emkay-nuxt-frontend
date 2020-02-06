<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-btn @click="$router.go(-1)" text>
          {{ $t('back') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ $t('edit_custom_labels') }}</v-card-title>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col v-for="(item, name, key) in model" :key="key" cols="12">
                    <v-text-field
                      v-model="model[name]"
                      :label="custom_labels[`client_use_label_${key+1}`]"
                      outlined
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn>Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EditCustomLabels',
  data: () => ({
    model: {
      client_use_1: '',
      client_use_2: '',
      client_use_3: '',
      client_use_4: '',
      client_use_5: ''
    }
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
    this.loadLabels()
  },
  methods: {
    loadLabels () {
      debugger
      this.model = {
        ...this.model,
        client_use_1: this.vehicle_details.client_use_1,
        client_use_2: this.vehicle_details.client_use_2,
        client_use_3: this.vehicle_details.client_use_3,
        client_use_4: this.vehicle_details.client_use_4,
        client_use_5: this.vehicle_details.client_use_5
      }
    }
  }
}
</script>

<style>

</style>
