<template>
  <v-card v-if="quote" elevation="5">
    <v-card-title v-text="$t('quote_details')" class="justify-center" />
    <v-divider />
    <v-card-text>
      <v-list two-line flat>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-text="'mdi-car-info'" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle v-text="$t('vehicle_description')" />
            <v-list-item-title v-text="vehicleInfo" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-text="'mdi-map-marker'" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle v-text="$t('pickup_location')" />
            <v-list-item-title v-text="pickupLocation" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-text="'mdi-map-marker-outline'" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle v-text="$t('delivery_location')" />
            <v-list-item-title v-text="deliveryLocation" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-text="'mdi-truck-fast'" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle v-text="$t('transport_method')" />
            <v-list-item-title>
              <v-chip v-text="$t(quote.transport_method)" color="primary" small pill />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-text="'mdi-map-marker-distance'" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle v-text="$t('estimated_distance')" />
            <v-list-item-title v-text="quote.estimated_distance" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-text="'mdi-cash'" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle v-text="$t('estimated_cost')" />
            <v-list-item-title>{{ quote.estimated_cost | currency }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <!-- <v-btn :to="`${vehicleRoute}/transports-and-storage/create-order?quote=true`" block nuxt>
        Create Order using Quote
      </v-btn> -->
      <v-btn :to="{ path: `${vehicleRoute}/transports-and-storage/create-order`, query: { quote: true } }" color="primary" block outlined nuxt>
        Create Order using Quote
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { vehicleRoute } from '@/mixins/routing'
export default {
  mixins: [vehicleRoute],
  computed: {
    quote: vm => vm.$store.getters['transtor/getQuote'],
    deliveryLocation () {
      return [this.quote.destination_city, this.quote.destination_state_province, this.quote.destination_postal_code].filter(Boolean).join(' ')
    },
    pickupLocation () {
      return [this.quote.origin_city, this.quote.origin_state_province, this.quote.origin_postal_code].filter(Boolean).join(' ')
    },
    vehicleInfo () {
      return '2012 Jeep Compass'
    }
  }
}
</script>
