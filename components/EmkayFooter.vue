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
      {{ new Date().getFullYear() }} - {{ $t('emkay_inc') }}
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
        key: 'about',
        items: [
          { title: 'About EMKAY', key: 'about_emkay', to: {} },
          { title: 'Blog', key: 'blog', to: {} },
          { title: 'Careers', key: 'careers', to: {} },
          { title: 'Contact', key: 'contact', to: {} }
        ]
      },
      {
        key: 'more',
        items: [
          { title: 'Press Releases', key: 'press_releases', to: {} },
          { title: 'Leadtime Guides', key: 'leadtime_guides', to: {} },
          { title: 'Fleet Incentives', key: 'fleet_incentives', to: {} },
          { title: 'Automotive Links', key: 'automotive_links', to: {} }
        ]
      },
      {
        key: 'tech',
        items: [
          { title: 'Celsius', key: 'celsius', to: {} },
          { title: 'Driver 360', key: 'driver_360', to: {} },
          { title: 'Fleet 360', key: 'fleet_360', to: {} },
          { title: 'Fleet Exchange', key: 'fleet_exchange', to: {} },
          { title: 'Geotab', key: 'geotab', to: {} }
        ]
      }
    ]
  })
}
</script>
