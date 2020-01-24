<template>
  <v-card outlined>
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
    <v-subheader>Select a report</v-subheader>
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
  </v-card>
</template>

<script>
import { reports } from '@/static/data/menus'
export default {
  data: () => ({ tab: 0 }),
  reports
}
</script>
