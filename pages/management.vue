<template>
  <v-container>
    <v-row no-gutters>
      <h1 class="display-3">
        {{ $t('management') }}
      </h1>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-card rounded shaped>
          <v-card-text class="pa-0">
            <keep-alive>
              <v-tabs show-arrows>
                <v-tab v-for="(category, key) in $options.management.categories" :key="key" v-text="$t(category.key)" />
                <v-tab-item v-for="(category, key) in $options.management.categories" :key="key">
                  <v-list>
                    <v-list-item v-for="(report, key2) in category.items" :key="key2" :to="localePath(report.to)">
                      <v-list-item-avatar>
                        <v-icon v-text="report.icon" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="$t(report.key)" />
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
import { management } from '@/static/data/menus'
export default {
  management,
  middleware: ['auth', 'account'],
  name: 'Management'
}
</script>
