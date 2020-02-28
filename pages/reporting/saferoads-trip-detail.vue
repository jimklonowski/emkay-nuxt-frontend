<template>
  <v-card outlined class="report">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{ $t('saferoads_trip_detail') }}</v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        background-color="transparent"
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

    <!-- Report Filters -->
    <v-expansion-panels accordion flat hover tile>
      <v-expansion-panel class="transparent">
        <v-expansion-panel-header class="overline">
          {{ $t('report_filters') }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container class="pb-0">
            <v-row>
              <v-col cols="12" sm="4">
                <v-dialog
                  ref="start_dialog"
                  v-model="start_dialog"
                  :return-value.sync="start"
                  @keydown.esc="start_dialog = false"
                  persistent
                  width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      :value="$moment(start).format('L')"
                      :label="$t('start_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      dense
                      outlined
                      readonly
                      rounded
                    />
                  </template>
                  <v-date-picker
                    v-model="start"
                    :locale="$moment.locale()"
                    color="primary"
                    header-color="primary"
                    scrollable
                  >
                    <v-spacer />
                    <v-btn v-text="$t('cancel')" @click="start_dialog = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.start_dialog.save(start), updateQuery()" text />
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="4">
                <v-dialog
                  ref="end_dialog"
                  v-model="end_dialog"
                  :return-value.sync="end"
                  @keydown.esc="end_dialog = false"
                  persistent
                  width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      :value="$moment(end).format('L')"
                      :label="$t('end_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      dense
                      outlined
                      readonly
                      rounded
                    />
                  </template>
                  <v-date-picker
                    v-model="end"
                    :locale="$moment.locale()"
                    color="primary"
                    header-color="primary"
                    scrollable
                  >
                    <v-spacer />
                    <v-btn v-text="$t('cancel')" @click="end_dialog = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.end_dialog.save(end), updateQuery()" text />
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider />

    <!-- Report Content -->
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
        :sort-by="['driver_number']"
        :sort-desc="[false]"
        class="striped"
      >
        <!-- Configure the #no-data message (no data from server) -->
        <template #no-data>
          <div class="text-left">
            {{ $t('no_data_found', { 'message': error }) }}
          </div>
        </template>

        <!-- Configure the #no-results message (no rows in filtered search) -->
        <template #no-results>
          <div class="text-left">
            {{ $t('no_search_results', { 'query': search }) }}
          </div>
        </template>
      </v-data-table>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import { updateQuery } from '@/mixins/routing'
/**
 * Saferoads Trip Detail
 */
export default {
  name: 'SaferoadsTripDetail',
  mixins: [downloadFields, updateQuery],
  data: () => ({
    search: '',
    end_dialog: false,
    start_dialog: false
  }),
  computed: {
    ...mapGetters({
      items: 'reports/getData',
      error: 'reports/getError',
      loading: 'reports/getLoading'
    }),
    columns () {
      return [
        'driver_number',
        'driver_name',
        'driver_email_address',
        'date',
        'start_time',
        'end_time',
        'duration',
        'distance',
        'saferoads_score',
        'braking',
        'acceleration',
        'speeding',
        'hard_turn',
        'phone_use',
        'trip_start_latitude',
        'trip_start_longitude',
        'trip_end_latitude',
        'trip_end_longitude'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('driver_number'),
          value: 'driver_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_name'),
          value: 'driver_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_email_address'),
          value: 'driver_email_address',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('date'),
          value: 'date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('start_time'),
          value: 'start_time',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('end_time'),
          value: 'end_time',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('duration'),
          value: 'duration',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('distance'),
          value: 'distance',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('saferoads_score'),
          value: 'saferoads_score',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('braking'),
          value: 'braking',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('acceleration'),
          value: 'acceleration',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('speeding'),
          value: 'speeding',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('hard_turn'),
          value: 'hard_turn',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('phone_use'),
          value: 'phone_use',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('trip_start_latitude'),
          value: 'trip_start_latitude',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('trip_start_longitude'),
          value: 'trip_start_longitude',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('trip_end_latitude'),
          value: 'trip_end_latitude',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('trip_end_longitude'),
          value: 'trip_end_longitude',
          class: 'report-column'
        }
      ]
    },
    query () {
      return {
        start: this.start,
        end: this.end
      }
    }
  },
  async asyncData ({ $moment, query, store }) {
    const report_length = 30
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')
    await store.dispatch('reports/fetchSaferoadsTripDetailReport', { start, end })
    return { start, end }
  },
  head () {
    const title = this.$t('saferoads_trip_detail')
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
