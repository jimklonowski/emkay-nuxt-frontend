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
            {{ avatarText }}
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ $auth.user.account }}</v-list-item-title>
            <v-list-item-subtitle>{{ $auth.user.username }}</v-list-item-subtitle>
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
            <v-list-item-title>{{ $t('logout') }}</v-list-item-title>
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" :aria-label="$t('open_the_menu')" />
      <v-toolbar-title v-text="$t('emkay')" />

      <v-spacer />

      <v-toolbar-items v-if="$auth.loggedIn">
        <mega-menu :menu="reportingMenu" v-if="!isRouteActive('reporting')" />
        <mega-menu :menu="orderingMenu" v-show="!isRouteActive('ordering')" />
        <mega-menu :menu="managementMenu" v-show="!isRouteActive('management')" />
      </v-toolbar-items>
      <v-divider class="mx-4" vertical inset />
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
        key: 'home',
        to: { name: 'index' }
      },
      {
        icon: 'mdi-chart-bubble',
        key: 'vehicle_dashboard',
        to: { name: 'vehicle' }
      },
      {
        icon: 'mdi-file-chart-outline',
        key: 'reporting',
        to: { name: 'reporting' }
      },
      {
        icon: 'mdi-timetable',
        key: 'ordering',
        to: { name: 'ordering' }
      },
      {
        icon: 'mdi-apps',
        key: 'account_management',
        to: { name: 'management' }
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
    avatarText () {
      return this.$auth.user.account && this.$auth.user.account.substr(0, 2)
    },
    managementMenu () {
      return {
        categories: this.$options.menus.management.categories,
        icon: 'mdi-apps',
        subtitleKey: 'configure_your_fleet_settings',
        titleKey: 'management'
      }
    },
    orderingMenu () {
      return {
        categories: this.$options.menus.ordering.categories,
        icon: 'mdi-timetable',
        subtitleKey: 'ordering_subtitle',
        titleKey: 'ordering'
      }
    },
    reportingMenu () {
      return {
        categories: this.$options.menus.reports.categories,
        icon: 'mdi-file-chart-outline',
        // style: 'background-image:linear-gradient(to top right, #f6d365, #fda085);',
        // style: 'background-image:linear-gradient(135deg,#667eea,#764ba2)!important;',
        subtitleKey: 'reporting_subtitle',
        titleKey: 'reporting',
        path: this.$options.menus.reports.to
      }
    }
  },
  methods: {
    isRouteActive (routeName) {
      if (this.$route.matched.some(match => match.name.includes(routeName))) {
        return true
      }
      return false
    },
    async logout () {
      await this.$store.dispatch('account/logout')
      // // if a french user is logging out, make sure we redirect to /fr-ca/login instead of /login
      // this.$router.push(this.$nuxt.localePath({ name: 'login' }))
    }
  }
}
</script>

<style>

</style>
