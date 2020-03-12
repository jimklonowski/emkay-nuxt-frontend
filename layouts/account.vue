<template>
  <v-app>
    <emkay-navigation />
    <v-content>
      <account-navigation :menu="menu" />
      <v-container>
        <v-row>
          <v-col cols="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <emkay-footer />
    <client-only>
      <vue-snotify />
    </client-only>
  </v-app>
</template>

<script>
import { account } from '@/static/data/menus'
import EmkayFooter from '@/components/EmkayFooter'
import EmkayNavigation from '@/components/EmkayNavigation'
import AccountNavigation from '@/components/account/AccountNavigation'
/**
 * Account Management Layout page
 */
export default {
  components: {
    EmkayFooter,
    EmkayNavigation,
    AccountNavigation
  },
  computed: {
    menu () {
      // load the menu json from static/data/menus and pass it to AccountNavigation component
      return account
    }
  },
  // All pages with the account layout will require auth
  middleware: ['check-auth'],
  head () {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale || 'en'
      }
    }
  },
  mounted () {
    this.$meta().setOptions({ debounceWait: 50 })
  }
}
</script>

<style>

</style>
