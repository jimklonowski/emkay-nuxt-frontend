<template>
  <v-card flat tile class="report">
    <v-divider />
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
          :dense="!!items.length"
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
        >
          <template #item.issue_date="{ item }">
            {{ item.issue_date | date }}
          </template>

          <template #item.issue_date="{ item }">
            {{ item.expiration_date | date }}
          </template>

          <template #item.status="{ item }">
            <v-chip :outlined="$vuetify.theme.dark" x-small>
              {{ item.status }}
            </v-chip>
          </template>

          <template #item.authorization_profile_id="{ item }">
            <v-dialog v-model="authorization_profile_dialog" max-width="1200" scrollable>
              <template #activator="{ on }">
                <v-btn v-on="on" color="primary" small text tile>
                  <v-icon v-text="'mdi-eye'" class="mr-2" />
                  {{ $t('view') }}
                </v-btn>
              </template>
              <FuelAuthorizationProfile :id="item.authorization_profile_id" />
            </v-dialog>
          </template>

          <template #item.actions="{ item }">
            <v-dialog v-model="card_request_dialog" max-width="1200" scrollable>
              <template #activator="{ on }">
                <v-btn v-on="on" color="error" small text tile>
                  <v-icon v-text="'mdi-credit-card-off'" class="mr-2" />
                  {{ $t('reorder_or_terminate') }}
                </v-btn>
              </template>
              <FuelCardRequest :card="item.card_number" @close-dialog="card_request_dialog = false" />
            </v-dialog>
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import FuelAuthorizationProfile from '@/components/vehicle/fuel/FuelAuthorizationProfile'
import FuelCardRequest from '@/components/vehicle/fuel/FuelCardRequest'
export default {
  name: 'VehicleFuelCards',
  components: { FuelAuthorizationProfile, FuelCardRequest },
  data: () => ({
    authorization_profile_dialog: false,
    card_request_dialog: false,
    search: ''
  }),
  computed: {
    ...mapGetters({
      items: 'vehicle/getFuelCards',
      loading: 'vehicle/getFuelCardsLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'card_number',
        'vendor',
        'issue_date',
        'expiration_date',
        'restrictions',
        'pin',
        'status',
        'authorization_profile_id',
        ''
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('card_#'),
          value: 'card_number',
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
          divider: true,
          width: 300
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
          text: this.$i18n.t('authorization_profile'),
          value: 'authorization_profile_id',
          class: 'report-column',
          divider: true,
          align: 'center'
        },
        {
          text: this.$i18n.t('actions'),
          value: 'actions',
          class: 'report-column',
          align: 'center'
        }
      ]
    }
  },
  async asyncData ({ store, error }) {
    const vehicle = store.getters['vehicle/getVehicleNumber']
    await store.dispatch('vehicle/fetchFuelCards', { vehicle })
    return {}
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$i18n.t('fuel_cards')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
