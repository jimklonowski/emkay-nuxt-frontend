<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn :to="vehicleRoute" exact nuxt text>
          <v-icon v-text="'mdi-chevron-left'" class="mr-2" />
          {{ $t('to_vehicle_dashboard') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <fuel-card-list />
      </v-col>
      <v-col cols="12" md="6">
        <fuel-authorization-profiles />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined shaped>
          <v-toolbar flat>
            <v-toolbar-title class="hidden-sm-and-down">
              {{ $t('fuel_purchases') }}
              <span v-text="$route.params.vehicle" class="overline text--disabled" />
            </v-toolbar-title>
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
          <v-container>
            <v-subheader class="overline">
              {{ $t('report_filters') }}
            </v-subheader>
            <v-row>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="start_menu"
                  v-model="start_menu"
                  :close-on-content-click="false"
                  :return-value.sync="start_date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      v-model="start_date"
                      :label="$t('start_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="start_date"
                    :locale="$i18n.locale"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn @click="start_menu = false" text>
                      {{ $t('cancel') }}
                    </v-btn>
                    <v-btn @click="$refs.start_menu.save(start_date), updateQuery()" text>
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
                  :return-value.sync="end_date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      v-model="end_date"
                      :label="$t('end_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="end_date"
                    :locale="$i18n.locale"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn @click="end_menu = false" text>
                      {{ $t('cancel') }}
                    </v-btn>
                    <v-btn @click="$refs.end_menu.save(end_date), updateQuery()" text>
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
                  hint="Not Yet Implemented.."
                  messages="Not Yet Implemented.."
                />
              </v-col>
            </v-row>
          </v-container>
          <!-- Download as XLS Button -->
          <v-toolbar flat>
            <v-spacer />
            <v-btn :title="`${$t('save')} .xls`" small depressed>
              <v-icon v-text="'mdi-cloud-download'" small class="mr-2" />
              <client-only>
                <download-excel v-t="'download'" :fields="downloadFields" :data="items" />
              </client-only>
            </v-btn>
          </v-toolbar>
          <v-card-text class="px-0">
            <v-skeleton-loader :loading="loading" type="table">
              <v-data-table
                :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100] }"
                :headers="headers"
                :items="items"
                :items-per-page="15"
                :loading="loading"
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

                <!-- Configure each #item row is rendered -->
                <template #item="{ item }">
                  <tr>
                    <td>{{ item.service_date | date }}</td>
                    <td>{{ item.bill_date | date }}</td>
                    <td>{{ item.fuel_company_name }}</td>
                    <td>
                      <client-only>
                        <v-chip :outlined="$vuetify.theme.dark" v-text="item.product_type" small />
                      </client-only>
                    </td>
                    <td>{{ item.unit_price | currency(3,3) }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.amount | currency }}</td>
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
import { downloadFields, headers } from '@/mixins/datatables'
import { updateQuery, vehicleRoute } from '@/mixins/routing'
import FuelAuthorizationProfiles from '@/components/vehicle/fuel/FuelAuthorizationProfiles'
import FuelCardList from '@/components/vehicle/fuel/FuelCardList'
export default {
  name: 'Fuel',
  components: {
    FuelAuthorizationProfiles,
    FuelCardList
  },
  mixins: [downloadFields, headers, updateQuery, vehicleRoute],
  data () {
    return {
      end_menu: false,
      start_menu: false,
      search: ''
    }
  },
  computed: {
    columns () {
      return [
        'service_date',
        'bill_date',
        'fuel_company_name',
        'product_type',
        'unit_price',
        'quantity',
        'amount'
      ]
    },
    error: vm => vm.$store.getters['vehicle/getFuelError'],
    items: vm => vm.$store.getters['vehicle/getFuelHistory'],
    loading: vm => vm.$store.getters['vehicle/getFuelLoading'],
    query () {
      const query = {
        start_date: this.start_date,
        end_date: this.end_date,
        use_bill_date: this.use_bill_date
      }
      return query
    }
  },
  async asyncData ({ $moment, params, query, store, error }) {
    const report_length = 30
    const start_date = query.start_date || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end_date = query.end_date || $moment().format('YYYY-MM-DD')
    const use_bill_date = query.use_bill_date || false

    const filters = {
      command: 'FUEL',
      customer: 'EM102',
      start_date,
      end_date,
      use_bill_date,
      vehicle_number: params.vehicle,
      json: 'Y'
    }
    await store.dispatch('vehicle/fetchFuelHistory', filters)

    return { start_date, end_date, use_bill_date }
  },
  head () {
    const title = `${this.$route.params.vehicle} - ${this.$t('fuel')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  watchQuery: ['start_date', 'end_date', 'use_bill_date']
}
</script>
