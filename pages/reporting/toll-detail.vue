<template>
  <v-card outlined class="report">
    <v-card-title>
      {{ $t('toll_detail') }}
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
                :value="$moment(start).format('L')"
                :label="$t('start_date')"
                v-on="on"
                prepend-icon="mdi-calendar"
                readonly
              />
            </template>
            <v-date-picker
              v-model="start"
              no-title
              scrollable
            >
              <v-spacer />
              <v-btn v-text="$t('cancel')" @click="start_menu = false" text />
              <v-btn v-text="$t('ok')" @click="$refs.start_menu.save(start), updateQuery()" text />
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
                :value="$moment(end).format('L')"
                :label="$t('end_date')"
                v-on="on"
                prepend-icon="mdi-calendar"
                readonly
              />
            </template>
            <v-date-picker
              v-model="end"
              no-title
              scrollable
            >
              <v-spacer />
              <v-btn v-text="$t('cancel')" @click="end_menu = false" text />
              <v-btn v-text="$t('ok')" @click="$refs.end_menu.save(end), updateQuery()" text />
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
    <!-- Download as XLS button -->
    <v-toolbar flat>
      <v-spacer />
      <v-btn :title="`${$t('save')} .xls`" small depressed>
        <v-icon v-text="'mdi-cloud-download'" small class="mr-2" />
        <client-only>
          <download-excel v-text="$t('download')" :fields="downloadFields" :data="items" />
        </client-only>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <!-- Report Content -->
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
          :sort-by="['toll_date']"
          :sort-desc="[true]"
          class="striped"
          dense
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

          <!-- Configure how each #item row is rendered -->
          <!-- <template #item="{ item }">
            {{ item }}
          </template> -->
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import { updateQuery } from '@/mixins/routing'
/**
 * Toll Detail Report
 */
export default {
  name: 'TollDetail',
  mixins: [downloadFields, updateQuery],
  data (context) {
    return {
      end_menu: false,
      start_menu: false,
      search: ''
    }
  },
  computed: {
    // Mapped Vuex Getters
    ...mapGetters({
      items: 'reports/getData',
      error: 'reports/getError',
      loading: 'reports/getLoading'
    }),
    // Downloaded csv contains these columns.
    columns () {
      return [
        'date',
        'vehicle_number',
        'description',
        'location',
        'amount'
      ]
    },
    // Datatable contains these headers.
    headers () {
      return [
        {
          text: this.$i18n.t('date'),
          value: 'date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_number'),
          value: 'vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('description'),
          value: 'description',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('location'),
          value: 'location',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('amount'),
          value: 'amount',
          class: 'report-column'
        }
      ]
    },
    // Query parameters
    query () {
      return {
        start: this.start_date,
        end: this.end_date
      }
    }
  },
  async asyncData ({ $moment, query, store }) {
    const report_length = 30
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')

    // Fetch report data
    await store.dispatch('reports/fetchTollDetailReport', { start, end })

    // Return the report parameters so they are merged with the data() object
    return { start, end }
  },
  head () {
    const title = this.$t('toll_detail')
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
