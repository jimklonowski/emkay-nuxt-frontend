<template>
  <v-app>
    <emkay-navigation />
    <v-content>
      <ordering-navigation :menu="menu" />
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
import { ordering } from '@/static/data/menus'
import EmkayFooter from '@/components/EmkayFooter'
import EmkayNavigation from '@/components/EmkayNavigation'
import OrderingNavigation from '@/components/ordering/OrderingNavigation'
/**
 * Ordering Layout page
 */
export default {
  components: {
    EmkayFooter,
    EmkayNavigation,
    OrderingNavigation
  },
  computed: {
    menu () {
      return ordering
    }
  },
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
