<template>
  <v-card outlined shaped>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar @click="goToMaintenance" style="cursor:pointer;">
          <v-icon>mdi-tools</v-icon>
        </v-list-item-avatar>
        <v-list-item-content two-line>
          <p class="overline text--disabled">
            {{ $tc('past_days', days) }}
          </p>
          <v-list-item-title>
            {{ $t('maintenance') }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            <nuxt-link :to="maintenanceRoute" class="text-decoration-none">
              {{ $t('more') }}
            </nuxt-link>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :sort-by="['service_date']"
          :sort-desc="true"
          :hide-default-footer="items.length <= 5"
          dense
          class="striped"
        >
          <!-- Configure each #item row is rendered -->
          <template #item="{ item }">
            <tr>
              <td>{{ item.service_date | date }}</td>
              <td>{{ item.odometer }}</td>
              <td>{{ item.vendor_name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.amount | currency }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
    <v-card-actions />
  </v-card>
</template>

<script>
import { headers } from '@/mixins/datatables'
export default {
  mixins: [headers],
  data () {
    return {
      days: 30,
      initialized: false
    }
  },
  computed: {
    columns () {
      return [
        'service_date',
        'odometer',
        'vendor_name',
        'description',
        'amount'
      ]
    },
    items: vm => vm.$store.getters['vehicle/getMaintenanceHistory'],
    maintenanceRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/maintenance` })
  },
  async mounted () {
    const vehicle_number = this.$route.params.vehicle
    const end_date = this.$moment().format('YYYY-MM-DD')
    const start_date = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    const use_bill_date = false
    const filters = {
      command: 'MAINTHISTORY',
      customer: 'EM102',
      start_date,
      end_date,
      use_bill_date,
      vehicle_number,
      json: 'Y'
    }
    await this.$store.dispatch('vehicle/fetchMaintenanceHistory', filters)
    this.initialized = true
  },
  methods: {
    goToMaintenance () {
      this.$router.push(this.maintenanceRoute)
    }
  }
}
</script>
