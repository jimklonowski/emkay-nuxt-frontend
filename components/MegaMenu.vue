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
      <!-- eslint-disable vue/require-component-is -->
      <v-btn
        v-on="on"
        :color="$vuetify.theme.dark ? 'white' : 'rgba(0, 0, 0, 0.54)'"
        :title="$t(model.titleKey)"
        min-width="60px"
        text
        small
      >
        <span v-show="$vuetify.breakpoint.mdAndDown">
          <v-icon v-text="model.icon" />
          <v-icon v-show="model.showArrowCollapsed">mdi-chevron-down</v-icon>
        </span>
        <span v-show="$vuetify.breakpoint.lgAndUp">
          {{ $t(model.titleKey) }}
          <v-icon v-show="model.showArrow">mdi-chevron-down</v-icon>
        </span>
      </v-btn>
    </template>
    <v-card>
      <v-list-item :style="model.style" :dark="$vuetify.theme.dark" :to="localePath(model.path)" two-line>
        <v-list-item-avatar :color="model.color">
          <v-icon v-text="model.icon" dark />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ $t(model.titleKey) }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption" style="opacity:0.7;">
            {{ $t(model.subtitleKey) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-tabs
        v-model="tab"
        :color="model.color"
        :slider-color="model.color"
        slider-size="3"
        show-arrows
        centered
      >
        <v-tab v-for="(category, key) in model.categories" :key="`tab${key}`" class="overline">
          {{ $t(category.key) }}
        </v-tab>
      </v-tabs>
      <v-divider />
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(category, key) in model.categories" :key="`item${key}`">
          <v-card-text class="pa-0">
            <v-list nav tile dense>
              <v-list-item
                v-for="(item, name, key2) in category.items"
                :key="key2"
                :to="localePath(item.to)"
                :color="category.color"
                @click="open = false"
                nuxt
              >
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
import { VBtn } from 'vuetify/lib'
// import * as VBtn from 'vuetify/es5/components/VBtn'
const defaultProps = {
  activator: 'v-btn',
  categories: [],
  color: 'primary',
  icon: 'mdi-alert',
  showArrow: true,
  showArrowCollapsed: false,
  style: '',
  subtitleKey: '',
  titleKey: '',
  path: null
}

export default {
  /* eslint-disable vue/no-unused-components */
  components: { VBtn },
  props: {
    menu: {
      type: Object,
      default: () => defaultProps
    }
  },
  data: () => ({
    open: false,
    tab: 0,
    model: {}
  }),
  mounted () {
    // merge props, overwrite any defaults
    if (this.$props && this.$props.menu) {
      this.model = { ...defaultProps, ...this.$props.menu }
    }
  }
}
</script>

<style>

</style>
