<template>
  <nav>
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      v-model="drawer"
      clipped
      fixed
      disable-route-watcher
      app
    >
      <template v-if="$auth.loggedIn" #prepend>
        <v-list-item class="pa-4">
          <v-list-item-avatar color="primary darken-2 white--text">
            EM
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>EM102</v-list-item-title>
            <v-list-item-subtitle>JCK JCK JCK JCK</v-list-item-subtitle>
            <v-list-item-subtitle>wow</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t(item.key) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-if="$auth.loggedIn" #append>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon v-text="'mdi-logout'" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('auth.logout') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      clipped-right
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="'EMKAY'" />

      <v-spacer />

      <mega-menu :menu="managementMenu" />
      <mega-menu :menu="orderingMenu" />
      <mega-menu :menu="reportingMenu" />
      <!-- <v-divider class="mx-4" vertical inset /> -->
      <dark-mode-toggle class="mx-1" />
      <!-- <v-divider class="mx-4" vertical inset /> -->
      <language-picker class="mx-1" />
    </v-app-bar>
  </nav>
</template>

<script>
import { management, ordering, reports } from '@/static/data/menus'

import DarkModeToggle from '@/components/DarkModeToggle'
import LanguagePicker from '@/components/LanguagePicker'
import MegaMenu from '@/components/MegaMenu'

export default {
  // custom properties, reference as this.$options.menus.reports, this.$options.menus.ordering, etc.
  menus: {
    management,
    ordering,
    reports
  },
  components: {
    DarkModeToggle,
    LanguagePicker,
    MegaMenu
  },
  data: () => ({
    clipped: false,
    drawer: false,
    fixed: false,
    items: [
      {
        icon: 'mdi-widgets',
        title: 'Home',
        key: 'navigation.home',
        to: { name: 'index' }
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Vehicle Dashboard',
        key: 'navigation.vehicle_dashboard',
        to: { name: 'vehicle' }
      },
      {
        icon: 'mdi-file-chart',
        title: 'Reporting',
        key: 'navigation.reporting',
        to: { name: 'reporting' }
      }
      // {
      //   icon: 'mdi-login',
      //   title: 'Login',
      //   key: 'auth.login',
      //   to: '/login'
      // }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'EMKAY Nuxt.js'
  }),
  computed: {
    managementMenu () {
      return {
        categories: this.$options.menus.management.categories,
        icon: 'mdi-apps',
        subtitleKey: 'management.menu_subtitle',
        titleKey: 'management.menu_title'
      }
    },
    orderingMenu () {
      return {
        categories: this.$options.menus.ordering.categories,
        icon: 'mdi-history',
        subtitleKey: 'ordering.menu_subtitle',
        titleKey: 'ordering.menu_title'
      }
    },
    reportingMenu () {
      return {
        categories: this.$options.menus.reports.categories,
        icon: 'mdi-monitor-dashboard',
        // style: 'background-image:linear-gradient(to top right, #f6d365, #fda085);',
        // style: 'background-image:linear-gradient(135deg,#667eea,#764ba2)!important;',
        subtitleKey: 'reports.menu_subtitle',
        titleKey: 'reports.menu_title'
      }
    }
  },
  methods: {
    async logout () {
      this.drawer = false
      await this.$auth.logout()
      // if a french user is logging out, make sure we redirect to /fr-ca/login instead of /login
      this.$router.push(this.localePath({ name: 'login' }))
    }
  }
}
</script>

<style>

</style>
