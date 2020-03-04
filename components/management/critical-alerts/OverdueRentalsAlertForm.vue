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
      {{ $t('overdue_rentals') }}
    </v-card-subtitle>
    <v-divider />
    <v-banner class="caption">
      <v-avatar slot="icon" color="primary" size="40">
        <v-icon v-text="'mdi-progress-clock'" icon="mdi-progress-clock" color="white" />
      </v-avatar>
      <span v-html="$t('alert_overdue_rentals_description')" />
    </v-banner>
    <v-card-text v-show="!suppress_alert">
      <p v-html="$t('alert_overdue_rentals_report_description')" class="mb-0" />
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
    suppress_alert: true,
    most_critical_alert: false
  })
}
</script>
