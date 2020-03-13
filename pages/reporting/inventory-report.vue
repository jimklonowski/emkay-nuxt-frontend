<template>
  <v-card outlined class="report">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
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
        <download-excel :fields="downloadFields" :data="items" :name="exportName">
          <v-btn :title="`${$t('save')} .xls`" color="primary" large icon>
            <v-icon v-text="'mdi-cloud-download'" />
          </v-btn>
        </download-excel>
      </client-only>
    </v-toolbar>
    <v-divider />

    <!-- Report Filters -->
    <v-expansion-panels
      v-model="panels_expanded"
      accordion
      flat
      hover
      multiple
      tile
    >
      <v-expansion-panel class="transparent">
        <v-expansion-panel-header class="overline">
          {{ $t('report_filters') }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container class="pb-0">
            <v-row>
              <v-col cols="12" sm="6" lg="3">
                <v-dialog
                  ref="centers_dialog"
                  v-model="centers_dialog"
                  max-width="650"
                  scrollable
                >
                  <template #activator="{ on }">
                    <v-btn v-on="on" color="primary" width="100%" depressed rounded>
                      {{ $tc('centers_filtered', centers_selected.length) }}
                    </v-btn>
                  </template>
                  <v-card>
                    <v-sheet class="pa-0 primary" dark>
                      <v-toolbar flat color="transparent">
                        <v-toolbar-title>{{ $t('centers') }}</v-toolbar-title>
                        <v-spacer />
                        <v-btn @click="centers_dialog = false" icon>
                          <v-icon v-text="'mdi-close'" />
                        </v-btn>
                      </v-toolbar>
                      <v-sheet class="primary lighten-1 flex-column pa-4" dark>
                        <v-text-field
                          v-model="search_centers"
                          :label="$t('search_centers')"
                          dark
                          flat
                          solo-inverted
                          hide-details
                          clearable
                          clear-icon="mdi-close-circle-outline"
                          autocomplete="off"
                        />
                      </v-sheet>
                    </v-sheet>
                    <v-card-text>
                      <center-picker v-model="centers_selected" :return-value.sync="centers_selected" :search="search_centers" />
                    </v-card-text>
                    <v-divider />
                    <v-card-actions>
                      {{ $tc('centers_selected', centers_selected.length) }}
                      <v-spacer />
                      <v-btn @click="centers_selected = [], search_centers = ''" color="error" text>
                        {{ $t('reset') }}
                      </v-btn>
                      <v-btn @click="centers_dialog = false" color="primary">
                        {{ $t('ok') }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
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
        :sort-by="['vehicle_number']"
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

        <!-- configure individual columns -->
        <template #item.vehicle_number="{ item }">
          <nuxt-link :title="$t(`to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" class="text-decoration-none" nuxt />
        </template>

        <template #item.driver_email_address="{ item }">
          <v-btn v-show="item.driver_email_address" @click="emailTo(item.driver_email_address)" text small tile>
            <v-icon v-text="'mdi-email-edit'" class="mr-2" />
            {{ item.driver_email_address }}
          </v-btn>
        </template>

        <template #item.driver_fax="{ item }">
          {{ item.driver_fax | phone }}
        </template>

        <template #item.driver_mobile="{ item }">
          <v-btn v-show="item.driver_mobile" @click="dialTo(item.driver_mobile)" text small tile>
            <v-icon v-text="'mdi-cellphone-iphone'" class="mr-2" />
            {{ item.driver_mobile | phone }}
          </v-btn>
        </template>

        <template #item.driver_phone="{ item }">
          <v-btn v-show="item.driver_phone" @click="dialTo(item.driver_phone)" text small tile>
            <v-icon v-text="'mdi-phone'" class="mr-2" />
            {{ item.driver_phone | phone }}
          </v-btn>
        </template>

        <template #item.in_service_date="{ item }">
          {{ item.in_service_date | date }}
        </template>

        <template #item.irs_fair_market_value="{ item }">
          {{ item.irs_fair_market_value | currency }}
        </template>

        <template #item.license_plate_expiration_date="{ item }">
          {{ item.license_plate_expiration_date | date }}
        </template>

        <template #item.odometer_date="{ item }">
          {{ item.odometer_date | date }}
        </template>

        <template #item.original_in_service_date="{ item }">
          {{ item.original_in_service_date | date }}
        </template>

        <template #item.vehicle_cap_cost="{ item }">
          {{ item.vehicle_cap_cost | currency }}
        </template>

        <template #item.vehicle_tank_capacity="{ item }">
          {{ item.vehicle_tank_capacity | number }}
        </template>
      </v-data-table>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
/**
 * Notes: Hydration errors occur if using v-if in template. Use v-show instead for SSR (since v-if actually removes the element).
 */
import { mapGetters } from 'vuex'
import { dialTo, emailTo } from '@/utility/helpers'
import { downloadFields } from '@/mixins/datatables'

/**
 * Inventory Report (vehicle audit report)
 */
export default {
  name: 'InventoryReport',
  components: {
    'center-picker': () => import(/* webpackChunkName: "CenterPicker" */ `@/components/core/CenterPicker`)
  },
  mixins: [downloadFields],
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
        'vehicle_number',
        'client_vehicle_number',
        'bill_sort',
        'center_code',
        'center_name',
        'client_use_1',
        'client_use_2',
        'client_use_3',
        'client_use_4',
        'client_use_5',
        'contract_description',
        'contract_id',
        'coupon_book_number',
        'customer_number',
        'driver_address_1',
        'driver_address_2',
        'driver_city',
        'driver_county',
        'driver_email_address',
        'driver_employee_id',
        'driver_fax',
        'driver_first_name',
        'driver_last_name',
        'driver_mobile',
        'driver_phone',
        'driver_reference_number',
        'driver_state_province',
        'fuel_card_description',
        'fuel_profile_limits',
        'in_service_date',
        'irs_fair_market_value',
        'lease_rate_id',
        'level_01',
        'level_02',
        'level_03',
        'level_04',
        'level_05',
        'level_06',
        'level_07',
        'level_08',
        'level_09',
        'level_10',
        'license_plate_expiration_date',
        'license_plate_number',
        'license_plate_state_province',
        'license_plate_type',
        'life_months_in_service',
        'model_year',
        'months_in_service',
        'odometer',
        'odometer_date',
        'original_in_service_date',
        'plb_flag',
        'sub_contract_id',
        'telematics_flag',
        'title_location',
        'vehicle_cap_cost',
        'vehicle_category',
        'vehicle_color',
        'vehicle_engine',
        'vehicle_make',
        'vehicle_model',
        'vehicle_model_code',
        'vehicle_policy',
        'vehicle_tank_capacity',
        'vin'
        // ,...
      ]
    },
    // Datatable contains these headers.
    headers () {
      return [
        {
          text: this.$i18n.t('vehicle_number'),
          value: 'vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_vehicle_number'),
          value: 'client_vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('bill_sort'),
          value: 'bill_sort',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('center_code'),
          value: 'center_code',
          class: 'report-column',
          divider: true,
          filter: (value) => {
            if (!this.centers_selected || this.centers_selected.length === 0) {
              // no centers selected, don't filter anything
              return true
            }
            return this.centers_selected.find(center => center.center_code === value)
          }
        },
        {
          text: this.$i18n.t('center_name'),
          value: 'center_name',
          class: 'report-column',
          divider: true,
          width: 300
        },
        {
          text: this.$i18n.t('client_use_1'),
          value: 'client_use_1',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_use_2'),
          value: 'client_use_2',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_use_3'),
          value: 'client_use_3',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_use_4'),
          value: 'client_use_4',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_use_5'),
          value: 'client_use_5',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('contract_description'),
          value: 'contract_description',
          class: 'report-column',
          width: 300,
          divider: true
        },
        {
          text: this.$i18n.t('contract_id'),
          value: 'contract_id',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('coupon_book_number'),
          value: 'coupon_book_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('customer_number'),
          value: 'customer_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_address_1'),
          value: 'driver_address_1',
          class: 'report-column',
          width: 250,
          divider: true
        },
        {
          text: this.$i18n.t('driver_address_2'),
          value: 'driver_address_2',
          class: 'report-column',
          width: 250,
          divider: true
        },
        {
          text: this.$i18n.t('driver_city'),
          value: 'driver_city',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('driver_county'),
          value: 'driver_county',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('driver_email_address'),
          value: 'driver_email_address',
          class: 'report-column',
          width: 225,
          divider: true
        },
        {
          text: this.$i18n.t('driver_employee_id'),
          value: 'driver_employee_id',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_fax'),
          value: 'driver_fax',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('driver_first_name'),
          value: 'driver_first_name',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('driver_last_name'),
          value: 'driver_last_name',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('driver_mobile'),
          value: 'driver_mobile',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('driver_phone'),
          value: 'driver_phone',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('driver_reference_number'),
          value: 'driver_reference_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_state_province'),
          value: 'driver_state_province',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('fuel_card_description'),
          value: 'fuel_card_description',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('fuel_profile_limits'),
          value: 'fuel_profile_limits',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('in_service_date'),
          value: 'in_service_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('irs_fair_market_value'),
          value: 'irs_fair_market_value',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('lease_rate_id'),
          value: 'lease_rate_id',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('license_plate_expiration_date'),
          value: 'license_plate_expiration_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('license_plate_number'),
          value: 'license_plate_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('license_plate_state_province'),
          value: 'license_plate_state_province',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('license_plate_type'),
          value: 'license_plate_type',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('life_months_in_service'),
          value: 'life_months_in_service',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('model_year'),
          value: 'model_year',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('months_in_service'),
          value: 'months_in_service',
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
          text: this.$i18n.t('odometer_date'),
          value: 'odometer_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('original_in_service_date'),
          value: 'original_in_service_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('plb_flag'),
          value: 'plb_flag',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('sub_contract_id'),
          value: 'sub_contract_id',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('telematics_flag'),
          value: 'telematics_flag',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('title_location'),
          value: 'title_location',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_cap_cost'),
          value: 'vehicle_cap_cost',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_category'),
          value: 'vehicle_category',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_color'),
          value: 'vehicle_color',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_engine'),
          value: 'vehicle_engine',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_make'),
          value: 'vehicle_make',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_model'),
          value: 'vehicle_model',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_model_code'),
          value: 'vehicle_model_code',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_policy'),
          value: 'vehicle_policy',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_tank_capacity'),
          value: 'vehicle_tank_capacity',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vin'),
          value: 'vin',
          class: 'report-column'
        }
      ]
    },
    title: vm => vm.$i18n.t('inventory_report')
  },
  async asyncData ({ store }) {
    // Fetch report data
    await store.dispatch('reports/fetchInventoryReport')
    return {
      centers_dialog: false,
      centers_selected: [],
      panels_expanded: [0],
      search: '',
      search_centers: ''
    }
  },
  methods: {
    dialTo,
    emailTo
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: this.title }
      ]
    }
  }
}
</script>
