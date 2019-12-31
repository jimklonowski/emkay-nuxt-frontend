<template>
  <v-container>
    <v-row no-gutters>
      <h1 class="display-3">
        {{ $t('management') }}
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
                <v-tab v-for="(category, key) in $options.management.categories" :key="key" v-t="category.key" />
                <v-tab-item v-for="(category, key) in $options.management.categories" :key="key">
                  <v-list>
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
import { management } from '@/static/data/menus'
export default {
  management,
  middleware: ['auth'],
  name: 'Management'
}
</script>
