<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-y
  >
    <template #activator="{ on }">
      <v-btn :title="$t('common.language')" v-on="on" icon>
        <v-icon v-text="'mdi-web'" />
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item v-for="locale in availableLocales" :key="locale.code">
          <v-btn :to="switchLocalePath(locale.code)" small text block nuxt>
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
    changeLocale () {

    }
  }
}
</script>

<style>

</style>
