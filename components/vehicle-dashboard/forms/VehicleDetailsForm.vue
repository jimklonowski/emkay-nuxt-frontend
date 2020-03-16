<template>
  <ValidationObserver ref="vehicleForm" @submit.prevent v-slot="{ handleSubmit }" tag="form">
    <v-card :loading="loading" outlined>
      <v-card-title>
        <slot name="title">
          {{ title }}
          <v-spacer />
          <v-btn @click="close" icon>
            <v-icon v-text="'mdi-close'" />
          </v-btn>
        </slot>
      </v-card-title>
      <v-card-subtitle>
        <slot name="subtitle">
          {{ subtitle }}
        </slot>
      </v-card-subtitle>
      <v-divider />
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" lg="6">
              <v-subheader class="overline">
                {{ $t('vehicle_details') }}
              </v-subheader>
              <v-row class="mx-1" dense>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('client_vehicle_number')" rules="alpha_dash">
                    <v-text-field
                      v-model="model.client_vehicle_number"
                      :label="$t('client_vehicle_number')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('bill_sort')">
                    <v-text-field
                      v-model="model.bill_sort"
                      :label="$t('bill_sort')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('center_name')">
                    <v-text-field
                      v-model="model.center_name"
                      :label="$t('center_name')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('center_code')">
                    <v-text-field
                      v-model="model.center_code"
                      :label="$t('center_code')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" lg="6">
              <v-subheader class="overline">
                {{ $t('client_labels') }}
              </v-subheader>
              <v-row class="mx-1" dense>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('client_use_1')" rules="max:40">
                    <v-text-field
                      v-model="model.client_use_1"
                      :label="custom_labels.client_use_label_1 || $t('client_use_label_1')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('client_use_2')" rules="max:40">
                    <v-text-field
                      v-model="model.client_use_2"
                      :label="custom_labels.client_use_label_2 || $t('client_use_label_2')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('client_use_3')" rules="max:40">
                    <v-text-field
                      v-model="model.client_use_3"
                      :label="custom_labels.client_use_label_3 || $t('client_use_label_3')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('client_use_4')" rules="max:40">
                    <v-text-field
                      v-model="model.client_use_4"
                      :label="custom_labels.client_use_label_4 || $t('client_use_label_4')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('client_use_5')" rules="max:40">
                    <v-text-field
                      v-model="model.client_use_5"
                      :label="custom_labels.client_use_label_5 || $t('client_use_label_5')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider />
      <slot name="actions">
        <v-card-actions>
          <v-spacer />
          <v-fade-transition>
            <span v-show="hasChanges" v-if="vehicleNumber" class="font-italic text--disabled caption px-2">{{ $t('unsaved_changes') }}</span>
          </v-fade-transition>
          <v-btn @click="handleSubmit(submitVehicle)" :disabled="!hasChanges" type="submit" color="primary" depressed>
            {{ $t('save') }}
          </v-btn>
        </v-card-actions>
      </slot>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import { SnotifyPosition } from 'vue-snotify'
import isEqual from 'lodash.isequal'
import { SnotifyPosition } from 'vue-snotify'
export default {
  props: {
    vehicleNumber: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    loading: false,
    model: {}
  }),
  computed: {
    ...mapGetters({
      custom_labels: 'account/getCustomLabels',
      vehicle_details: 'vehicle-dashboard/getVehicleDetails',
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
    }),
    defaultItem () {
      return {
        bill_sort: '',
        center_name: '',
        center_code: '',
        vehicle_number: this.vehicle_number,
        client_vehicle_number: '',
        client_use_1: '',
        client_use_2: '',
        client_use_3: '',
        client_use_4: '',
        client_use_5: '',
        driver_effective_date: ''
      }
    },
    title: vm => vm.vehicleNumber ? vm.$i18n.t('edit_vehicle') : vm.$i18n.t('add_vehicle'),
    subtitle: vm => vm.vehicleNumber,
    hasChanges: vm => !isEqual(vm.model, vm.vehicle_details)
  },
  watch: {
    async vehicleNumber () {
      console.log(`VehicleNumber changes: ${this.vehicleNumber}`)
      await this.populateModel(this.vehicleNumber)
    }
  },
  async mounted () {
    await this.populateModel(this.vehicleNumber)
  },
  methods: {
    ...mapActions({
      initialize: 'vehicle-dashboard/init',
      addVehicle: 'vehicle-dashboard/addVehicle',
      updateVehicle: 'vehicle-dashboard/updateVehicle'
    }),
    async populateModel (id) {
      if (id) {
        try {
          console.log(`Populating form model for editing vehicle ${id}`)
          await this.initialize({ vehicle: id })
          this.model = { ...this.vehicle_details }
        } catch (error) {
          this.$nuxt.error({ statusCode: 404, message: error.message })
        }
      } else {
        console.log(`Populating form model for adding new vehicle`)
        this.model = { ...this.defaultItem }
      }
    },
    async close () {
      await this.populateModel(this.vehicleNumber)
      this.$refs.vehicleForm.reset()
      this.$emit('close')
    },
    async submitVehicle () {
      try {
        this.loading = true
        if (this.vehicleNumber) {
          // updating existing vehicle
          await this.updateVehicle(this.model)
        } else {
          // adding new vehicle
          await this.addVehicle(this.model)
        }
        this.$snotify.success(this.$i18n.t('vehicle_saved'), this.$i18n.t('success'), { position: SnotifyPosition.centerBottom })
      } catch (error) {
        this.$snotify.error(error, this.$i18n.t('error'), { position: SnotifyPosition.centerBottom })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
