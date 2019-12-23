<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-btn :to="localePath({ path: `/vehicle/${$route.params.vehicle}` })" exact nuxt text>
          <v-icon class="mr-2">
            mdi-chevron-left
          </v-icon>
          {{ $t('to_vehicle_dashboard') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined shaped>
          <v-card-title>
            <v-list-item-content>
              <p class="overline text--disabled">
                {{ $route.params.vehicle }}
              </p>
              <v-list-item-title>
                {{ $t('maintenance') }}
              </v-list-item-title>
            </v-list-item-content>
            <v-spacer />
            <v-text-field
              v-model="search"
              :label="$t('search')"
              clearable
              dense
              flat
              hide-details
              outlined
              prepend-inner-icon="mdi-magnify"
              rounded
              solo
              single-line
            />
          </v-card-title>
          <v-card-actions>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
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
                      <v-btn @click="$refs.start_menu.save(start_date), updateFilters()" text>
                        {{ $t('ok') }}
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="6">
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
                      <v-btn @click="$refs.end_menu.save(end_date), updateFilters()" text>
                        {{ $t('ok') }}
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
          <v-card-text class="px-0">
            <v-data-table
              :loading="loading"
              :headers="headers"
              :items="rows"
              :sort-by="['service_date']"
              :sort-desc="true"
              :items-per-page="15"
              :search="search"
              class="striped"
            >
              <template #top>
                <v-container>
                  <v-row no-gutters>
                    <v-spacer />
                    <v-col cols="auto">
                      <v-btn :ripple="{ class: 'amber--text' }" :title="`${$t('save')} .xls`" small depressed>
                        <v-icon small class="mr-2">
                          mdi-cloud-download
                        </v-icon>
                        <client-only>
                          <download-excel v-t="'download'" :fields="downloadHeaders" :data="rows" />
                        </client-only>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </template>

              <template #progress>
                <v-overlay :opacity="0.69" absolute>
                  <span>{{ $t('loading') }}</span>
                  <v-progress-linear
                    :buffer-value="0"
                    :value="0"
                    color="amber"
                    height="6"
                    rounded
                    stream
                  />
                </v-overlay>
              </template>

              <template #body="{ items }">
                <tbody>
                  <tr v-for="(item, key) in items" :key="key">
                    <td>{{ item.service_date | date }}</td>
                    <td>{{ item.vendor_name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.maintenance_category }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.amount | currency }}</td>
                  </tr>
                </tbody>
              </template>
              <!-- No Results (search) -->
              <template #no-results>
                <div class="text-left">
                  {{ $t('no_search_results', { 'query': search }) }}
                </div>
              </template>
              <template #no-data>
                asdf
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { SnotifyPosition } from 'vue-snotify'
export default {
  name: 'Maintenance',
  data () {
    return {
      end_menu: false,
      start_menu: false,
      search: ''
    }
  },
  computed: {
    downloadHeaders: vm => (Object.assign({}, ...vm.columns.map(column => ({ [vm.$i18n.t(column)]: column })))),
    error: vm => vm.$store.getters['vehicle/getMaintenanceError'],
    loading: vm => vm.$store.getters['vehicle/getMaintenanceLoading'],
    // rows: vm => vm.$store.getters['vehicle/getMaintenanceHistory'],
    columns () {
      return [
        'service_date',
        'vendor_name',
        'description',
        'maintenance_category',
        'quantity',
        'amount'
      ]
    },
    headers () {
      return this.columns.map((column, index) => {
        return {
          text: this.$i18n.t(column),
          value: column,
          class: 'report-column'
        }
      })
    }
  },
  watch: {
    error () {
      if (this.error) {
        this.$snotify.error(this.error, 'Error', { position: SnotifyPosition.centerBottom })
      }
    }
  },
  async asyncData ({ $moment, params, query, store, error }) {
    const report_length = 90
    const start_date = query.start_date || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end_date = query.end_date || $moment().format('YYYY-MM-DD')

    const filters = {
      command: 'MAINTHISTORY',
      customer: 'EM102',
      vehicle_number: params.vehicle,
      start_date,
      end_date,
      json: 'Y'
    }
    await store.dispatch('vehicle/fetchMaintenanceHistory', filters)

    return {
      rows: store.getters['vehicle/getMaintenanceHistory'],
      report_length,
      ...filters
    }
  },
  mounted () {
    if (this.error) {
      if (process.browser) {
        this.$snotify.error(this.error, 'Error', { position: SnotifyPosition.centerBottom })
      } else {
        console.log(this.error)
      }
    }
  },
  head () {
    const title = `${this.$t('maintenance')} - ${this.$route.params.vehicle}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  methods: {
    updateFilters () {
      this.$router.push({ query: { start_date: this.start_date, end_date: this.end_date } })
    }
  },
  watchQuery: ['start_date', 'end_date']
}
</script>
