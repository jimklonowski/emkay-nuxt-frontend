<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-y
  >
    <template #activator="{ on }">
      <v-btn :title="$t('language')" v-on="on" icon>
        <v-icon v-text="'mdi-web'" />
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item v-for="locale in availableLocales" :key="locale.code">
          <v-btn
            @click="changeLocale(locale)"
            :disabled="$nuxt.$i18n.locale === locale.code"
            :outlined="$nuxt.$i18n.locale === locale.code"
            small
            text
            block
            nuxt
          >
            {{ locale.name }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    menu: false
  }),
  computed: {
    availableLocales () {
      // return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
      return this.$i18n.locales
    }
  },
  methods: {
    /**
     * Several plugins currently change with the lang/locale, so make sure we trigger all of the changes in this one place.
     * see nuxt.config.js
     * moment: date formats
     * vuetify: datatables pagination and other vuetify library core text
     */
    changeLocale (locale) {
      // this.$moment.locale(locale.iso) // $moment.locale('en-ca')
      // this.$vuetify.lang.current = locale.code === 'en' ? locale.code : locale.alt // $vuetify.lang.current='en'||'enCA'||'frCA'
      let langRoute = this.switchLocalePath(locale.code)
      // remove trailing slash if '/'
      langRoute = (langRoute === '/') ? langRoute : langRoute.replace(/\/$/, '')
      this.$router.replace(langRoute)
      // this.$router.replace(this.switchLocalePath(locale.code)) // navigates to current route with current locale set.
    }
  }
}
</script>

<style>

</style>
