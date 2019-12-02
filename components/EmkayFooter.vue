<template>
  <v-footer fixed app>
    <v-btn
      :ripple="false"
      disabled
      color="secondary"
      depressed
      x-small
      text
      nuxt
    >
      <v-icon v-text="'mdi-copyright'" class="mr-2" x-small />
      2019 - EMKAY, Inc.
    </v-btn>
    <v-spacer />
    <v-menu v-for="(menu, i) in menus" :key="i" top offset-y>
      <template #activator="{ on }">
        <v-btn v-on="on" x-small text>
          {{ $t(menu.key) }}
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item v-for="(item, j) in menu.items" :key="j" :to="item.to">
          <v-list-item-title>{{ $t(item.key) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    menus: [
      {
        key: 'navigation.footer.about',
        items: [
          { title: 'About EMKAY', key: 'navigation.footer.about_emkay', to: {} },
          { title: 'Blog', key: 'navigation.footer.blog', to: {} },
          { title: 'Careers', key: 'navigation.footer.careers', to: {} },
          { title: 'Contact', key: 'navigation.footer.contact', to: {} }
        ]
      },
      {
        key: 'navigation.footer.more',
        items: [
          { title: 'Press Releases', key: 'navigation.footer.press_releases', to: {} },
          { title: 'Leadtime Guides', key: 'navigation.footer.leadtime_guides', to: {} },
          { title: 'Fleet Incentives', key: 'navigation.footer.fleet_incentives', to: {} },
          { title: 'Automotive Links', key: 'navigation.footer.automotive_links', to: {} }
        ]
      },
      {
        key: 'navigation.footer.tech',
        items: [
          { title: 'Celsius', key: 'navigation.footer.celsius', to: {} },
          { title: 'Driver 360', key: 'navigation.footer.driver_360', to: {} },
          { title: 'Fleet 360', key: 'navigation.footer.fleet_360', to: {} },
          { title: 'Fleet Exchange', key: 'navigation.footer.fleet_exchange', to: {} },
          { title: 'Geotab', key: 'navigation.footer.geotab', to: {} }
        ]
      }
    ]
  })
}
</script>
