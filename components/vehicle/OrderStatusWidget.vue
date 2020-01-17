<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="orderStatusRoute" link>
        <v-list-item-avatar>
          <v-icon v-text="'mdi-timeline-clock'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="yearMakeModel()" class="overline" />
          <v-list-item-title v-text="$t('order_status')" />
          <client-only>
            <nuxt-link :to="orderStatusRoute" v-text="$t('more')" class="caption text-decoration-none" />
          </client-only>
        </v-list-item-content>
        <v-list-item-action v-if="orderStatus.factory_order_number">
          <v-list-item-action-text v-text="$t('factory_order_number')" class="caption" />
          <client-only>
            <v-chip v-text="orderStatus.factory_order_number" :title="$t('factory_order_number')" x-small />
          </client-only>
        </v-list-item-action>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-simple-table dense>
              <template #default>
                <tbody>
                  <tr v-for="(item, index) in orderDetails" :key="index">
                    <th v-text="item.text" class="text-right caption font-weight-bold" style="border:none;width:50%;" />
                    <td v-text="item.value" class="text-left caption font-weight-light" style="border:none;width:50%;" />
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12" md="6">
            <v-simple-table dense>
              <template #default>
                <tbody>
                  <tr>
                    <th v-text="$t('comments')" :style="{ width: $vuetify.breakpoint.smAndDown ? '50%' : 'auto', 'text-align': $vuetify.breakpoint.smAndDown ? 'right' : 'left' }" />
                    <td v-text="orderComments" :style="{ width: $vuetify.breakpoint.smAndDown ? '50%' : 'auto', 'text-align': $vuetify.breakpoint.smAndDown ? 'left' : 'left' }" />
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click="hideTimeline = !hideTimeline"
        block
        small
        text
      >
        <v-icon v-text="hideTimeline ? 'mdi-plus' : 'mdi-minus'" class="mr-2" />
        {{ hideTimeline ? $t('more') : $t('less') }}
      </v-btn>
    </v-card-actions>
    <v-card-text class="py-0">
      <v-timeline v-show="hideTimeline">
        <v-timeline-item
          v-for="(item, index) in orderTimelinePreview"
          :key="`preview${index}`"
          :icon="getIcon(item)"
          class="pb-0"
          small
          left
        >
          <div v-text="item.text" class="text-right" />
          <template #opposite>
            <div class="text-left">
              {{ item.value | date }}
            </div>
          </template>
        </v-timeline-item>
      </v-timeline>
      <v-slide-y-transition mode="out-in">
        <v-timeline
          v-show="!hideTimeline"
        >
          <v-timeline-item
            v-for="(item, index) in orderTimeline"
            :key="`timeline${index}`"
            :fill-dot="!!item.value"
            :color="!!item.value ? 'primary' : 'grey'"
            :icon="getIcon(item)"
            small
            left
          >
            <div v-text="item.text" class="text-right" />
            <template #opposite>
              <div class="text-left">
                {{ item.value | date }}
              </div>
            </template>
          </v-timeline-item>
        </v-timeline>
      </v-slide-y-transition>
    </v-card-text>
    <v-card-actions />
  </v-card>
</template>

<script>
export default {
  data: () => ({
    hideTimeline: true
  }),
  computed: {
    orderStatusRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/order-status` }),
    orderStatus: vm => vm.$store.getters['vehicle/getOrderStatus'],
    orderComments: vm => vm.orderStatus.comments,
    orderDetails () {
      return [
        {
          text: this.$i18n.t('vehicle_number'),
          value: this.orderStatus.vehicle_number
        },
        {
          text: this.$i18n.t('year_make_model'),
          value: this.yearMakeModel()
        },
        {
          text: this.$i18n.t('factory_order_number'),
          value: this.orderStatus.factory_order_number
        },
        {
          text: this.$i18n.t('ordering_dealer_code'),
          value: this.orderStatus.ordering_dealer_code
        },
        {
          text: this.$i18n.t('shipped_to_dealer_code'),
          value: this.orderStatus.shipped_to_dealer_code
        },
        {
          text: this.$i18n.t('dealer_contact'),
          value: this.orderStatus.dealer_contact
        },
        {
          text: this.$i18n.t('priority_code'),
          value: this.orderStatus.priority_code
        }
      ]
    },
    orderTimeline () {
      return [
        {
          text: this.$i18n.t('order_received_date'),
          value: this.orderStatus.order_received_date
        },
        {
          text: this.$i18n.t('order_placed_date'),
          value: this.orderStatus.order_placed_date
        },
        {
          text: this.$i18n.t('zone_receive_date'),
          value: this.orderStatus.zone_receive_date
        },
        {
          text: this.$i18n.t('sent_to_plant_date'),
          value: this.orderStatus.sent_to_plant_date
        },
        {
          text: this.$i18n.t('production_scheduled_date'),
          value: this.orderStatus.production_scheduled_date
        },
        {
          text: this.$i18n.t('built_date'),
          value: this.orderStatus.built_date
        },
        {
          text: this.$i18n.t('shipped_to_body_company_date'),
          value: this.orderStatus.shipped_to_body_company_date
        },
        {
          text: this.$i18n.t('at_body_company_date'),
          value: this.orderStatus.at_body_company_date
        },
        {
          text: this.$i18n.t('shipped_from_body_company_date'),
          value: this.orderStatus.shipped_from_body_company_date
        },
        {
          text: this.$i18n.t('back_at_manufacturer_date'),
          value: this.orderStatus.back_at_manufacturer_date
        },
        {
          text: this.$i18n.t('shipped_to_dealer_date'),
          value: this.orderStatus.shipped_to_dealer_date
        },
        {
          text: this.$i18n.t('release_to_convoy_date'),
          value: this.orderStatus.release_to_convoy_date
        },
        {
          text: this.$i18n.t('delivered_to_dealer_date'),
          value: this.orderStatus.delivered_to_dealer_date
        },
        {
          text: this.$i18n.t('in_service_date'),
          value: this.orderStatus.in_service_date
        },
        {
          text: this.$i18n.t('status_date'),
          value: this.orderStatus.status_date
        }
      ]
    },
    // show the first 2 items until the +more button is pressed
    orderTimelinePreview: vm => vm.orderTimeline.slice(0, 2)
  },
  async mounted () {
    // try to fetch order status if null
    if (!this.orderStatus) {
      await this.$store.dispatch('vehicle/fetchOrderStatus', this.$route.params.vehicle)
    }
  },
  methods: {
    yearMakeModel () {
      return [this.orderStatus.model_year, this.orderStatus.vehicle_make, this.orderStatus.vehicle_model].filter(Boolean).join(' ')
    },
    getIcon (item) {
      if (this.$moment(item.value).isBefore(this.$moment(), 'day')) {
        return 'mdi-check-circle'
      }
      return ''
    }
  }
}
</script>
