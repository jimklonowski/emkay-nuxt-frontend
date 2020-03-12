<template>
  <ValidationObserver ref="driverForm" @submit.prevent v-slot="{ handleSubmit }" tag="form">
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
                {{ $t('driver_details') }}
              </v-subheader>
              <v-row class="mx-1" dense>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('employee_id')" rules="alpha_dash|max:9">
                    <v-text-field
                      v-model="model.employee_id"
                      :label="$t('employee_id')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_last_name')" rules="required|max:25">
                    <v-text-field
                      v-model="model.last_name"
                      :label="$t('driver_last_name')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_first_name')" rules="required|max:25">
                    <v-text-field
                      v-model="model.first_name"
                      :label="$t('driver_first_name')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="6">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_address_1')" rules="required|max:30">
                    <v-text-field
                      v-model="model.address_1"
                      :label="$t('driver_address_1')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="6">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_address_2')" rules="max:30">
                    <v-text-field
                      v-model="model.address_2"
                      :label="$t('driver_address_2')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="5">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_city')" rules="required|max:25">
                    <v-text-field
                      v-model="model.city"
                      :label="$t('driver_city')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6" md="3">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_state_province')" rules="required|alpha|max:2">
                    <v-text-field
                      v-model="model.state_province"
                      :label="$t('driver_state_province')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6" md="4">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_postal_code')" rules="required|max:10">
                    <v-text-field
                      v-model="model.postal_code"
                      :label="$t('driver_postal_code')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_county')" rules="max:25">
                    <v-text-field
                      v-model="model.county"
                      :label="$t('driver_county')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_email_address')" rules="email|max:60">
                    <v-text-field
                      v-model="model.email"
                      :label="$t('driver_email_address')"
                      :error-messages="errors"
                      type="email"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_phone')" rules="digits:10">
                    <v-text-field
                      v-model="model.phone"
                      :label="$t('driver_phone')"
                      :error-messages="errors"
                      type="tel"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_mobile')" rules="digits:10">
                    <v-text-field
                      v-model="model.mobile"
                      :label="$t('driver_mobile')"
                      :error-messages="errors"
                      type="tel"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" lg="6">
              <v-subheader class="overline">
                {{ $t('driver_labels') }}
              </v-subheader>
              <v-row class="mx-1" dense>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_1')" rules="max:40">
                    <v-text-field
                      v-model="model.misc_1"
                      :label="custom_labels.driver_use_label_1 || $t('driver_use_label_1')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_2')" rules="max:40">
                    <v-text-field
                      v-model="model.misc_2"
                      :label="custom_labels.driver_use_label_2 || $t('driver_use_label_2')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_3')" rules="max:40">
                    <v-text-field
                      v-model="model.misc_3"
                      :label="custom_labels.driver_use_label_3 || $t('driver_use_label_3')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" :name="$t('driver_misc_4')" rules="max:40">
                    <v-text-field
                      v-model="model.misc_4"
                      :label="custom_labels.driver_use_label_4 || $t('driver_use_label_4')"
                      :error-messages="errors"
                      dense
                      outlined
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <slot name="history" />
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
            <span v-show="hasChanges" v-if="driverId" class="font-italic text--disabled caption px-2">{{ $t('unsaved_changes') }}</span>
          </v-fade-transition>
          <!-- <v-btn @click.stop="close" color="error lighten-1" text>
            {{ $t('cancel') }}
          </v-btn> -->
          <v-btn @click="handleSubmit(submitDriver)" :disabled="!hasChanges" type="submit" color="primary" depressed>
            {{ $t('save') }}
          </v-btn>
        </v-card-actions>
      </slot>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { SnotifyPosition } from 'vue-snotify'
import isEqual from 'lodash.isequal'
// import { sleep } from '@/utility/helpers'
export default {
  props: {
    driverId: {
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
      driver_details: 'driver/getDriverDetails',
      vehicle_history: 'driver/getVehicleHistory'
    }),
    defaultItem () {
      return {
        reference_number: '',
        last_name: '',
        first_name: '',
        address_1: '',
        address_2: '',
        city: '',
        state_province: '',
        postal_code: '',
        county: '',
        phone: '',
        mobile: '',
        email: '',
        employee_id: '',
        misc_1: '',
        misc_2: '',
        misc_3: '',
        misc_4: '',
        vehicle_number: ''
      }
    },
    title: vm => vm.driverId ? vm.$i18n.t('edit_driver') : vm.$i18n.t('add_driver'),
    subtitle: vm => vm.driverId,
    hasChanges: vm => !isEqual(vm.model, vm.driver_details)
  },
  watch: {
    async driverId () {
      console.log(`DriverId changed: ${this.driverId}`)
      await this.populateModel(this.driverId)
    }
  },
  async mounted () {
    await this.populateModel(this.driverId)
  },
  methods: {
    ...mapActions({
      initialize: 'driver/init',
      addDriver: 'drivers/addDriver',
      updateDriver: 'drivers/updateDriver'
    }),
    async populateModel (id) {
      if (id) {
        try {
          console.log(`Populating form model for editing driver ${id}`)
          await this.initialize({ driver: id })
          this.model = { ...this.driver_details }
          // debugger
        } catch (error) {
          this.$nuxt.error({ statusCode: 404, message: error.message })
        }
      } else {
        console.log(`Populating form model for adding new driver`)
        this.model = { ...this.defaultItem }
      }
    },
    async close () {
      await this.populateModel(this.driverId)
      this.$refs.driverForm.reset()
      this.$emit('close')
    },
    async submitDriver () {
      try {
        this.loading = true
        if (this.driverId) {
          // updating existing driver
          await this.updateDriver(this.model)
        } else {
          // adding new driver
          await this.addDriver(this.model)
        }
        this.$snotify.success(this.$i18n.t('driver_saved'), this.$i18n.t('success'), { position: SnotifyPosition.centerBottom })
      } catch (error) {
        this.$snotify.error(error, this.$i18n.t('error'), { position: SnotifyPosition.centerBottom })
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
