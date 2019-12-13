<template>
  <v-card outlined shaped>
    <v-card-title>
      <v-list-item-content two-line>
        <p class="overline text--disabled">
          {{ $tc('date.past_days', days) }}
        </p>
        <v-list-item-title>
          {{ $t('vehicle.maintenance') }}
        </v-list-item-title>
        <v-list-item-subtitle class="caption">
          <nuxt-link :to="{ path: `${this.$route.fullPath}/maintenance` }" class="text-decoration-none">
            {{ $t('navigation.see_more') }}
          </nuxt-link>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('common.search')"
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
    <v-card-text>
      <v-skeleton-loader :loading="!initialized" type="table">
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :items-per-page="5"
          :sort-by="['service_date']"
          :sort-desc="true"
        >
          <!-- Format Date for locale -->
          <template #item.service_date="{ item }">
            {{ item.service_date | date }}
          </template>
          <!-- Decode html entities (&amp;) that might be in the description column -->
          <template #item.description="{ item }">
            <div v-html="item.description" />
          </template>
          <template #item.amount="{ item }">
            {{ item.amount | currency }}
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      days: 180,
      initialized: false,
      namespace: 'reports.expenses.maintenance_detail',
      search: ''
    }
  },
  computed: {
    error: vm => vm.$store.getters['vehicle/getMaintenanceError'],
    loading: vm => vm.$store.getters['vehicle/getMaintenanceLoading'],
    items: vm => vm.$store.getters['vehicle/getMaintenanceHistory'],
    vehicleNumber: vm => vm.$store.getters['vehicle/getVehicleNumber'],
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
      return this.columns.map((column) => {
        return {
          text: this.$i18n.t(`${this.namespace}.${column}`),
          value: column,
          class: 'report-column'
        }
      })
    }
  },
  async mounted () {
    const vehicle_number = this.vehicleNumber
    const end_date = this.$moment().format('YYYY-MM-DD')
    const start_date = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    const use_bill_date = false
    const filters = {
      command: 'MAINTHISTORY',
      customer: 'EM102',
      vehicle_number,
      start_date,
      end_date,
      use_bill_date,
      json: 'Y'
    }
    await this.$store.dispatch('vehicle/fetchMaintenanceHistory', filters)
    this.initialized = true
  }
}
</script>

<style>

</style>
