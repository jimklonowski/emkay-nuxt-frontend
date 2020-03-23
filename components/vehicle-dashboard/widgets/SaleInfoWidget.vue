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

    <!-- Sale Info -->
    <v-card-text v-if="hasSaleInfo">
      {{ sale_info }}
    </v-card-text>
    <v-card-text v-else>
      No sale info found.
    </v-card-text>
    <!-- <v-card-actions /> -->
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: vm => ({
    icon: 'mdi-cash-register',
    menu: false,
    title: vm.$i18n.t('sale_info')
  }),
  computed: {
    ...mapGetters({
      hasSaleInfo: 'vehicle-dashboard/hasSaleInfo',
      sale_info: 'vehicle-dashboard/getSaleInfo',
      vehicle_number: 'vehicle-dashboard/getVehicleNumber'
    }),
    actions () {
      return [
        {
          text: this.$i18n.t('sale_info'),
          icon: this.icon,
          to: this.saleInfoRoute
        }
      ]
    },
    saleInfoRoute: vm => vm.localePath({ path: `/vehicle/${vm.vehicle_number}/sale-info` })
  }
}
</script>
