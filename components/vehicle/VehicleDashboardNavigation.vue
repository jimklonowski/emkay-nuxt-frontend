<template>
  <v-app-bar
    :src="require('@/assets/steeringwheel1.jpg')"
    :elevate-on-scroll="false"
    dark
    extended
    prominent
    flat
    hide-on-scroll
    elevation="4"
    scroll-threshold="60"
    class="emkay-image-nav"
  >
    <template #img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      />
    </template>
    <v-toolbar-title>
      <nuxt-link :to="vehicleRoute" class="text-decoration-none white--text">
        {{ $t('vehicle_dashboard') }}
        <span class="caption">
          {{ $route.params.vehicle }}
        </span>
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer />
    <template #extension>
      <v-tabs
        hide-slider
        show-arrows
        left
        background-color="transparent"
        color="white"
      >
        <v-tab v-for="(item, key) in actions" :key="key" :to="localePath(item.to)" text x-small>
          <v-icon v-text="item.icon" />
          {{ $t(item.key) }}
        </v-tab>
      </v-tabs>
      <!-- <v-toolbar-items>
        <v-btn v-for="(item, key) in actions" :key="key" :to="localePath(item.to)" text x-small>
          {{ $t(item.key) }}
        </v-btn>
      </v-toolbar-items> -->
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
        // {
        //   key: 'edit_custom_labels',
        //   icon: '',
        //   to: { path: `/vehicle/${this.$route.params.vehicle}/edit-custom-labels` }
        // },
        // {
        //   key: 'reassign_vehicle',
        //   icon: '',
        //   to: { path: `/vehicle/${this.$route.params.vehicle}/reassign-vehicle` }
        // },
        {
          key: 'saferoads',
          icon: '',
          to: { path: `/vehicle/${this.$route.params.vehicle}/saferoads` }
        },
        {
          key: 'documents_and_notes',
          icon: '',
          to: { path: `/vehicle/${this.$route.params.vehicle}/documents-and-notes` }
        }
      ]
    }
  }
}
</script>

<style>

</style>
