<template>
  <nav>
    <v-app-bar
      :src="require('@/assets/reports1.jpg')"
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
        <nuxt-link :to="localePath({ path: '/reporting' })" class="text-decoration-none white--text">
          {{ $t('reporting') }}
        </nuxt-link>
      </v-toolbar-title>
      <template #extension>
        <v-toolbar-items>
          <v-tabs
            v-model="tab"
            :dark="false"
            show-arrows
            left
            background-color="transparent"
            color="white"
          >
            <v-tab v-for="(category, key) in $options.reports.categories" :key="key" text>
              <v-icon v-text="category.icon" />
              {{ $t(category.key) }}
            </v-tab>
          </v-tabs>
        </v-toolbar-items>
      </template>
      <!-- <v-card outlined>
        <v-toolbar elevation="1" extended>
          <v-toolbar-title class="font-lato" style="font-size:2.5rem;">
            {{ $t('reporting') }}
          </v-toolbar-title>
          <v-spacer />
          <template #extension>
            <v-tabs v-model="tab" show-arrows left>
              <v-tab v-for="(category, key) in $options.reports.categories" :key="key" text>
                <v-icon v-text="category.icon" />
                {{ $t(category.key) }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-subheader>{{ $t('select_a_report') }}</v-subheader>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(category, key) in $options.reports.categories" :key="key">
            <v-flex>
              <v-chip
                v-for="(item, key2) in category.items"
                :key="key2"
                :to="{ path: localePath(item.to), hash: $route.hash }"
                class="ma-2"
                outlined
                nuxt
              >
                <v-icon v-text="item.icon" left />
                {{ $t(item.key) }}
              </v-chip>
            </v-flex>
          </v-tab-item>
        </v-tabs-items>
      </v-card> -->
    </v-app-bar>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-subheader>{{ $t('select_a_report') }}</v-subheader>
          <v-tabs-items v-model="tab" style="background-color:transparent;">
            <v-tab-item v-for="(category, key) in $options.reports.categories" :key="key">
              <v-flex>
                <v-chip
                  v-for="(item, key2) in category.items"
                  :key="key2"
                  :to="{ path: localePath(item.to), hash: $route.hash }"
                  class="ma-2"
                  outlined
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
  </nav>
</template>

<script>
import { reports } from '@/static/data/menus'
export default {
  data: () => ({ tab: 0 }),
  reports
}
</script>
