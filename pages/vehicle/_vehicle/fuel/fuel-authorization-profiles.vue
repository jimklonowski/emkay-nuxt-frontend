<template>
  <v-card flat tile class="report">
    <v-divider />
    <v-card-title>
      {{ $t('fuel_authorization_profiles') }}
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
          :sort-by="['date']"
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
  name: 'VehicleFuelProfiles',
  computed: {
    ...mapGetters({
      items: 'vehicle/getFuelProfiles',
      loading: 'vehicle/getFuelProfilesLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'id',
        'authorization_profile',
        'center',
        'sort',
        'vehicle_type',
        'restrictions',
        'card_type'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('id'),
          value: 'id',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('authorization_profile'),
          value: 'authorization_profile',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('center'),
          value: 'center',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('sort'),
          value: 'sort',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_type'),
          value: 'vehicle_type',
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
          text: this.$i18n.t('card_type'),
          value: 'card_type',
          class: 'report-column'
        }
      ]
    }
  },
  async asyncData ({ store, error }) {
    let search
    const vehicle = store.getters['vehicle/getVehicleNumber']
    await store.dispatch('vehicle/fetchFuelProfiles', { vehicle })
    return { search }
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$t('fuel_authorization_profiles')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
