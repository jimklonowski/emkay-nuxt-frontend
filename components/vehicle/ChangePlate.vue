<template>
  <v-dialog
    v-model="change_plate_dialog"
    max-width="400px"
  >
    <template #activator="{ on }">
      <client-only>
        <v-btn v-on="on" v-text="$t('change_plate')" />
      </client-only>
    </template>
    <v-card :loading="loading">
      <ValidationObserver ref="changePlate" v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(submitPlateChange)">
          <v-card-title v-text="$t('change_plate')" />
          <v-card-text>
            <v-subheader>{{ $route.params.vehicle }}</v-subheader>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors, valid }" :name="$t('license_plate_number')" rules="required">
                    <v-text-field
                      v-model="license_plate_number"
                      :label="$t('license_plate_number')"
                      :error-messages="errors"
                      :success="valid"
                      prepend-inner-icon="mdi-car-info"
                      outlined
                      dense
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <v-dialog
                    ref="license_plate_expiration_date"
                    v-model="expiration_date_dialog"
                    :return-value.sync="license_plate_expiration_date"
                    persistent
                    width="290px"
                  >
                    <template #activator="{ on }">
                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('license_plate_expiration_date')" rules="required">
                        <v-text-field
                          v-model="license_plate_expiration_date"
                          v-on="on"
                          :label="$t('license_plate_expiration_date')"
                          :error-messages="errors"
                          :success="valid"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          outlined
                          dense
                        />
                      </ValidationProvider>
                    </template>
                    <v-date-picker
                      v-model="license_plate_expiration_date"
                      scrollable
                      outlined
                      dense
                    >
                      <v-spacer />
                      <v-btn @click="expiration_date_dialog = false" v-text="$t('cancel')" text />
                      <v-btn @click="$refs.license_plate_expiration_date.save(license_plate_expiration_date)" v-text="$t('ok')" color="primary" />
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn v-text="$t('submit')" type="submit" color="primary" block small />
          </v-card-actions>
        </v-form>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { SnotifyPosition } from 'vue-snotify'
export default {
  props: {
    vehicle: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false,
    change_plate_dialog: false,
    expiration_date_dialog: false,
    license_plate_number: null,
    license_plate_expiration_date: null
  }),
  methods: {
    submitPlateChange () {
      this.loading = true
      setTimeout(() => {
        this.$snotify.info('form submitted', 'submit', { position: SnotifyPosition.centerTop })
        this.loading = false
      }, 1000)
    }
  }
}
</script>
