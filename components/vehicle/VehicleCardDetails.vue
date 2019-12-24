<template>
  <v-tabs
    v-model="tab"
    grow
    show-arrows
  >
    <v-tab v-for="(category, c) in tabs" :key="`tab${c}`">
      {{ $t(category.key) }}
      <!-- <v-icon v-text="`${category.icon}`" left /> -->
    </v-tab>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(category, c) in tabs" :key="`tabitem${c}`">
        <v-sheet color="transparent darken-1">
          <v-container>
            <v-row>
              <v-col v-for="(item, i) in category.items" :key="`item${i}`" cols="6" dense>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon v-text="item.icon" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="body-2">
                      {{ item.value }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      {{ item.text }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col v-for="(action, a) in category.actions" :key="a" cols="6" dense>
                <client-only>
                  <v-btn
                    :to="localePath(action.to)"
                    v-text="$t(action.key)"
                    small
                    text
                    nuxt
                  />
                </client-only>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import { formatCurrency } from '@/utility/helpers'

export default {
  data: () => ({
    tab: 0
  }),
  computed: {
    custom_labels: vm => vm.$store.getters['account/getCustomLabels'],
    order_status: vm => vm.$store.getters['vehicle/getOrderStatus'],
    sale_info: vm => vm.$store.getters['vehicle/getSaleInfo'],
    vehicle_info: vm => vm.$store.getters['vehicle/getVehicleInfo'],
    tabs () {
      return [
        {
          key: 'licensing',
          icon: 'mdi-account-card-details-outline',
          actions: [],
          items: [
            {
              text: this.$i18n.t(`license_plate_number`),
              icon: 'mdi-counter',
              value: this.vehicle_info.license_plate_number
            },
            {
              text: this.$i18n.t(`license_plate_state_province`),
              icon: 'mdi-map-marker',
              value: this.vehicle_info.license_plate_state_province
            },
            {
              text: this.$i18n.t(`license_plate_expiration_date`),
              icon: 'mdi-calendar-remove',
              value: this.$moment(this.vehicle_info.license_plate_expiration_date).format('L')
            }
          ]
        },
        {
          key: 'labels',
          icon: 'mdi-shape-outline',
          actions: [
            {
              key: 'edit_custom_labels',
              to: { path: `/vehicle/${this.$route.params.vehicle}/edit-custom-labels` }
            }
          ],
          items: [
            {
              text: this.custom_labels.client_use_1_label,
              icon: 'mdi-numeric-1-box',
              value: this.vehicle_info.client_use_1
            },
            {
              text: this.custom_labels.client_use_2_label,
              icon: 'mdi-numeric-2-box',
              value: this.vehicle_info.client_use_2
            },
            {
              text: this.custom_labels.client_use_3_label,
              icon: 'mdi-numeric-3-box',
              value: this.vehicle_info.client_use_3
            },
            {
              text: this.custom_labels.client_use_4_label,
              icon: 'mdi-numeric-4-box',
              value: this.vehicle_info.client_use_4
            },
            {
              text: this.custom_labels.client_use_5_label,
              icon: 'mdi-numeric-5-box',
              value: this.vehicle_info.client_use_5
            }
          ]
        },
        {
          key: 'order_status',
          icon: 'mdi-calendar-clock',
          actions: [],
          items: [
            {
              text: this.$i18n.t('delivery_date'),
              icon: 'mdi-calendar',
              value: this.$moment(this.order_status.delivery_date).format('L')
            }
          ]
        },
        {
          key: 'remarketing',
          icon: 'mdi-point-of-sale',
          actions: [],
          items: [
            {
              text: this.$i18n.t('sale_price'),
              icon: 'mdi-currency-usd',
              value: formatCurrency(this.sale_info.price)
            },
            {
              text: this.$i18n.t('sale_odometer'),
              icon: 'mdi-counter',
              value: this.$i18n.n(this.sale_info.odometer)
            }
          ]
        },
        {
          key: 'other',
          icon: 'mdi-information-outline',
          actions: [],
          items: [
            {
              text: this.$i18n.t('in_service_date'),
              icon: 'mdi-calendar-arrow-left',
              value: this.$moment(this.vehicle_info.in_service_date).format('L')
            },
            {
              text: this.$i18n.t('out_of_service_date'),
              icon: 'mdi-calendar-arrow-right',
              value: this.$moment(this.vehicle_info.out_of_service_date).format('L')
            },
            {
              text: this.$i18n.t('prior_vehicle_number'),
              icon: 'mdi-chevron-left-box-outline',
              value: this.vehicle_info.prior_vehicle_number
            },
            {
              text: this.$i18n.t('next_vehicle_number'),
              icon: 'mdi-chevron-right-box-outline',
              value: this.vehicle_info.next_vehicle_number
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>

</style>
