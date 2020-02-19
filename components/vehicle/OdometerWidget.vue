<template>
  <v-card outlined class="vehicle-widget">
    <!-- Title Toolbar and Dropdown Menu -->
    <v-toolbar flat color="transparent">
      <v-avatar class="mr-2" size="36">
        <v-icon v-text="'mdi-counter'" />
      </v-avatar>
      <v-toolbar-title>
        {{ $t('odometer') }}
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
          <v-list dense>
            <v-list-item :to="odometerRoute" link>
              <v-list-item-avatar>
                <v-icon v-text="'mdi-counter'" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="$t('odometer_history')" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>

    <v-divider />

    <!-- Datatable -->
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
        :sort-by="['odometer_date']"
        :sort-desc="true"
        @page-count="pagination.pageCount = $event"
        class="striped"
      >
        <template #item.date="{ item }">
          {{ item.date | date }}
        </template>
        <template #item.odometer="{ item }">
          {{ item.odometer | number }}
        </template>
      </v-data-table>
    </v-skeleton-loader>

    <v-divider />

    <!-- Report Length and Pagination -->
    <v-card-actions v-show="initialized" class="pager">
      <v-btn-toggle
        v-model="days"
        background-color="transparent"
        color="primary"
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
      <span class="caption mx-2">{{ $t('days') }}</span>

      <v-spacer />

      <v-pagination
        v-show="items && !!items.length"
        v-model="pagination.page"
        :length="pagination.pageCount"
        :total-visible="pagination.totalVisible"
        circle
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
      items: 'vehicle/getOdometerHistory',
      loading: 'vehicle/getOdometerLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    actions () {
      return [
        {
          text: this.$i18n.t('odometer_history'),
          icon: 'mdi-counter',
          to: this.odometerRoute
        }
      ]
    },
    columns () {
      return [
        'date',
        'odometer',
        'type'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('odometer_date'),
          value: 'date',
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
          text: this.$i18n.t('reading_type'),
          value: 'type',
          class: 'report-column'
        }
      ]
    },
    start_date: vm => vm.$moment().subtract(vm.days, 'days').format('YYYY-MM-DD'),
    end_date: vm => vm.$moment().format('YYYY-MM-DD'),
    odometerRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/odometer`, query: { start: vm.start_date, end: vm.end_date } })
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
   * Fetch Odometer Data when widget is mounted
   */
  async mounted () {
    await this.populateWidget()
  },
  methods: {
    async populateWidget () {
      await this.$store.dispatch('vehicle/fetchOdometerHistory', {
        start: this.start_date,
        end: this.end_date,
        vehicle: this.vehicle_number
      })
      this.initialized = true
    }
  }
}
</script>
