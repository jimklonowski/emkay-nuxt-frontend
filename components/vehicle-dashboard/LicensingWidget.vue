<template>
  <v-card outlined class="vehicle-dashboard-widget">
    <!-- Toolbar -->
    <v-toolbar flat color="transparent">
      <v-avatar class="mr-2" size="36">
        <v-icon v-text="icon" color="grey" />
      </v-avatar>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <!-- Dropdown Menu -->
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
            <v-list-item v-for="(action, a) in actions" :key="`action-${a}`" :to="action.to" link>
              <v-list-item-action>
                <v-icon v-text="action.icon" />
              </v-list-item-action>
              <v-list-item-title v-text="action.text" />
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-divider />

    <!-- Licensing Datatable -->
    <v-skeleton-loader :loading="!initialized" :types="{ 'table-tbody': 'table-row-divider@3' }" type="table-thead, table-tbody, table-tfoot">
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
        <!-- Configure formatting of column data -->
        <template #item.expiration_date="{ item }">
          {{ item.expiration_date | date }}
        </template>
      </v-data-table>
    </v-skeleton-loader>
    <v-divider />

    <!-- Report Length & Pagination -->
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
      <span v-text="$t('days')" class="caption mx-2" />
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
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    days: 60,
    icon: 'mdi-smart-card',
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
      items: 'vehicle-dashboard/getLicensingHistory',
      loading: 'vehicle-dashboard/getLicensingLoading',
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
    }),
    /**
     * Dropdown menu actions
     */
    actions () {
      return [
        {
          text: this.$i18n.t('licensing_history'),
          icon: this.icon,
          to: this.licensingRoute
        }
      ]
    },
    /**
     * Datatable columns
     */
    columns () {
      return [
        'expiration_date',
        'license_plate_number',
        'license_plate_state_province',
        'sticker_number',
        'title',
        'status'
      ]
    },
    /**
     * Datatable headers
     */
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
          class: 'report-column'
        }
      ]
    },
    title: vm => vm.$i18n.t('licensing'),
    start_date: vm => vm.$moment().subtract(vm.days, 'days').format('YYYY-MM-DD'),
    end_date: vm => vm.$moment().format('YYYY-MM-DD'),
    licensingRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/licensing`, query: { start: vm.start_date, end: vm.end_date } })
  },
  watch: {
    /**
     * Watch 'days' variable for changes, then re-fetch data.
     */
    async days () {
      await this.populateWidget()
    }
  },
  /**
   * Fetch Licensing Data when widget is mounted.
   */
  async mounted () {
    await this.populateWidget()
  },
  methods: {
    /**
     * Vuex Actions
     */
    ...mapActions({
      populate: 'vehicle-dashboard/fetchLicensingHistory'
    }),
    /**
     * Populate widget and toggle initialized status while data is fetched.
     */
    async populateWidget () {
      // this.initialized = false
      await this.populate({
        start: this.start_date,
        end: this.end_date,
        vehicle: this.vehicle_number
      })
      this.initialized = true
    }
  }
}
</script>
