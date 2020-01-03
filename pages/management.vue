<template>
  <v-container>
    <v-sheet class="mx-auto" max-width="1000" color="transparent">
      <v-row v-if="$route.matched.length === 1">
        <v-col cols="12">
          <v-card outlined shaped>
            <v-card-title>
              {{ $t('management') }}
            </v-card-title>
            <v-card-text>
              <v-tabs show-arrows>
                <v-tab v-for="(category, key) in $options.management.categories" :key="key" v-t="category.key" />
                <v-tab-item v-for="(category, key) in $options.management.categories" :key="key">
                  <v-list dense>
                    <v-list-item v-for="(item, key2) in category.items" :key="key2" :to="localePath(item.to)">
                      <v-list-item-avatar>
                        <v-icon v-text="item.icon" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-t="item.key" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-tab-item>
              </v-tabs>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <v-btn :to="localePath({ path: `/management/` })" class="my-4" nuxt exact text>
            <v-icon v-text="'mdi-chevron-left'" class="mr-2" />
            {{ $t('management') }}
          </v-btn>
        </v-col>
        <v-col cols="12">
          <nuxt-child />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import { management } from '@/static/data/menus'
export default {
  management,
  middleware: ['auth'],
  name: 'Management'
}
</script>
