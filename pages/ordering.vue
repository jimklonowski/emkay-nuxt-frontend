<template>
  <v-container>
    <v-row no-gutters>
      <h1 class="display-3">
        {{ $t('ordering') }}
      </h1>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card rounded shaped>
          <v-card-text>
            <keep-alive>
              <v-tabs
                show-arrows
              >
                <v-tab v-for="(category, key) in $options.ordering.categories" :key="key" v-text="$t(category.key)" />
                <v-tab-item v-for="(category, key) in $options.ordering.categories" :key="key">
                  <v-list>
                    <v-list-item v-for="(page, key2) in category.items" :key="key2" :to="localePath(page.to)">
                      <v-list-item-avatar>
                        <v-icon v-text="page.icon" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="$t(page.key)" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-tab-item>
              </v-tabs>
            </keep-alive>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <nuxt-child />
    </v-row>
  </v-container>
</template>

<script>
import { ordering } from '@/static/data/menus'
export default {
  ordering,
  middleware: ['auth'],
  name: 'Ordering',
  /**
   * The scrollToTop property lets you tell Nuxt.js to scroll to the top before rendering the page.
   * https://nuxtjs.org/api/pages-scrolltotop
   * Since the each specific report page 're-renders' on every query change (if using watchQuery), disable scrollToTop for reports
   */
  scrollToTop: false
}
</script>
