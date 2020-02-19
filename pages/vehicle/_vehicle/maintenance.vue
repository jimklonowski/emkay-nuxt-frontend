<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined tile>
          <v-toolbar height="72" tile flat color="transparent">
            <v-tabs
              centered
              grow
              icons-and-text
              optional
              show-arrows
            >
              <v-tab :to="maintenanceRoute" nuxt>
                {{ $t('maintenance_history') }}
                <v-icon v-text="'mdi-tools'" />
              </v-tab>
              <v-tab :to="maintenanceCpmRoute" exact nuxt>
                {{ $t('cpm') }}
                <v-icon v-text="'mdi-cash'" />
              </v-tab>
              <v-tab :to="maintenanceCostContainmentRoute" exact nuxt>
                {{ $t('cost_containment') }}
                <v-icon v-text="'mdi-cash-refund'" />
              </v-tab>
              <v-tab :to="evoucherRoute" exact nuxt>
                {{ $t('evoucher') }}
                <v-icon v-text="'mdi-ticket-confirmation'" />
              </v-tab>
            </v-tabs>
          </v-toolbar>
          <nuxt-child />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VehicleMaintenance',
  computed: {
    ...mapGetters({
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    evoucherRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/maintenance/evoucher` }),
    maintenanceRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/maintenance` }),
    maintenanceCpmRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/maintenance/cpm` }),
    maintenanceCostContainmentRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/maintenance/cost-containment` })
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$i18n.t('cpm')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
