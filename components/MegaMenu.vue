<template>
  <v-menu
    v-model="open"
    :close-on-content-click="false"
    :nudge-bottom="8"
    origin="top right"
    transition="scale-transition"
    left
    offset-y
    bottom
  >
    <template #activator="{ on }">
      <v-btn v-on="on" :color="$vuetify.theme.dark ? 'white' : 'rgba(0, 0, 0, 0.54)'" :title="$t(menu.titleKey)" min-width="60px" text>
        <span v-show="$vuetify.breakpoint.mdAndDown">
          <v-icon v-text="menu.icon" />
          <v-icon v-show="menu.showArrow">mdi-chevron-down</v-icon>
        </span>
        <span v-show="$vuetify.breakpoint.lgAndUp">
          {{ $t(menu.titleKey) }}
          <v-icon v-show="menu.showArrow">mdi-chevron-down</v-icon>
        </span>
      </v-btn>
    </template>
    <v-card>
      <v-list-item :style="menu.style" :dark="$vuetify.theme.dark" two-line>
        <v-list-item-avatar color="primary">
          <v-icon v-text="'mdi-file-document-outline'" dark />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ $t(menu.titleKey) }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption" style="opacity:0.7;">
            {{ $t(menu.subtitleKey) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-tabs
        v-model="tab"
        color="primary"
        slider-size="3"
        slider-color="primary"
        show-arrows
        centered
      >
        <v-tab v-for="(category, key) in menu.categories" :key="`tab${key}`" class="overline">
          {{ $t(category.key) }}
        </v-tab>
      </v-tabs>
      <v-divider />
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(category, key) in menu.categories" :key="`item${key}`">
          <v-card-text class="pa-0">
            <v-list nav tile dense>
              <v-list-item v-for="(item, name, key2) in category.items" :key="key2" :to="localePath(item.to)" :color="category.color" @click="open = false">
                <v-list-item-icon>
                  <v-icon :color="item.icon ? 'currentColor' : 'error lighten-2'" v-text="item.icon || 'mdi-alert-outline'" />
                </v-list-item-icon>
                <v-list-item-subtitle class="font-weight-regular">
                  {{ $t(item.key) }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-menu>
</template>

<script>
/* eslint-disable vue/require-prop-types */
export default {
  props: {
    menu: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    open: false,
    tab: 0
  }),
  created () {
    // debugger
  }
}
</script>

<style>

</style>
