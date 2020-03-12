<template>
  <v-card outlined tile>
    <v-card-title>
      {{ $t('configure_alert') }}
      <v-spacer />
      <v-btn @click="$emit('close-alert-form')" color="primary" icon>
        <v-icon v-text="'mdi-close'" />
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      {{ $t('fuel_card_misuse') }}
    </v-card-subtitle>
    <v-divider />
    <v-banner class="caption" two-line>
      <v-avatar slot="icon" color="primary" size="40">
        <v-icon v-text="'mdi-credit-card'" icon="mdi-credit-card" color="white" />
      </v-avatar>
      <span v-html="$t('alert_fuel_card_misuse_description')" />
    </v-banner>
    <v-card-text v-show="!suppress_alert">
      <v-checkbox v-model="suppress_premium_fuel_misuse" :label="$t('suppress_premium_fuel_misuse')" />
      <v-text-field
        v-model="premium_occurrences"
        v-show="!suppress_premium_fuel_misuse"
        :label="$t('occurrences')"
        type="number"
        class="mx-8"
        outlined
        dense
      />

      <v-checkbox v-model="suppress_oil_change_misuse" :label="$t('suppress_oil_change_misuse')" />
      <v-text-field
        v-model="amount_of_oil_change_purchases"
        v-show="!suppress_oil_change_misuse"
        :label="$t('allowed_amount')"
        prefix="$"
        type="number"
        class="mx-8"
        dense
        outlined
      />

      <v-checkbox v-model="suppress_non_fuel_purchase_misuse" :label="$t('suppress_non_fuel_purchase_misuse')" />
      <div v-show="!suppress_non_fuel_purchase_misuse" :class="!suppress_non_fuel_purchase_misuse ? 'd-flex' : ''" class="flex-row mx-8">
        <v-text-field
          v-model="non_fuel_occurrences"
          :label="$t('occurrences')"
          type="number"
          style="width:45%;"
          outlined
          dense
        />
        <v-subheader v-text="$t('or')" class="overline" />
        <v-text-field
          v-model="amount_of_non_fuel_purchases"
          :label="$t('allowed_amount')"
          prefix="$"
          type="number"
          style="width:45%;"
          outlined
          dense
        />
      </div>

      <v-checkbox v-model="suppress_exceed_tank_capacity_misuse" :label="$t('suppress_exceed_tank_capacity_misuse')" />
      <v-text-field
        v-model="allowed_amount_over_tank_capacity"
        v-show="!suppress_exceed_tank_capacity_misuse"
        :label="$t('allowed_amount_over_tank_capacity')"
        :suffix="$t('gallons')"
        type="number"
        class="mx-8"
        dense
        outlined
      />

      <v-checkbox v-model="suppress_fuel_purchase_misuse" :label="$t('suppress_fuel_purchase_misuse')" />
      <v-text-field
        v-model="allowed_daily_fuel_purcahses"
        v-show="!suppress_fuel_purchase_misuse"
        :label="$t('allowed_daily_fuel_purcahses')"
        prefix="$"
        type="number"
        class="mx-8"
        dense
        outlined
      />

      <v-checkbox v-model="suppress_multiple_fillups_per_day_misuse" :label="$t('suppress_multiple_fillups_per_day_misuse')" />
      <v-text-field
        v-model="allowed_daily_fillups"
        v-show="!suppress_multiple_fillups_per_day_misuse"
        :label="$t('allowed_daily_fillups')"
        type="number"
        class="mx-8"
        dense
        outlined
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
    suppress_premium_fuel_misuse: true,
    premium_occurrences: 0,
    suppress_oil_change_misuse: true,
    amount_of_oil_change_purchases: 0,
    suppress_non_fuel_purchase_misuse: true,
    non_fuel_occurrences: 0,
    amount_of_non_fuel_purchases: 0,
    suppress_exceed_tank_capacity_misuse: true,
    allowed_amount_over_tank_capacity: 0,
    suppress_fuel_purchase_misuse: true,
    allowed_daily_fuel_purcahses: 300,
    suppress_multiple_fillups_per_day_misuse: true,
    allowed_daily_fillups: 0
  })
}
</script>
