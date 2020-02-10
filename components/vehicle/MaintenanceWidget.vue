<template>
  <v-card outlined>
    <v-toolbar flat>
      <v-avatar class="mr-2">
        <v-icon v-text="'mdi-tools'" />
      </v-avatar>
      <v-toolbar-title @click="$router.push(maintenanceRoute)" class="font-lato" style="cursor:pointer;">
        {{ $t('maintenance') }}
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
            <v-list-item :to="maintenanceRoute" link>
              <v-list-item-avatar>
                <v-icon v-text="'mdi-tools'" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="$t('maintenance_history')" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="evoucherRoute" link>
              <v-list-item-avatar>
                <v-icon v-text="'mdi-ticket-confirmation'" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="$t('evoucher')" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">
        <!-- :hide-default-footer="items.length <= 5" -->
        <v-data-table
          :dense="items && items.length !== 0"
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :mobile-breakpoint="0"
          :sort-by="['service_date']"
          :sort-desc="true"
          class="striped"
        >
          <!-- Configure individual column rendering -->
          <template #item.service_date="{ item }">
            {{ item.service_date | date }}
          </template>

          <template #item.amount="{ item }">
            {{ item.amount | currency }}
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
    <!-- <v-card-actions /> -->
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      days: 30,
      initialized: false,
      menu: false
    }
  },
  computed: {
    ...mapGetters({
      items: 'vehicle/getMaintenanceHistory',
      loading: 'vehicle/getMaintenanceLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return [
        'service_date',
        'odometer',
        'vendor_name',
        'description',
        'amount'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('service_date'),
          value: 'service_date',
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
          text: this.$i18n.t('vendor_name'),
          value: 'vendor_name',
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
          text: this.$i18n.t('amount'),
          value: 'amount',
          class: 'report-column'
        }
      ]
    },
    evoucherRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/evoucher` }),
    maintenanceRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/maintenance` })
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
   * Fetch Maintenance Data when widget is mounted
   */
  async mounted () {
    await this.populateWidget()
  },
  methods: {
    async populateWidget () {
      const vehicle = this.vehicle_number
      const end = this.$moment().format('YYYY-MM-DD')
      const start = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
      const use_bill_date = false
      await this.$store.dispatch('vehicle/fetchMaintenanceHistory', { start, end, use_bill_date, vehicle })
      this.initialized = true
    }
  }
}
</script>
