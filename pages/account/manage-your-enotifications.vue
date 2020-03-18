<template>
  <v-card :loading="loading" outlined>
    <v-card-title class="font-lato">
      {{ $t('manage_your_enotifications') }}
      <v-spacer />
    </v-card-title>
    <v-divider />
    <v-tabs
      v-model="tab"
      background-color="transparent"
      elevation-4
      centered
      grow
      icons-and-text
      show-arrows
    >
      <v-tab v-for="(category, cat) in categories" :key="`${category}-${cat}-tab`">
        {{ category.text }}
        <v-icon v-text="category.icon" />
      </v-tab>
    </v-tabs>
    <v-divider />
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(category, cat) in categories" :key="`${category}-${cat}-content`">
        <v-simple-table :key="`${category.text}-${cat}`" dense>
          <template #default>
            <thead>
              <tr>
                <th v-for="(header, h) in headers" :key="`${header}-${h}`" v-text="header.text" :style="{ minWidth: header.width + 'px' }" />
              </tr>
            </thead>
            <tbody>
              <tr v-if="category.items.length === 0">
                <td>TODO</td>
              </tr>
              <tr v-for="(item, i) in category.items" :key="`${item.name}-${i}`">
                <td class="caption">
                  {{ item.name }}
                </td>
                <td>
                  <v-checkbox dense />
                </td>
                <td>
                  <v-checkbox dense />
                </td>
                <td>
                  <v-select
                    :items="days_of_week"
                    clearable
                    dense
                    outlined
                    hide-details
                  />
                </td>
                <td>
                  <v-select
                    :items="days_of_month"
                    clearable
                    dense
                    outlined
                    hide-details
                  />
                </td>
                <td>
                  <v-checkbox dense />
                </td>
                <td>
                  <v-checkbox dense />
                </td>
                <td>
                  <v-checkbox dense />
                </td>
                <td>
                  <v-checkbox dense />
                </td>
                <td>
                  <v-checkbox dense />
                </td>
                <td>
                  <v-checkbox dense />
                </td>
                <td>
                  <v-btn small icon>
                    <v-icon v-text="'mdi-dots-vertical'" />
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
    </v-tabs-items>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn @click="save" text color="primary darken-1">
        <v-icon v-text="'mdi-content-save'" class="mr-2" />
        {{ $t('save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ManageYourENotifications',
  data: () => ({
    tab: 0,
    loading: false,
    search: ''
  }),
  computed: {
    categories () {
      return [
        {
          text: this.$i18n.t('critical_alerts'),
          icon: 'mdi-bell-alert',
          items: [
            {
              name: this.$i18n.t('exceed_fillups_per_day')
            },
            {
              name: this.$i18n.t('exceed_maximum_fuel_purchase')
            },
            {
              name: this.$i18n.t('exceed_non_fuel_purchase_count')
            },
            {
              name: this.$i18n.t('exceed_non_fuel_purchase_amount')
            },
            {
              name: this.$i18n.t('exceed_oil_change_purchases')
            },
            {
              name: this.$i18n.t('exceed_premium_fuel_purchases')
            },
            {
              name: this.$i18n.t('oil_change_due')
            },
            {
              name: this.$i18n.t('over_tank_capacity')
            },
            {
              name: this.$i18n.t('plates_expired')
            },
            {
              name: this.$i18n.t('rental_exceeds_last_auth_date')
            },
            {
              name: this.$i18n.t('vehicle_exceeds_overall_lead')
            },
            {
              name: this.$i18n.t('vehicle_exceeds_manufacturers_lead')
            },
            {
              name: this.$i18n.t('vehicle_exceeds_unit_lead')
            }
          ]
        },
        {
          text: this.$i18n.t('accident'),
          icon: 'mdi-car-parking-lights',
          items: [
            {
              name: this.$i18n.t('claim_closed')
            },
            {
              name: this.$i18n.t('claim_opened')
            }
          ]
        },
        {
          text: this.$i18n.t('billing'),
          icon: 'mdi-cash-usd',
          items: [
            {
              name: this.$i18n.t('vehicle_on_billing')
            },
            {
              name: this.$i18n.t('vehicle_out_of_service')
            }
          ]
        },
        {
          text: this.$i18n.t('fuel'),
          icon: 'mdi-gas-station',
          items: [
            {
              name: this.$i18n.t('fuel_card_cancelled')
            },
            {
              name: this.$i18n.t('fuel_card_lost_stolen')
            },
            {
              name: this.$i18n.t('fuel_card_mailed')
            },
            {
              name: this.$i18n.t('fuel_card_ordered')
            },
            {
              name: this.$i18n.t('fuel_card_replaced')
            }
          ]
        },
        {
          text: this.$i18n.t('licensing'),
          icon: 'mdi-smart-card',
          items: [
            {
              name: this.$i18n.t('driver_contests_violation')
            },
            {
              name: this.$i18n.t('driver_paying_violation')
            },
            {
              name: this.$i18n.t('renewal_coming_due')
            },
            {
              name: this.$i18n.t('renewal_sent')
            },
            {
              name: this.$i18n.t('requirements_needed')
            },
            {
              name: this.$i18n.t('requirements_received')
            },
            {
              name: this.$i18n.t('state_transfer_completed')
            },
            {
              name: this.$i18n.t('state_transfer_initiated')
            },
            {
              name: this.$i18n.t('violation_received')
            }
          ]
        },
        {
          text: this.$i18n.t('maintenance'),
          icon: 'mdi-tools',
          items: [
            {
              name: this.$i18n.t('emergency_road_call_completed')
            },
            {
              name: this.$i18n.t('emergency_road_call_started')
            },
            {
              name: this.$i18n.t('maintenance_service_invoiced_over_90')
            },
            {
              name: this.$i18n.t('open_recall')
            },
            {
              name: this.$i18n.t('recall_satisfied')
            }
          ]
        },
        {
          text: this.$i18n.t('remarketing'),
          icon: 'mdi-point-of-sale',
          items: [
            {
              name: this.$i18n.t('vehicle_consigned')
            },
            {
              name: this.$i18n.t('vehicle_picked_up_for_auction')
            },
            {
              name: this.$i18n.t('vehicle_sold')
            }
          ]
        },
        {
          text: this.$i18n.t('rental'),
          icon: 'mdi-bus-clock',
          items: [
            {
              name: this.$i18n.t('rental_closed')
            },
            {
              name: this.$i18n.t('rental_open')
            }
          ]
        },
        {
          text: this.$i18n.t('vehicle_acquisitions'),
          icon: 'mdi-bus-multiple',
          items: [
            {
              name: this.$i18n.t('vehicle_delivered_to_dealer')
            },
            {
              name: this.$i18n.t('vehicle_picked_up_by_driver')
            },
            {
              name: this.$i18n.t('scheduled_build_date')
            },
            {
              name: this.$i18n.t('scheduled_production_date')
            },
            {
              name: this.$i18n.t('shipped_to_delivery_dealer')
            }
          ]
        }
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('name'),
          value: 'name',
          class: 'report-column',
          width: 300,
          divider: true
        },
        {
          text: this.$i18n.t('realtime'),
          value: 'client_email_rt',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('daily'),
          value: 'client_email_daily',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('weekly'),
          value: 'client_email_weekly',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('monthly'),
          value: 'client_email_monthly',
          class: 'report-column',
          width: 100,
          divider: true
        },
        {
          text: this.$i18n.t('texting'),
          value: 'client_text_rt',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('celsius'),
          value: 'client_celsius_rt',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('fleet_360'),
          value: 'client_fleet360_rt',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('emailing'),
          value: 'driver_email_rt',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('texting'),
          value: 'driver_text_rt',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_360'),
          value: 'driver_driver360_rt',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('exceptions'),
          value: 'exceptions',
          class: 'report-column',
          divider: true
        }
      ]
    },
    columns () {
      return [
        'name',
        'client_email_rt',
        'client_email_daily',
        'client_email_weekly',
        'client_email_monthly',
        'client_text_rt',
        'client_celsius_rt',
        'client_fleet360_rt',
        'driver_email_rt',
        'driver_text_rt',
        'driver_driver360_rt',
        'exceptions'
      ]
    },
    days_of_week () {
      return this.$moment.localeData('en').weekdays().map(x => {
        const key = x.toString().toLowerCase()
        return {
          text: this.$i18n.t(key),
          value: key
        }
      })
    },
    days_of_month () {
      // array [1, 2, ..., 31]
      return [...Array(31).keys()].map(x => x + 1)
    }
  },
  methods: {
    save () {
      const cat = this.categories[this.tab].text
      this.$snotify.info(`Saving ${cat}...`, 'todo')
    }
  },
  head () {
    const title = this.$t('manage_your_enotifications')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
