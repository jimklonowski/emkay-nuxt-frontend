<template>
  <v-card flat>
    <v-card-title class="font-lato" style="font-size:2rem;">
      {{ $t('critical_alerts') }}
    </v-card-title>
    <v-card-text class="row no-gutters">
      <v-col v-if="hasSelection" cols="12" sm="6" lg="4">
        <!-- eslint-disable-next-line -->
        <component :is="edit_form" @close-alert-form="selected = undefined" class="mt-6" />
      </v-col>
      <v-col :cols="12" :sm="hasSelection ? 6 : null" :lg="hasSelection ? 8 : null">
        <v-item-group v-model="selected">
          <v-container>
            <v-row>
              <v-col
                v-for="(item, i) in alert_types"
                :key="`col-${item}-${i}`"
                cols="12"
                md="6"
                lg="4"
              >
                <v-item #default="{ active, toggle }">
                  <v-hover #default="{ hover }">
                    <v-card
                      @click="toggle"
                      :color="active ? 'primary' : 'currentColor'"
                      :dark="active"
                      hover
                      outlined
                      tile
                    >
                      <v-card-title class="justify-center subtitle-1">
                        {{ $t(item.key) }}
                      </v-card-title>
                      <v-divider />
                      <v-card-text :class="active ? 'white--text' : (item.suppressed ? 'disabled--text' : 'primary--text')" class="display-2 text-center">
                        <v-fade-transition>
                          <v-overlay v-if="hover" :color="active ? 'white' : (item.suppressed ? 'grey lighten-1' : 'primary')" absolute>
                            <v-btn small>
                              {{ $t('configure') }}
                            </v-btn>
                          </v-overlay>
                        </v-fade-transition>
                        {{ item.value }}
                      </v-card-text>
                      <v-divider />
                      <v-card-actions class="justify-center overline">
                        {{ $t('critical_alert') }}
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CriticalAlerts',
  // components: { FuelCardMisuseAlertForm, PlateExpirationsAlertForm },
  data: () => ({
    selected: undefined
  }),
  computed: {
    alert_types () {
      return [
        { key: 'fuel_card_misuse', value: 264, suppressed: false, component: () => import(/* webpackChunkName: "CriticalAlertsForms" */ `@/components/account/critical-alerts/FuelCardMisuseAlertForm`) },
        { key: 'delayed_orders', value: 21, suppressed: false, component: () => import(/* webpackChunkName: "CriticalAlertsForms" */ `@/components/account/critical-alerts/DelayedOrdersAlertForm`) },
        { key: 'neglected_maintenance', value: 94, suppressed: false, component: () => import(/* webpackChunkName: "CriticalAlertsForms" */ `@/components/account/critical-alerts/NeglectedMaintenanceAlertForm`) },
        { key: 'plate_expirations', value: 10, suppressed: false, component: () => import(/* webpackChunkName: "CriticalAlertsForms" */ `@/components/account/critical-alerts/PlateExpirationsAlertForm`) },
        { key: 'overdue_rentals', value: 2, suppressed: true, component: () => import(/* webpackChunkName: "CriticalAlertsForms" */ `@/components/account/critical-alerts/OverdueRentalsAlertForm`) }
      ]
    },
    edit_form: vm => vm.alert_types[vm.selected].component,
    hasSelection: vm => vm.selected !== undefined
  },
  watch: {
    selected () {
      // console.log(this.selected)
    }
  },
  methods: {

  }
}
</script>
