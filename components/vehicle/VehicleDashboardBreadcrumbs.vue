<template>
  <v-container v-if="crumbs.length > 1">
    <v-row no-gutters>
      <v-col cols="12">
        <v-breadcrumbs
          :items="crumbs"
          class="px-0"
        >
          <template #item="{ item }">
            <nuxt-link v-if="!item.disabled" :to="item.to" class="text-decoration-none">
              {{ item.text }}
            </nuxt-link>
            <span v-else class="text--disabled">{{ item.text }}</span>
          </template>
          <template #divider>
            <v-icon v-text="'mdi-chevron-right'" />
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    crumbs () {
      const crumbs = []
      const path = this.$route.path.substr(1).split('/')
      // if first part of path is a locale, remove it for now
      if (path && path[0] === this.$i18n.locale) {
        path.shift()
      }
      let prefix = ''
      // if vehicle dashboard, dont include the /vehicle path
      if (path[0] === 'vehicle') {
        prefix = path.shift()
      }
      path.forEach((crumb, i) => {
        crumbs.push({
          text: (i === 0) ? crumb.toUpperCase() : this.$i18n.t(crumb.toLowerCase().replace(/-/g, '_')),
          disabled: (i + 1 === path.length),
          to: this.localePath({ path: '/' + prefix + '/' + crumb })
        })
        prefix = prefix + '/' + crumb
      })
      return crumbs
    }
  }
}
</script>
