<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-bottom="8"
    origin="top right"
    transition="scale-transition"
    left
    offset-y
    bottom
  >
    <template #activator="{ on }">
      <v-btn v-on="on" :color="$vuetify.theme.dark ? 'white' : 'rgba(0, 0, 0, 0.54)'" :title="$t(`reports.menu_title`)" min-width="60px" text>
        <span v-show="$vuetify.breakpoint.mdAndDown">
          <v-icon>mdi-monitor-dashboard</v-icon>
          <v-icon>mdi-chevron-down</v-icon>
        </span>
        <span v-show="$vuetify.breakpoint.lgAndUp">
          {{ $t(`reports.menu_title`) }}
          <v-icon>mdi-chevron-down</v-icon>
        </span>
      </v-btn>
    </template>
    <v-card>
      <v-list-item style="background-image:linear-gradient(to top right,#f6d365,#fda085);" two-line>
        <v-list-item-content>
          <v-list-item-title class="title white--text">
            {{ $t(`reports.menu_title`) }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption white--text">
            {{ $t('reports.menu_subtitle') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-tabs
        v-model="tab"
        color="warning"
        slider-size="3"
        slider-color="warning lighten-2"
        show-arrows
        centered
      >
        <v-tab v-for="(category, key) in $options.reports.categories" :key="`reportingtab${key}`" class="overline">
          {{ $t(category.key) }}
        </v-tab>
      </v-tabs>
      <v-divider />
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(category, key) in $options.reports.categories" :key="`reportingtab-item${key}`">
          <v-card-text class="pa-0">
            <v-list nav tile dense>
              <v-list-item v-for="(item, name, key2) in category.items" :key="key2" :to="localePath(item.to)" @click="menu = false">
                <v-list-item-icon>
                  <v-icon :color="item.icon ? 'currentColor' : 'error lighten-3'">
                    {{ item.icon || 'mdi-alert-outline' }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle class="font-weight-regular">
                  {{ $t(item.key) }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
      <!-- <v-divider />
      <v-card-actions class="pa-0">
        <v-spacer />
        <v-subheader />
      </v-card-actions> -->
    </v-card>
  </v-menu>
</template>

<script>
// import reports from 'static/data/reports.json'

// Load list of available reports from static json file.
import reports from 'static/data/reports.js'

export default {
  // custom property, referenced with this.$options.reports[.categories]
  reports,

  data: () => ({
    menu: false,
    tab: 0
  })

}
</script>

<style>

</style>
