<template>
  <v-card outlined class="vehicle-widget">
    <!-- Title Toolbar and Dropdown Menu -->
    <v-card-title class="pa-0">
      <v-toolbar flat>
        <v-avatar class="mr-2" size="36">
          <v-icon v-text="'mdi-shield-car'" color="grey" />
        </v-avatar>
        <v-toolbar-title>
          {{ $t('violations') }}
        </v-toolbar-title>
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
          :dense="!!items.length"
          :headers="headers"
          :hide-default-footer="true"
          :items="items"
          :items-per-page="pagination.itemsPerPage"
          :loading="loading"
          :mobile-breakpoint="0"
          :page.sync="pagination.page"
          :sort-by="['date']"
          :sort-desc="[true]"
          @page-count="pagination.pageCount = $event"
          class="striped"
        />
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
            v-text="period"
            small
            text
          />
        </v-btn-toggle>
        <span class="caption">{{ $t('days') }}</span>
      </div>
      <v-pagination
        v-show="items.length"
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
      items: 'vehicle/getViolationHistory',
      loading: 'vehicle/getViolationsLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    actions () {
      return [
        {
          text: this.$i18n.t('violation_history'),
          icon: 'mdi-shield-car',
          to: this.violationsRoute
        }
      ]
    },
    columns () {
      return [
        'date',
        'location',
        'details',
        'in_network',
        'amount'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('date'),
          value: 'date',
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
          text: this.$i18n.t('details'),
          value: 'details',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('in_network'),
          value: 'in_network',
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
    violationsRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/violations` })
  },
  watch: {
    /**
     * When the 'days' variable changes, re-fetch data.
     */
    async days () {
      await this.populateWidget()
    }
  },
  /**
   * Fetch Violation Data when widget is mounted
   */
  async mounted () {
    await this.populateWidget()
  },
  methods: {
    async populateWidget () {
      const vehicle = this.vehicleNumber
      const start = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
      const end = this.$moment().format('YYYY-MM-DD')
      await this.$store.dispatch('vehicle/fetchViolationHistory', { start, end, vehicle })
      this.initialized = true
    }
  }
}
</script>
