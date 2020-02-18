<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined class="report">
          <v-card-title>
            {{ $t('saferoads') }}
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
          <v-card-text class="pa-0">
            <v-skeleton-loader :loading="loading" type="table">
              <v-data-table
                :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
                :headers="headers"
                :items="items"
                :items-per-page="25"
                :loading="loading"
                :mobile-break-point="0"
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
  name: 'Saferoads',
  mixins: [downloadFields, updateQuery, vehicleRoute],
  computed: {
    ...mapGetters({
      error: 'saferoads/getError',
      items: 'saferoads/getData',
      loading: 'saferoads/getLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return []
    },
    headers () {
      return []
    },
    query () {
      return {
        start: this.start,
        end: this.end
      }
    }
  },
  async asyncData ({ $moment, params, query, store }) {
    const vehicle = store.getters['vehicle/getVehicleNumber']
    const report_length = 30
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')
    // Fetch saferoads report data
    await store.dispatch('saferoads/fetchData', { start, end, vehicle })
    return { start, end }
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$t('saferoads')}`
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
