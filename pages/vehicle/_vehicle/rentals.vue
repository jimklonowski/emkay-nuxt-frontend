<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined class="report">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer />
            <v-text-field
              v-model="search"
              :label="$t('search')"
              background-color="transparent"
              prepend-inner-icon="mdi-magnify"
              class="mr-2"
              clearable
              dense
              flat
              hide-details
              outlined
              rounded
              single-line
              solo
            />
            <!-- Download as XLS button -->
            <client-only>
              <v-divider vertical inset class="mx-3" />
              <download-excel :fields="downloadFields" :data="items">
                <v-btn :title="`${$t('save')} .xls`" color="primary" large icon>
                  <v-icon v-text="'mdi-cloud-download'" />
                </v-btn>
              </download-excel>
            </client-only>
          </v-toolbar>
          <v-divider />
          <v-skeleton-loader :loading="loading" type="table">
            <v-data-table
              :dense="items && !!items.length"
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import { updateQuery, vehicleRoute } from '@/mixins/routing'
/**
 * Vehicle Dashboard Rental History
 */
export default {
  name: 'VehicleDashboardRentalHistory',
  mixins: [downloadFields, vehicleRoute, updateQuery],
  computed: {
    ...mapGetters({
      items: 'vehicle-dashboard/getRentalHistory',
      loading: 'vehicle-dashboard/getRentalLoading',
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
    }),
    columns () {
      return [
        'date',
        'voucher',
        'days',
        'rental_rate',
        'total_amount',
        'reason'
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
          text: this.$i18n.t('voucher'),
          value: 'voucher',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('days'),
          value: 'days',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('rental_rate'),
          value: 'rental_rate',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('total_amount'),
          value: 'total_amount',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('reason'),
          value: 'reason',
          class: 'report-column'
        }
      ]
    },
    query () {
      return { start: this.start, end: this.end }
    },
    title: vm => vm.$i18n.t('rental_history')
  },
  async asyncData ({ $moment, params, query, store }) {
    const vehicle = store.getters['vehicle-dashboard/getVehicleNumber']
    const report_length = 30
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')
    await store.dispatch('vehicle-dashboard/fetchRentalHistory', { start, end, vehicle })
    return {
      start_dialog: false,
      start,
      end_dialog: false,
      end,
      panels_expanded: [0],
      search: ''
    }
  },
  head () {
    return {
      title: `${this.vehicle_number} - ${this.title}`,
      meta: [
        { hid: 'og:description', property: 'og:description', content: this.title }
      ]
    }
  },
  watchQuery: ['start', 'end']
}
</script>
