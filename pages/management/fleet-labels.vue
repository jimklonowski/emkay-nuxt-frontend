<template>
  <ValidationObserver ref="labelsForm" @submit.prevent v-slot="{ handleSubmit }" tag="form">
    <v-card :loading="loading" outlined>
      <v-card-title class="font-lato">
        {{ $t('edit_custom_labels') }}
      </v-card-title>
      <v-card-subtitle>
        {{ $t('custom_labels_warning') }}
      </v-card-subtitle>
      <v-divider />
      <v-card-text>
        <v-container>
          <v-row>
            <!-- Client Labels -->
            <v-col cols="12" md="6">
              <v-subheader class="px-0">
                {{ $t('client_labels') }}
              </v-subheader>
              <ValidationProvider v-for="item in client_labels" :key="item.key" v-slot="{ errors }" :name="$t(item.key)" rules="max:40">
                <v-text-field
                  :label="$t(item.key)"
                  v-model="model[item.key]"
                  :error-messages="errors"
                  dense
                  outlined
                />
              </ValidationProvider>
            </v-col>
            <!-- Driver Labels -->
            <v-col cols="12" md="6">
              <v-subheader class="px-0">
                {{ $t('driver_labels') }}
              </v-subheader>
              <ValidationProvider v-for="item in driver_labels" :key="item.key" v-slot="{ errors }" :name="$t(item.key)" rules="max:40">
                <v-text-field
                  :label="$t(item.key)"
                  v-model="model[item.key]"
                  :error-messages="errors"
                  dense
                  outlined
                />
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-fade-transition>
          <span v-show="hasChanges" class="font-italic text--disabled body-2 px-4">{{ $t('unsaved_changes') }}</span>
        </v-fade-transition>
        <v-btn @click="handleSubmit(submitLabels)" :disabled="!hasChanges" type="submit" color="primary" depressed>
          {{ $t('save_changes') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { SnotifyPosition } from 'vue-snotify'
import isEqual from 'lodash.isequal'
export default {
  name: 'ManagementFleetLabels',
  data: () => ({
    loading: false,
    model: {
      client_use_label_1: '',
      client_use_label_2: '',
      client_use_label_3: '',
      client_use_label_4: '',
      client_use_label_5: '',
      driver_use_label_1: '',
      driver_use_label_2: '',
      driver_use_label_3: '',
      driver_use_label_4: ''
    }
  }),
  computed: {
    ...mapGetters({
      custom_labels: 'account/getCustomLabels',
      client_labels: 'account/getClientLabels',
      driver_labels: 'account/getDriverLabels'
    }),
    /**
     * I wanted to keep the save button disabled unless there had been changes made to the form.  Easy to use Lodash's isEqual to compare objects
     */
    hasChanges: vm => !isEqual(vm.model, vm.custom_labels)
  },
  asyncData ({ store }) {
    // copy existing labels into model
    const loadedLabels = store.getters['account/getCustomLabels']
    const model = { ...loadedLabels }
    return { model }
  },
  methods: {
    ...mapActions({
      updateLabels: 'account/updateCustomLabels'
    }),
    async submitLabels () {
      try {
        this.loading = true
        await this.updateLabels(this.model)
        this.$snotify.success(this.$i18n.t('labels_updated'), this.$i18n.t('success'), { position: SnotifyPosition.centerBottom })
      } catch (error) {
        this.$snotify.error(error, this.$i18n.t('error'), { position: SnotifyPosition.centerBottom })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
