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
      {{ new Date().getFullYear() }} - {{ $t('common.emkay_inc') }}
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
        key: 'footer.about',
        items: [
          { title: 'About EMKAY', key: 'footer.about_emkay', to: {} },
          { title: 'Blog', key: 'footer.blog', to: {} },
          { title: 'Careers', key: 'footer.careers', to: {} },
          { title: 'Contact', key: 'footer.contact', to: {} }
        ]
      },
      {
        key: 'footer.more',
        items: [
          { title: 'Press Releases', key: 'footer.press_releases', to: {} },
          { title: 'Leadtime Guides', key: 'footer.leadtime_guides', to: {} },
          { title: 'Fleet Incentives', key: 'footer.fleet_incentives', to: {} },
          { title: 'Automotive Links', key: 'footer.automotive_links', to: {} }
        ]
      },
      {
        key: 'footer.tech',
        items: [
          { title: 'Celsius', key: 'footer.celsius', to: {} },
          { title: 'Driver 360', key: 'footer.driver_360', to: {} },
          { title: 'Fleet 360', key: 'footer.fleet_360', to: {} },
          { title: 'Fleet Exchange', key: 'footer.fleet_exchange', to: {} },
          { title: 'Geotab', key: 'footer.geotab', to: {} }
        ]
      }
    ]
  })
}
</script>
