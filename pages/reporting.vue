<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Report Menu</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <reports-mega-menu />
        <!-- <v-menu
          v-model="reporting_menu"
          :close-on-content-click="false"
          :nudge-bottom="8"
          origin="top right"
          transition="scale-transition"
          left
          offset-y
          bottom
        >
          <template #activator="{ on }">
            <v-tab v-on="on" title="Reporting" style="min-width:60px;">
              <v-icon v-show="$vuetify.breakpoint.mdAndDown" color="primary lighten-2">
                mdi-monitor-dashboard
              </v-icon>
              <span v-show="$vuetify.breakpoint.lgAndUp">
                {{ $t('navigation.reporting') }}
                <v-icon>mdi-chevron-down</v-icon>
              </span>
            </v-tab>
          </template>
          <v-card>
            <v-list-item style="background-image:linear-gradient(to top right,#f6d365,#fda085);" two-line>
              <v-list-item-content>
                <v-list-item-title class="title white--text">
                  Reporting
                </v-list-item-title>
                <v-list-item-subtitle class="caption white--text">
                  All of your <strong>fleet</strong> reports in one place
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-tabs
              v-model="reporting_tab"
              color="warning"
              slider-size="3"
              slider-color="warning lighten-2"
              grow
              centered
            >
              <v-tab v-for="(category, key) in reporting_categories" :key="`reportingtab${key}`" class="overline">
                {{ $t(category.key) }}
              </v-tab>
            </v-tabs>
            <v-divider />
            <v-tabs-items v-model="reporting_tab">
              <v-tab-item v-for="(category, key) in reporting_categories" :key="`reportingtab-item${key}`">
                <v-card-text class="pa-0">
                  <v-list nav tile dense>
                    <v-list-item v-for="(item, name, key2) in category.items" :key="key2" :to="localePath(item.to)" @click="reporting_menu = false" style="min-height:32px;">
                      <v-icon class="mr-4" size="20">
                        {{ item.icon || 'mdi-source-commit' }}
                      </v-icon>
                      <v-list-item-subtitle class="font-weight-regular">
                        {{ $t(item.key) }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-tab-item>
            </v-tabs-items>
            <v-divider />
            <v-card-actions class="pa-0">
              <v-spacer />
              <v-subheader>Do something else</v-subheader>
            </v-card-actions>
          </v-card>
        </v-menu> -->

        <!-- <v-btn :to="localePath({ path: '/reporting/fuel-detail' })" text>
          Fuel Detail
        </v-btn> -->
      </v-toolbar-items>
    </v-toolbar>
    <v-row>
      <nuxt-child />
    </v-row>
  </v-container>
</template>

<script>
import ReportsMegaMenu from '@/components/ReportsMegaMenu'
export default {
  name: 'Reporting',
  layout: 'reports',
  middleware: ['auth'],
  components: {
    ReportsMegaMenu
  }
}
</script>

<style>

</style>
