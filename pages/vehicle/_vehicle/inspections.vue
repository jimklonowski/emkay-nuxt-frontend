<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined class="report">
          <v-card-title class="pa-0">
            <v-toolbar height="72" flat color="transparent">
              <v-toolbar-title>
                {{ $t('inspections') }}
              </v-toolbar-title>
              <v-spacer />
              <v-text-field
                v-model="search"
                :label="$t('search')"
                prepend-inner-icon="mdi-magnify"
                background-color="transparent"
                clearable
                dense
                flat
                hide-details
                outlined
                rounded
                single-line
                solo
              />
            </v-toolbar>
          </v-card-title>
          <v-divider />
          <v-card-text class="pa-0">
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
                dense
              />
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import { updateQuery, vehicleRoute } from '@/mixins/routing'
export default {
  name: 'VehicleInspections',
  mixins: [downloadFields, updateQuery, vehicleRoute],
  data: () => ({
    start_menu: false,
    end_menu: false,
    search: ''
  }),
  computed: {
    ...mapGetters({
      items: 'vehicle/getInspectionHistory',
      loading: 'vehicle/getInspectionsLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'date',
        'comments',
        'report'
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
          text: this.$i18n.t('comments'),
          value: 'comments',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('report'),
          value: 'report',
          class: 'report-column'
        }
      ]
    },
    query () {
      return { start: this.start, end: this.end }
    }
  },
  async asyncData ({ $moment, params, query, store }) {
    const vehicle = store.getters['vehicle/getVehicleNumber']
    const report_length = 30
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')
    await store.dispatch('vehicle/fetchInspectionHistory', { start, end, vehicle })
    return { start, end }
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$t('inspections')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  watchQuery: ['start', 'end']
}
</script>
