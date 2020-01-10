<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card shaped outlined>
          <v-toolbar flat>
            <v-toolbar-title v-text="$t('inventory_report')" class="hidden-sm-and-down" />
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
          </v-toolbar>
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
          <!-- Report Content -->
          <v-card-text class="px-0">
            <v-skeleton-loader :loading="loading" type="table">
              <v-data-table
                :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
                :headers="headers"
                :items="items"
                :items-per-page="-1"
                :loading="loading"
                :search="search"
                :sort-by="['vehicle_number']"
                :sort-desc="[false]"
                class="striped"
              >
                <!-- filters template -->
                <template #top>
                  <v-container>
                    <v-row>
                      <v-col cols="6">
                        <v-select
                          v-model="centerCodeFilterValue"
                          :items="centers"
                          label="Center Filter"
                          clearable
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
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
                <template #item="{ item }">
                  <tr>
                    <td>
                      <nuxt-link :title="$t(`to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" nuxt />
                    </td>
                    <!-- <td :style="{ 'border': !item.client_vehicle_number ? '1px solid red' : null }"> -->
                    <td>
                      {{ item.client_vehicle_number }}
                    </td>
                    <td>{{ item.bill_sort }}</td>
                    <td>{{ item.center_code }}</td>
                    <td v-html="item.center_name" />
                    <td>{{ item.client_use_1 }}</td>
                    <td>{{ item.client_use_2 }}</td>
                    <td>{{ item.client_use_3 }}</td>
                    <td>{{ item.client_use_4 }}</td>
                    <td>{{ item.client_use_5 }}</td>
                    <td>{{ item.contract_description }}</td>
                    <td>{{ item.contract_id }}</td>
                    <td>{{ item.coupon_book_number }}</td>
                    <td>{{ item.customer_number }}</td>
                    <td>{{ item.driver_address_1 }}</td>
                    <td>{{ item.driver_address_2 }}</td>
                    <td>{{ item.driver_city }}</td>
                    <td>{{ item.driver_county }}</td>
                    <td>{{ item.driver_email_address }}</td>
                    <td>{{ item.driver_employee_id }}</td>
                    <td>{{ item.driver_fax }}</td>
                    <td>{{ item.driver_first_name }}</td>
                    <td>{{ item.driver_last_name }}</td>
                    <td>{{ item.driver_mobile }}</td>
                    <td>{{ item.driver_phone }}</td>
                    <td>{{ item.driver_reference_number }}</td>
                    <td>{{ item.driver_state_province }}</td>
                    <td>{{ item.fuel_card_description }}</td>
                    <td>{{ item.fuel_profile_limits }}</td>
                    <td>{{ item.in_service_date | date }}</td>
                    <td>{{ item.irs_fair_market_value | currency }}</td>
                    <td>{{ item.lease_rate_id }}</td>
                    <td>{{ item.level_01 }}</td>
                    <td>{{ item.level_02 }}</td>
                    <td>{{ item.level_03 }}</td>
                    <td>{{ item.license_plate_expiration_date | date }}</td>
                    <td>{{ item.license_plate_number }}</td>
                    <td>{{ item.license_plate_state_province }}</td>
                    <td>{{ item.license_plate_type }}</td>
                    <td>{{ item.life_months_in_service }}</td>
                    <td>{{ item.model_year }}</td>
                    <td>{{ item.months_in_service }}</td>
                    <td>{{ item.odometer }}</td>
                    <td>{{ item.odometer_date | date }}</td>
                    <td>{{ item.original_in_service_date | date }}</td>
                    <td>{{ item.plb_flag }}</td>
                    <td>{{ item.sub_contract_id }}</td>
                    <td>{{ item.telematics_flag }}</td>
                    <td>{{ item.title_location }}</td>
                    <td>{{ item.vehicle_cap_cost | currency }}</td>
                    <td>{{ item.vehicle_category }}</td>
                    <td>{{ item.vehicle_color }}</td>
                    <td>{{ item.vehicle_engine }}</td>
                    <td>{{ item.vehicle_make }}</td>
                    <td>{{ item.vehicle_model }}</td>
                    <td>{{ item.vehicle_model_code }}</td>
                    <td>{{ item.vehicle_policy }}</td>
                    <td>{{ item.vehicle_tank_capacity | number }}</td>
                    <td>{{ item.vin }}</td>
                  </tr>
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
import { downloadFields } from '@/mixins/datatables'
/**
 * Inventory Report (vehicle audit report)
 */
export default {
  name: 'Inventory',
  mixins: [downloadFields],
  data: () => ({
    centerCodeFilterValue: null
  }),
  computed: {
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
    headers () {
      return [
        // {
        //   'text': 'string',
        //   'value': 'string',
        //   'align?': 'start' | 'center' | 'end',
        //   'sortable?': 'Boolean',
        //   'filterable?': 'Boolean',    // omit specific columns from text search
        //   'divider?': 'Boolean',
        //   'class?': 'string | string[]',
        //   'width?': 'string | number', // currently width defaults to 'auto'
        //   'filter?': '(value: any, search: string, item: any) => Boolean',
        //   'sort?': '(a: any, b: any) => Number'
        // },
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
          divider: true
        },
        {
          text: this.$i18n.t('center_code'),
          value: 'center_code',
          class: 'report-column',
          divider: true,
          filter: value => {
            if (!this.centerCodeFilterValue) { return true }
            return value.toLowerCase().includes(this.centerCodeFilterValue.toLowerCase())
          }
        },
        {
          text: this.$i18n.t('center_name'),
          value: 'center_name',
          class: 'report-column',
          divider: true,
          width: 250
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
          width: 250,
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
          divider: true
        },
        {
          text: this.$i18n.t('driver_phone'),
          value: 'driver_phone',
          class: 'report-column',
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
          text: this.$i18n.t('level_01'),
          value: 'level_01',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('level_02'),
          value: 'level_02',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('level_03'),
          value: 'level_03',
          class: 'report-column',
          width: 150,
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
          class: 'report-column',
          divider: true
        }
      ]
    },
    // headers (from mixin),
    items: vm => vm.$store.getters['reports/getData'],
    error: vm => vm.$store.getters['reports/getError'],
    loading: vm => vm.$store.getters['reports/getLoading'],
    centers: vm => vm.$store.getters['account/getCenters']
  },
  async asyncData ({ store }) {
    let search
    const filters = {
      command: 'VEHICLEAUDIT',
      customer: 'EM102',
      json: 'Y'
    }
    // Fetch report data
    await store.dispatch('reports/fetchData', filters)
    return { search }
  },
  head () {
    const title = this.$t('inventory_report')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  loading: true,
  validate ({ $moment, query }) {
    return true
  }
  // ,watchQuery: ['start_date', 'end_date']
}
</script>
