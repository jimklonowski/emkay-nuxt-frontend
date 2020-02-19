<template>
  <v-card flat tile class="report">
    <v-divider />
    <v-card-title>
      {{ $t('maintenance') }}
      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('search')"
        background-color="transparent"
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
        <v-col cols="12" sm="6">
          <v-switch
            v-model="use_bill_date"
            :label="$t('bill_date')"
            @change="updateQuery()"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- Download as XLS Button -->
    <v-toolbar flat color="transparent">
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
          :dense="items && items.length !== 0"
          :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
          :headers="headers"
          :items="items"
          :items-per-page="15"
          :loading="loading"
          :mobile-breakpoint="0"
          :search="search"
          :sort-by="['service_date']"
          :sort-desc="true"
          class="striped"
        >
          <!-- Configure the #no-results message (no rows in filtered search) -->
          <template #no-results>
            <div class="text-left">
              {{ $t('no_search_results', { 'query': search }) }}
            </div>
          </template>

          <!-- Configure individual column rendering -->
          <template #item.service_date="{ item }">
            {{ item.service_date | date }}
          </template>

          <template #item.bill_date="{ item }">
            {{ item.bill_date | date }}
          </template>

          <template #item.amount="{ item }">
            {{ item.amount | currency }}
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import { updateQuery, vehicleRoute } from '@/mixins/routing'
export default {
  name: 'VehicleMaintenanceHistory',
  mixins: [downloadFields, updateQuery, vehicleRoute],
  data: () => ({
    start_menu: false,
    end_menu: false,
    search: ''
  }),
  computed: {
    /**
     * Vuex Getters
     */
    ...mapGetters({
      error: 'vehicle-detail/getError',
      items: 'vehicle-detail/getData',
      loading: 'vehicle-detail/getLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'service_date',
        'bill_date',
        'vendor_name',
        'description',
        'maintenance_category',
        'quantity',
        'amount'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('service_date'),
          value: 'service_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('bill_date'),
          value: 'bill_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vendor_name'),
          value: 'vendor_name',
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
          text: this.$i18n.t('maintenance_category'),
          value: 'maintenance_category',
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
    },
    query () {
      return {
        start: this.start,
        end: this.end,
        use_bill_date: this.use_bill_date
      }
    }
  },
  async asyncData ({ $moment, params, query, store, error }) {
    const vehicle = store.getters['vehicle/getVehicleNumber']
    const report_length = 30
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')
    const use_bill_date = query.use_bill_date || false

    await store.dispatch('vehicle-detail/fetchMaintenanceHistory', { start, end, use_bill_date, vehicle })

    return { start, end, use_bill_date }
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$t('maintenance_history')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  watchQuery: ['start', 'end', 'use_bill_date']
}
</script>
