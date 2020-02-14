<template>
  <v-card outlined class="vehicle-widget">
    <!-- Title Toolbar and Dropdown Menu -->
    <v-card-title class="pa-0">
      <v-toolbar flat>
        <v-avatar class="mr-2" size="36">
          <v-icon v-text="'mdi-smart-card'" />
        </v-avatar>
        <v-toolbar-title v-text="$t('licensing')" />
        <v-spacer />
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          origin="top right"
          transition="scale-transition"
          left
        >
          <template #activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon v-text="'mdi-dots-vertical'" />
            </v-btn>
          </template>
          <v-card>
            <v-list nav dense>
              <v-list-item v-for="(action, index) in actions" :key="index" :to="action.to" link>
                <v-list-item-avatar>
                  <v-icon v-text="action.icon" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="action.text" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar>
    </v-card-title>
    <v-divider />
    <!-- Datatable -->
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">
        <v-data-table
          :dense="items && !!items.length"
          :headers="headers"
          :hide-default-footer="true"
          :items="items"
          :items-per-page="pagination.itemsPerPage"
          :loading="loading"
          :mobile-breakpoint="0"
          :page.sync="pagination.page"
          :sort-by="['expiration_date']"
          :sort-desc="[true]"
          @page-count="pagination.pageCount = $event"
          class="striped"
        >
          <template #item.expiration_date="{ item }">
            {{ item.expiration_date | date }}
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
    <v-divider />
    <!-- Report Length and Pagination -->
    <v-card-actions class="justify-space-between">
      <div>
        <v-btn-toggle
          v-model="days"
          mandatory
          rounded
          dense
        >
          <v-btn
            v-for="period in periods"
            :key="period"
            :value="period"
            small
            text
          >
            {{ period }}
          </v-btn>
        </v-btn-toggle>
        <span class="caption">{{ $t('days') }}</span>
      </div>
      <v-pagination
        v-show="items && !!items.length"
        v-model="pagination.page"
        :length="pagination.pageCount"
        :total-visible="pagination.totalVisible"
        circle
        color="grey lighten-1"
        style="width:auto;"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    days: 60,
    initialized: false,
    menu: false,
    pagination: {
      itemsPerPage: 5,
      page: 1,
      pageCount: 0,
      totalVisible: 5
    },
    periods: [30, 60, 90]
  }),
  computed: {
    /**
     * Vuex Getters
     */
    ...mapGetters({
      items: 'vehicle/getLicensingHistory',
      loading: 'vehicle/getLicensingLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    actions () {
      return [
        {
          text: this.$i18n.t('licensing_history'),
          icon: 'mdi-smart-card',
          to: this.licensingRoute
        }
      ]
    },
    columns () {
      return [
        'expiration_date',
        'license_plate_number',
        'license_plate_state_province',
        'sticker_number',
        'title',
        'status',
        'needs'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('expiration_date'),
          value: 'expiration_date',
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
          text: this.$i18n.t('sticker_number'),
          value: 'sticker_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('title'),
          value: 'title',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('status'),
          value: 'status',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('needs'),
          value: 'needs',
          class: 'report-column'
        }
      ]
    },
    licensingRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/licensing` })
  },
  watch: {
    /**
     * When the 'days' variable changes, re-fetch the data.
     */
    async days () {
      await this.populateWidget()
    }
  },
  /**
   * Fetch Licensing History when widget is mounted.
   */
  async mounted () {
    await this.populateWidget()
  },
  methods: {
    async populateWidget () {
      const vehicle = this.vehicle_number
      const end = this.$moment().format('YYYY-MM-DD')
      const start = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
      await this.$store.dispatch('vehicle/fetchLicensingHistory', { start, end, vehicle })
      this.initialized = true
    }
  }
}
</script>
