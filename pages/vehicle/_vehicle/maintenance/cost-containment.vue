<template>
  <v-card flat class="report">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{ $t('cost_containment') }}</v-toolbar-title>
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
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VehicleMaintenanceCostContainment',
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapGetters({
      items: 'vehicle/getMaintenanceCostContainmentHistory',
      loading: 'vehicle/getMaintenanceCostContainmentLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'date',
        'odometer',
        'vendor',
        'status',
        'in_network',
        'service',
        'quantity',
        'amount'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('date'),
          value: 'date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('odometer'),
          value: 'odometer',
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
          text: this.$i18n.t('status'),
          value: 'status',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('in_network'),
          value: 'in_network',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('service'),
          value: 'service',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('quantity'),
          value: 'quantity',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('amount'),
          value: 'amount',
          class: 'report-column'
        }
      ]
    }
  },
  async asyncData ({ store }) {
    const vehicle = store.getters['vehicle/getVehicleNumber']
    await store.dispatch('vehicle/fetchMaintenanceCostContainmentHistory', { vehicle })
    return {}
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$i18n.t('cost_containment')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
