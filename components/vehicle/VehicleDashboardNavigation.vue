<template>
  <v-app-bar
    :src="require('@/assets/dash1.jpg')"
    :elevate-on-scroll="false"
    style="position:sticky;top:64px;left:0;right:0;z-index:4;"
    dark
    extended
    prominent
    flat
    hide-on-scroll
    scroll-threshold="60"
  >
    <template #img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      />
    </template>
    <v-toolbar-title class="display-1">
      <nuxt-link :to="vehicleRoute" class="text-decoration-none white--text">
        {{ $t('vehicle_dashboard') }}
        <span class="caption">
          {{ $route.params.vehicle }}
        </span>
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer />
    <template #extension>
      <v-toolbar-items>
        <v-btn v-for="(item, key) in actions" :key="key" :to="localePath(item.to)" text x-small>
          {{ $t(item.key) }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { vehicleRoute } from '@/mixins/routing'
export default {
  mixins: [vehicleRoute],
  computed: {
    actions () {
      return [
        {
          key: 'transports_and_storage',
          icon: '',
          to: { path: `/vehicle/${this.$route.params.vehicle}/transports-and-storage` }
        },
        {
          key: 'edit_custom_labels',
          icon: '',
          to: { path: `/vehicle/${this.$route.params.vehicle}/edit-custom-labels` }
        },
        {
          key: 'reassign_vehicle',
          icon: '',
          to: { path: `/vehicle/${this.$route.params.vehicle}/reassign-vehicle` }
        },
        {
          key: 'order_status',
          icon: '',
          to: { path: `/vehicle/${this.$route.params.vehicle}/order-status` }
        }
      ]
    }
  }
}
</script>

<style>

</style>
