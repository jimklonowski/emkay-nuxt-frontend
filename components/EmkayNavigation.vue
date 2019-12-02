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
      <v-btn @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark" icon>
        <v-icon>{{ $vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-brightness-7' }}</v-icon>
      </v-btn>

      <language-picker />
    </v-app-bar>
  </nav>
</template>

<script>
import LanguagePicker from '@/components/LanguagePicker'
export default {
  components: {
    LanguagePicker
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
  methods: {
    async logout () {
      this.drawer = false
      // this.$route.query = null
      await this.$auth.logout()
      // $nuxt.$router.push({ path: '/', query: {} })
      // this.$auth.redirect('/', true)
    }
  }
}
</script>

<style>

</style>
