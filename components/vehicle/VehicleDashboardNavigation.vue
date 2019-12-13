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
      {{ $t('navigation.vehicle_dashboard') }}
    </v-toolbar-title>
    <v-spacer />
    <template #extension>
      <v-toolbar-items>
        <v-btn v-for="(item, key) in actions" :key="key" :to="item.to" text x-small>
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
export default {
  computed: {
    actions () {
      return [
        {
          key: 'vehicle.edit_custom_labels',
          icon: '',
          to: { path: `${this.$route.fullPath}/edit-custom-labels` }
        },
        {
          key: 'vehicle.reassign_vehicle',
          icon: '',
          to: { path: `${this.$route.fullPath}/reassign-vehicle` }
        },
        {
          key: 'vehicle.order_status',
          icon: '',
          to: { path: `${this.$route.fullPath}/order-status` }
        }
      ]
    }
  }
}
</script>

<style>

</style>
