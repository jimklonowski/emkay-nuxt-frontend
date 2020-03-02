<template>
  <v-app>
    <v-container fill-height>
      <v-row justify="center">
        <v-col cols="auto">
          <v-card class="pa-4" color="transparent" flat>
            <v-card-title class="font-roboto-condensed font-weight-bold text-uppercase" style="font-size:2.5rem;">
              {{ errorTitle }}
            </v-card-title>
            <v-card-text class="d-flex flex-column">
              <p class="font-weight-light mt-2">
                {{ errorMessage }}
              </p>
              <a @click="$router.go(-1)" text>
                {{ $t('back') }}
              </a>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'nuxt-error',
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    errorMessage () {
      return (this.error.key) ? this.$i18n.t(this.error.key) : this.error.message
    },
    errorTitle () {
      return (this.error.statusCode < 500) ? this.$i18n.t('page_does_not_exist') : this.$i18n.t('an_error_occurred')
    }
  },
  head () {
    const title = this.error.key ? this.$i18n.t(this.error.key) : this.$i18n.t('an_error_occurred')
    return {
      title
    }
  }
}
</script>
