<template>
  <v-card outlined class="vehicle-widget">
    <!-- Title Toolbar and Dropdown Menu -->
    <v-toolbar flat color="transparent">
      <v-avatar class="mr-2" size="36">
        <v-icon v-text="'mdi-cash-usd-outline'" />
      </v-avatar>
      <v-toolbar-title>
        {{ $t('billing') }}
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
        :sort-by="['invoice_number']"
        :sort-desc="[true]"
        @page-count="pagination.pageCount = $event"
        class="striped"
      >
        <!-- Configure individual column rendering -->
        <template #item.invoice_number="{ item }">
          <nuxt-link :to="invoiceRoute(item.invoice_number)" class="text-decoration-none">
            {{ item.invoice_number }}
          </nuxt-link>
        </template>

        <template #item.bill_date="{ item }">
          {{ item.bill_date | date('YYYY-MM', 'MM/YYYY') }}
        </template>

        <template #item.bill_for_date="{ item }">
          {{ item.bill_for_date | date('YYYY-MM', 'MM/YYYY') }}
        </template>

        <template #item.amount="{ item }">
          {{ item.amount | currency }}
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
      items: 'vehicle/getBillingHistory',
      loading: 'vehicle/getBillingLoading',
      vehicle_number: 'vehicle/getVehicleNumber',
      vehicle_details: 'vehicle/getVehicleDetails'
    }),
    actions () {
      return [
        {
          text: this.$i18n.t('billing_history'),
          icon: 'mdi-cash-usd-outline',
          to: this.billingRoute
        }
      ]
    },
    /**
     * Datatable columns/keys (only used for downloading csv)
     */
    columns () {
      return [
        'invoice_number',
        'description',
        'bill_date',
        'bill_for_date',
        'amount'
      ]
    },
    /**
     * Datatable headers
     */
    headers () {
      return [
        {
          text: this.$i18n.t('invoice_number'),
          value: 'invoice_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('description'),
          value: 'description',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('bill_date'),
          value: 'bill_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('bill_for_date'),
          value: 'bill_for_date',
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
    start_date: vm => vm.$moment().subtract(vm.days, 'days').format('YYYY-MM-DD'),
    end_date: vm => vm.$moment().format('YYYY-MM-DD'),
    billingRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/billing`, query: { start: vm.start_date, end: vm.end_date } })
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
   * Fetch Billing History when widget is mounted.
   */
  async mounted () {
    await this.populateWidget()
  },
  methods: {
    invoiceRoute (invoice) {
      // pass along the start and end dates, inferred from report length 'days', to be used by the billing page filters.
      return this.localePath({
        path: `/vehicle/${this.vehicle_number}/billing`,
        query: {
          start: this.start_date,
          end: this.end_date,
          invoice
        }
      })
    },
    async populateWidget () {
      await this.$store.dispatch('vehicle/fetchBillingHistory', {
        start: this.start_date,
        end: this.end_date,
        vehicle: this.vehicle_number
      })
      this.initialized = true
    }
  }
}
</script>
