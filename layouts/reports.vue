<template>
  <v-app>
    <emkay-navigation />
    <v-content>
      <!-- reports menu -->
      <!-- <v-navigation-drawer
        v-model="rightDrawer"
        right
        clipped
        app
        floating
        disable-resize-watcher
      >
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon light>
                mdi-repeat
              </v-icon>
            </v-list-item-action>
            <v-list-item-title>hi mom</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer> -->
      <!-- main router view -->
      <nuxt />
    </v-content>
    <client-only>
      <vue-snotify />
    </client-only>
    <emkay-footer />
  </v-app>
</template>

<script>
import EmkayFooter from '@/components/EmkayFooter'
import EmkayNavigation from '@/components/EmkayNavigation'

export default {
  components: {
    EmkayFooter,
    EmkayNavigation
  },
  data: () => ({
    rightDrawer: true,
    right: true
  })
}
</script>
