<template>
  <v-card outlined tile class="report">
    <v-card-title>
      {{ $t('fuel_cards') }}
      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        clearable
        dense
        flat
        hide-details
        outlined
        rounded
        single-line
        solo
      />
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="loading" type="table">
        <v-data-table
          :dense="items && items.length !== 0"
          :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
          :headers="headers"
          :items="items"
          :items-per-page="25"
          :loading="loading"
          :mobile-breakpoint="0"
          :search="search"
          :sort-by="['card_#']"
          :sort-desc="[true]"
          class="striped"
        />
      </v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VehicleFuelCards',
  computed: {
    ...mapGetters({
      items: 'vehicle/getFuelCards',
      loading: 'vehicle/getFuelCardsLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'card_#',
        'vendor',
        'issue_date',
        'expiration_date',
        'restrictions',
        'pin',
        'status',
        'actions'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('card_#'),
          value: 'card_#',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vendor'),
          value: 'vendor',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('issue_date'),
          value: 'issue_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('expiration_date'),
          value: 'expiration_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('restrictions'),
          value: 'restrictions',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('pin'),
          value: 'pin',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('status'),
          value: 'status',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('actions'),
          value: 'actions',
          class: 'report-column'
        }
      ]
    }
  },
  async asyncData ({ store, error }) {
    let search
    const vehicle = store.getters['vehicle/getVehicleNumber']
    await store.dispatch('vehicle/fetchFuelCards', { vehicle })
    return { search }
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$t('fuel_cards')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
