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
      {{ $t('neglected_maintenance') }}
    </v-card-subtitle>
    <v-divider />
    <v-banner class="caption" two-line>
      <v-avatar slot="icon" color="primary" size="40">
        <v-icon v-text="'mdi-tools'" icon="mdi-tools" color="white" />
      </v-avatar>
      <span v-html="$t('alert_neglected_maintenance_description')" />
    </v-banner>
    <v-card-text v-show="!suppress_alert">
      <v-text-field
        v-model="miles_since_last_oil_change"
        :label="$t('miles_since_last_oil_change')"
        :suffix="$t('miles')"
        type="number"
        outlined
        dense
      />
      <p v-text="$t('or')" class="overline" />
      <v-text-field
        v-model="months_since_last_oil_change"
        :label="$t('months_since_last_oil_change')"
        :suffix="$t('months')"
        type="number"
        outlined
        dense
      />
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
    miles_since_last_oil_change: 15000,
    months_since_last_oil_change: 12
  })
}
</script>
