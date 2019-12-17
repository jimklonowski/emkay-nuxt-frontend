<template>
  <v-card outlined shaped>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar @click.stop="editVehicle" tile size="32" class="d-flex flex-column" style="cursor:pointer;">
          <v-icon>mdi-car-info</v-icon>
          <p class="ma-0 overline">
            {{ $t('edit') }}
          </p>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="body-1">
            <span class="font-weight-bold">{{ vehicle_info.vehicle_number || '&nbsp;' }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              {{ colorYearMakeModel || '&nbsp;' }}
            </p>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              {{ vehicle_info.exterior_color || '&nbsp;' }}
            </p>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>{{ $t('vehicle_#') }}</v-list-item-action-text>
          <v-chip :title="$t('vehicle_number')" pill outlined x-small>
            {{ vehicle_info.vehicle_number }}
            <!-- {{ $route.params.vehicle }} -->
          </v-chip>
          <v-chip v-if="vehicle_info.client_vehicle_number" :title="$t('client_vehicle_number')" pill outlined x-small>
            {{ vehicle_info.client_vehicle_number || '&nbsp;' }}
          </v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-card-title>

    <v-divider />

    <v-card-text>
      <v-row no-gutters>
        <v-col cols="6" sm="6">
          <v-list class="text-left">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-car-key</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle_info.vehicle_number || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('vehicle_number') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-car</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle_info.client_vehicle_number || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('client_vehicle_number') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bus-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle_info.category || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('vehicle_category') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="6" sm="6">
          <v-list class="text-left">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-label</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle_info.vin || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('vin') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-card-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicle_info.bill_sort || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('bill_sort') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ vehicleCenter || '&nbsp;' }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('center') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="showTabs = !showTabs" text small>
        {{ showTabs ? $t('less') : $t('details') }}
        <v-icon v-text="showTabs ? `mdi-chevron-up` : `mdi-chevron-down`" class="ml-2" />
      </v-btn>
    </v-card-actions>
    <v-card-text v-show="showTabs">
      <v-tabs
        v-model="tab"
        slider-size="3"
        show-arrows
        grow
      >
        <v-tab v-for="(category, c) in tabs" :key="`tab${c}`" class="overline">
          {{ $t(category.key) }}
        </v-tab>
      </v-tabs>
      <v-divider />
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(category, c) in tabs" :key="`tabitem${c}`">
          <v-row no-gutters>
            <v-col v-for="(item, i) in category.items" :key="`item${i}`" cols="6">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="item.icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="body-2">
                    {{ item.value || 'N/A' }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="caption">
                    {{ item.text }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer />
            <client-only>
              <v-btn
                v-for="(action, a) in category.actions"
                :key="a"
                :to="action.to"
                v-text="$t(action.key)"
                small
                text
                nuxt
              />
            </client-only>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import { formatCurrency } from '@/utility/helpers'

export default {
  data: () => ({
    showTabs: false,
    tab: 0
  }),
  computed: {
    custom_labels: vm => vm.$store.getters['account/getCustomLabels'],
    order_status: vm => vm.$store.getters['vehicle/getOrderStatus'],
    sale_info: vm => vm.$store.getters['vehicle/getSaleInfo'],
    vehicle_info: vm => vm.$store.getters['vehicle/getVehicleInfo'],
    vehicleCenter () {
      // Concatenate those that exist https://stackoverflow.com/a/19903063
      return [this.vehicle_info.center_name, this.vehicle_info.center_code].filter(Boolean).join(' - ')
    },
    colorYearMakeModel () {
      // return `${this.vehicle_info.vehicle_year} ${this.vehicle_info.vehicle_make} ${this.vehicle_info.vehicle_model}`
      return [this.vehicle_info.exterior_color, this.vehicle_info.year, this.vehicle_info.make, this.vehicle_info.model].filter(Boolean).join(' ')
    },
    tabs () {
      return [
        {
          key: 'licensing',
          icon: '',
          actions: [],
          items: [
            {
              text: this.$i18n.t(`license_plate_number`),
              icon: '',
              value: this.vehicle_info.license_plate_number
            },
            {
              text: this.$i18n.t(`license_plate_state_province`),
              icon: '',
              value: this.vehicle_info.license_plate_state_province
            },
            {
              text: this.$i18n.t(`license_plate_expiration_date`),
              icon: '',
              value: this.vehicle_info.license_plate_expiration_date
            }
          ]
        },
        {
          key: 'customization',
          icon: '',
          actions: [
            {
              key: 'edit_custom_labels',
              to: { path: `${this.$route.fullPath}/edit-custom-labels` }
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
          icon: '',
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
          icon: '',
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
          icon: '',
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
  },
  async created () {
    if (!this.custom_labels) {
      debugger
      await this.$store.dispatch('account/init')
    }
  },
  methods: {
    editVehicle () {
      this.$router.push({ path: `${this.$route.fullPath}/edit-vehicle` })
    }
  }
}
</script>

<style>

</style>
