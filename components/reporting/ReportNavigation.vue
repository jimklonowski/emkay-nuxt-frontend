<template>
  <span>
    <v-app-bar
      :src="require('@/assets/reports1.jpg')"
      :elevate-on-scroll="false"
      dark
      extended
      prominent
      flat
      hide-on-scroll
      elevation="1"
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
        <nuxt-link :to="localePath({ path: '/reporting' })" class="text-decoration-none white--text">
          {{ $t('reporting') }}
        </nuxt-link>
      </v-toolbar-title>
      <template #extension>
        <v-tabs
          v-model="tab"
          :dark="false"
          @change="$vuetify.goTo(0)"
          show-arrows
          left
          background-color="transparent"
          color="white"
        >
          <v-tab v-for="(category, key) in menu.categories" :key="key" text>
            <v-icon v-text="category.icon" />
            {{ $t(category.key) }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-card :style="$vuetify.theme.dark ? 'border-bottom: thin solid rgba(255, 255, 255, 0.12)' : 'border-bottom: thin solid rgba(0, 0, 0, .12)'" flat tile>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-subheader>{{ $t('select_a_report') }}</v-subheader>
            <v-tabs-items v-model="tab" style="background-color:transparent;">
              <v-tab-item v-for="(category, key) in menu.categories" :key="key">
                <v-flex>
                  <v-chip
                    v-for="(item, key2) in category.items"
                    :key="key2"
                    :to="{ path: localePath(item.to), hash: $route.hash }"
                    :color="$route.path.includes(item.to.path) ? 'primary' : undefined"
                    :outlined="!$route.path.includes(item.to.path)"
                    class="ma-2"
                    nuxt
                  >
                    <v-icon v-text="item.icon" left />
                    {{ $t(item.key) }}
                  </v-chip>
                </v-flex>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </span>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({ tab: 0 })
}
</script>
