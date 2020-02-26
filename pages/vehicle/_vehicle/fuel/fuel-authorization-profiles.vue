<template>
  <v-card flat class="report">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{ $t('fuel_authorization_profiles') }}</v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        background-color="transparent"
        class="mr-1"
        clearable
        dense
        flat
        hide-details
        outlined
        rounded
        single-line
        solo
      />
      <v-divider vertical inset class="mx-4" />
      <!-- Download as XLS button -->
      <client-only>
        <download-excel :fields="downloadFields" :data="items">
          <v-btn :title="`${$t('save')} .xls`" color="primary" large icon>
            <v-icon v-text="'mdi-cloud-download'" />
          </v-btn>
        </download-excel>
      </client-only>
    </v-toolbar>
    <v-divider />
    <!-- Report Content -->
    <v-skeleton-loader :loading="loading" type="table">
      <v-data-table
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
      >
        <template #item.details="{ item }">
          <v-dialog v-model="authorization_profile_dialog">
            <template #activator="{ on }">
              <v-btn v-on="on" color="primary" small text tile>
                <v-icon v-text="'mdi-eye'" class="mr-2" />
                {{ $t('view') }}
              </v-btn>
            </template>
            <fuel-authorization-profile :id="item.id" />
          </v-dialog>
        </template>
      </v-data-table>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import FuelAuthorizationProfile from '@/components/vehicle/fuel/FuelAuthorizationProfile'
export default {
  name: 'VehicleFuelProfiles',
  components: { FuelAuthorizationProfile },
  mixins: [downloadFields],
  data: () => ({
    authorization_profile_dialog: false,
    search: ''
  }),
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
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('details'),
          value: 'details',
          class: 'report-column'
        }
      ]
    }
  },
  async asyncData ({ store, error }) {
    const vehicle = store.getters['vehicle/getVehicleNumber']
    await store.dispatch('vehicle/fetchFuelProfiles', { vehicle })
    return { }
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
