<template>
  <v-container>
    <v-row no-gutters>
      <h1 class="display-3">
        {{ $t('reports') }}
      </h1>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-card rounded shaped>
          <v-card-text class="pa-0">
            <keep-alive>
              <v-tabs
                show-arrows
              >
                <v-tab v-for="(category, key) in $options.reports.categories" :key="key" v-t="category.key" />
                <v-tab-item v-for="(category, key) in $options.reports.categories" :key="key">
                  <v-list>
                    <v-list-item v-for="(report, key2) in category.items" :key="key2" :to="localePath(report.to)">
                      <v-list-item-avatar>
                        <v-icon v-text="report.icon" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-t="report.key" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-tab-item>
              </v-tabs>
            </keep-alive>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <nuxt-child />
    </v-row>
  </v-container>
</template>

<script>
import { reports } from '@/static/data/menus'

export default {
  // custom property, reference as this.$options.reports
  reports,
  middleware: ['auth'],
  name: 'Reporting',
  /**
   * The scrollToTop property lets you tell Nuxt.js to scroll to the top before rendering the page.
   * https://nuxtjs.org/api/pages-scrolltotop
   * Since the each specific report page 're-renders' on every query change (if using watchQuery), disable scrollToTop for reports
   */
  scrollToTop: false
}
</script>
