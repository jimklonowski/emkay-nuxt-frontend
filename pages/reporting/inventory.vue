<template>
  <v-container>
    <v-banner single-line>
      TODO: INCOMPLETE
    </v-banner>
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
          <!-- Report Filters -->
          <v-container>
            <v-subheader v-text="$t('report_filters')" class="overline" />
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
                      :value="$moment(start_date).format('L')"
                      :label="$t('start_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="start_date"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn v-text="$t('cancel')" @click="start_menu = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.start_menu.save(start_date), updateQuery()" text />
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
                      :value="$moment(end_date).format('L')"
                      :label="$t('end_date')"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="end_date"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn v-text="$t('cancel')" @click="end_menu = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.end_menu.save(end_date), updateQuery()" text />
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
          <!-- Report Content -->
          <v-card-text class="px-0">
            <v-skeleton-loader :loading="loading" type="table">
              <v-data-table
                :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100] }"
                :headers="headers"
                :items="items"
                :items-per-page="10"
                :loading="loading"
                :search="search"
                :sort-by="['toll_date']"
                :sort-desc="[true]"
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

                <!-- Configure how each #item row is rendered -->
                <template #item="{ item }">
                  {{ item }}
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
import { updateQuery } from '@/mixins/routing'
/**
 * Inventory Report (vehicle audit report)
 */
export default {
  name: 'Inventory',
  mixins: [downloadFields, headers, updateQuery],
  data (context) {
    return {
      search: '',
      end_menu: false,
      start_menu: false
    }
  },
  computed: {
    columns () {
      return [
        'vehicle_number'
        // ,...
      ]
    },
    items: vm => vm.$store.getters['reports/getData'],
    error: vm => vm.$store.getters['reports/getError'],
    loading: vm => vm.$store.getters['reports/getLoading'],
    query () {
      const query = {
        start_date: this.start_date,
        end_date: this.end_date
      }
      return query
    }
  },
  async asyncData ({ $moment, query, store, error }) {
    const report_length = 30
    const start_date = query.start_date || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end_date = query.end_date || $moment().format('YYYY-MM-DD')

    const filters = {
      command: 'INVENTORY',
      customer: 'EM102',
      start_date,
      end_date,
      json: 'Y'
    }

    // Fetch report data
    await store.dispatch('reports/fetchData', filters)

    // Return report params
    return { end_date, start_date }
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
  },
  watchQuery: ['start_date', 'end_date']
}
</script>
