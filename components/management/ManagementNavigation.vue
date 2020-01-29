<template>
  <span>
    <v-app-bar
      :src="require('@/assets/blurrycar.jpg')"
      :elevate-on-scroll="false"
      dark
      extended
      prominent
      flat
      hide-on-scroll
      elevation="4"
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
        <nuxt-link :to="localePath({ path: '/management' })" class="text-decoration-none white--text">
          {{ $t('account_management') }}
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
          <v-tab v-for="(category, key) in $options.management.categories" :key="key" text>
            <v-icon v-text="category.icon" />
            {{ $t(category.key) }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-card tile outlined>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-subheader class="overline">{{ $t('select_an_action') }}</v-subheader>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="(category, key) in $options.management.categories" :key="key">
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
import { management } from '@/static/data/menus'
export default {
  data: () => ({ tab: 0 }),
  management
}
</script>
