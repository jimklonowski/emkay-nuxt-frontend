<template>
  <v-card>
    <v-card-title>
      {{ $t('configure_alert') }}
      <v-spacer />
      <v-btn @click="$emit('close-alert-form')" color="primary" icon>
        <v-icon v-text="'mdi-close'" />
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      {{ $t('delayed_orders') }}
    </v-card-subtitle>
    <v-divider />
    <v-banner class="caption" two-line>
      <v-avatar slot="icon" color="primary" size="40">
        <v-icon v-text="'mdi-clock-alert'" icon="mdi-clock-alert" color="white" />
      </v-avatar>
      <span v-html="$t('alert_delayed_orders_description')" />
    </v-banner>
    <v-card-text v-show="!suppress_alert" class="pa-0">
      <v-subheader class="overline">
        {{ $t('lead_time_setup_for_all_orders') }}
      </v-subheader>
      <v-text-field
        v-model="overall_lead_time_default"
        :label="$t('overall_lead_time_default')"
        :suffix="$t('weeks')"
        type="number"
        class="mx-8"
        outlined
        dense
      />

      <v-subheader class="overline">
        {{ $t('lead_time_setup_by_manufacturer') }}
      </v-subheader>
      <v-text-field
        v-for="(manufacturer, m) in manufacturers"
        v-model="manufacturer.value"
        :key="`${manufacturer.name}-${m}`"
        :hint="`Set By: ${manufacturer.text}`"
        :label="manufacturer.name"
        :suffix="$t('weeks')"
        type="number"
        class="mx-8 mb-2"
        dense
        outlined
      />

      <v-subheader class="overline">
        {{ $t('lead_time_setup_by_individual_units') }}
      </v-subheader>
      <v-divider />
      <v-data-table
        :headers="headers"
        :items="items"
        class="striped"
      >
        <template #header.lead_time="{ header }">
          {{ header.text }}
        </template>
        <template #item.lead_time="{ item }">
          <v-edit-dialog
            :cancel-text="$t('cancel')"
            :save-text="$t('save')"
            :return-value.sync="item.lead_time"
            @save="save(item)"
            @cancel="cancel"
            @open="open"
            @close="close"
            large
            persistent
          >
            <strong class="primary--text">{{ item.lead_time }} {{ $t('weeks') }}</strong>
            <template #input>
              <v-text-field
                v-model="item.lead_time"
                :label="$t('edit')"
                :suffix="$t('weeks')"
                type="number"
                single-line
                counter
              />
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>
    </v-card-text>
    <v-divider v-show="!suppress_alert" />
    <v-card-actions>
      <v-checkbox v-model="most_critical_alert" :disabled="suppress_alert" :label="$t('most_critical_alert')" />
      <v-spacer />
      <v-switch v-model="suppress_alert" :label="$t('suppress_alert')" color="error" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    suppress_alert: false,
    most_critical_alert: false,
    overall_lead_time_default: 20,
    manufacturers: [
      { name: 'CHEVROLET', value: 20, text: 'MFC DEFAULT' },
      { name: 'FORD', value: 20, text: 'MFC DEFAULT' },
      { name: 'GMC', value: 20, text: 'MFC DEFAULT' }
    ]
  }),
  computed: {
    headers () {
      return [
        { text: this.$i18n.t('vehicle_number'), value: 'vehicle_number', class: 'report-column', divider: true },
        // { text: this.$i18n.t('client_vehicle_number'), value: 'client_vehicle_number', class: 'report-column', divider: true },
        { text: this.$i18n.t('lead_time'), value: 'lead_time', class: 'report-column', divider: true },
        { text: this.$i18n.t('driver_last_name'), value: 'driver_last_name', class: 'report-column', divider: true },
        { text: this.$i18n.t('vehicle_make'), value: 'vehicle_make', class: 'report-column', divider: true },
        { text: this.$i18n.t('vehicle_model'), value: 'vehicle_model', class: 'report-column', divider: true },
        { text: this.$i18n.t('center_code'), value: 'center_code', class: 'report-column' }
      ]
    },
    items () {
      return [
        {
          vehicle_number: '696969',
          client_vehicle_number: '80808080',
          lead_time: 20,
          driver_last_name: 'SMITH',
          vehicle_make: 'GMC',
          vehicle_model: 'K1500 DBC CAB',
          center_code: '001'
        },
        {
          vehicle_number: '420420',
          client_vehicle_number: 'ABC1234',
          lead_time: 20,
          driver_last_name: 'JOHNSON',
          vehicle_make: 'FORD',
          vehicle_model: 'F150',
          center_code: 'A01'
        },
        {
          vehicle_number: '112233',
          client_vehicle_number: 'DEF4567',
          lead_time: 20,
          driver_last_name: 'MUHAMMAD',
          vehicle_make: 'TESLA',
          vehicle_model: 'P100D',
          center_code: 'B01'
        }
      ]
    }
  },
  methods: {
    cancel () {
      this.$snotify.error('Edit Cancelled')
    },
    close () {
      console.log('closed')
    },
    open () {
      console.log('opened')
    },
    save (item) {
      this.$snotify.info(`Setting vehicle ${item.vehicle_number} to ${item.lead_time}...`, 'TODO')
    }
  }
}
</script>
