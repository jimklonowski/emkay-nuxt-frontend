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
          form
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
import { mapGetters } from 'vuex'
// import { SnotifyPosition } from 'vue-snotify'
// import isEqual from 'lodash.isequal'
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
      vehicle_details: 'vehicle-dashboard/getVehicleDetails'
    }),
    defaultItem () {
      return {
        driver_effective_date: '',
        center_name: '',
        center_code: ''
      }
    }
  }
}
</script>
