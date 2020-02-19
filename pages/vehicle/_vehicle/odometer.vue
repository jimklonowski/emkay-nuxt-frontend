<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined class="report">
          <v-card-title class="pa-0">
            <v-toolbar height="72" flat color="transparent">
              <v-toolbar-title>
                {{ $t('odometer_history') }}
              </v-toolbar-title>
              <v-spacer />
              <!-- <v-text-field
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
              /> -->
              <v-dialog v-model="report_odometer_dialog" max-width="800px">
                <template #activator="{ on }">
                  <v-btn v-on="on" color="primary">
                    <v-icon v-text="'mdi-counter'" class="mr-2" />
                    {{ $t('report_odometer') }}
                  </v-btn>
                </template>
                <ReportOdometer :vehicle="vehicle_number" />
              </v-dialog>
            </v-toolbar>
          </v-card-title>
          <v-divider />
          <!-- Report Filters -->
          <v-container>
            <v-subheader v-text="$t('report_filters')" class="overline" />
            <v-row>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="start_menu"
                  v-model="start_menu"
                  :close-on-content-click="false"
                  :return-value.sync="start"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      v-model="start"
                      :label="$t('start_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="start"
                    :locale="$i18n.locale"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn @click="start_menu = false" text>
                      {{ $t('cancel') }}
                    </v-btn>
                    <v-btn @click="$refs.start_menu.save(start), updateQuery()" text>
                      {{ $t('ok') }}
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="end_menu"
                  v-model="end_menu"
                  :close-on-content-click="false"
                  :return-value.sync="end"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      v-model="end"
                      :label="$t('end_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="end"
                    :locale="$i18n.locale"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn @click="end_menu = false" text>
                      {{ $t('cancel') }}
                    </v-btn>
                    <v-btn @click="$refs.end_menu.save(end), updateQuery()" text>
                      {{ $t('ok') }}
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
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
              >
                <template #item.date="{ item }">
                  {{ item.date | date }}
                </template>
                <template #item.odometer="{ item }">
                  {{ item.odometer | number }}
                </template>
              </v-data-table>
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

import ReportOdometer from '@/components/vehicle/ReportOdometer'

export default {
  name: 'Odometer',
  components: { ReportOdometer },
  mixins: [downloadFields, updateQuery, vehicleRoute],
  data () {
    return {
      end_menu: false,
      start_menu: false,
      report_odometer_dialog: false,
      uploading_odometer: false,
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      items: 'vehicle/getOdometerHistory',
      loading: 'vehicle/getOdometerLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'date',
        'odometer',
        'type'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('odometer_date'),
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
          text: this.$i18n.t('reading_type'),
          value: 'type',
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
    // Fetch odometer data
    await store.dispatch('vehicle/fetchOdometerHistory', { start, end, vehicle })
    return { start, end }
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$t('odometer')}`
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
