<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar elevation="4" extended>
            <v-toolbar-title>
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
                <v-chip v-for="(item, key2) in category.items" :key="key2" :to="{ path: localePath(item.to), hash: $route.hash }" class="ma-2" outlined>
                  <v-icon v-text="item.icon" left />
                  {{ $t(item.key) }}
                </v-chip>
              </v-flex>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
      <nuxt-child />
    </v-row>
  </v-container>
</template>

<script>
import { reports } from '@/static/data/menus'

export default {
  name: 'Reporting',
  data: () => ({ tab: 0 }),
  // custom property, reference as this.$options.reports
  reports,
  middleware: ['auth'],
  head () {
    const title = this.$t('reporting')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  /**
   * The scrollToTop property lets you tell Nuxt.js to scroll to the top before rendering the page.
   * https://nuxtjs.org/api/pages-scrolltotop
   * Since the each specific report page 're-renders' on every query change (if using watchQuery), disable scrollToTop for reports
   */
  scrollToTop: false
}
</script>
