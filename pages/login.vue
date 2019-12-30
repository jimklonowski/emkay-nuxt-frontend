<template>
  <v-container class="login-hero" fill-height>
    <v-row justify="center">
      <v-col cols="auto">
        <v-card
          :loading="loading"
          :min-width="300"
          :style="{ opacity: $vuetify.theme.dark ? 0.7 : 1.0 }"
          outlined
          raised
        >
          <v-form ref="form" @submit.prevent="login">
            <v-card-title v-t="'login'" />
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="account" :label="$t('account')" autocomplete="organization" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="username" :label="$t('username')" autocomplete="username" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="password" :label="$t('password')" type="password" autocomplete="current-password" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-checkbox v-model="remember" :label="$t('remember_me')" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="flex-column">
              <v-btn
                v-t="'login'"
                :ripple="false"
                type="submit"
                color="primary"
                large
                depressed
                block
              />
              <v-btn
                v-t="'forgot_password'"
                tabindex="-1"
                small
                text
                block
              />
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  auth: 'guest',
  data: () => ({
    account: '',
    username: '',
    password: '',

    error: null,
    loading: false,
    remember: false
  }),
  head () {
    const title = this.$t('login')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  methods: {
    async login () {
      // https://github.com/nuxt-community/auth-module/blob/feat/refresh/examples/demo/pages/login.vue
      // https://github.com/nuxt-community/auth-module/blob/feat/refresh/examples/api/auth.js
      this.loading = true
      await this.$auth
        .loginWith('local', {
          data: {
            account: this.account,
            username: this.username,
            password: this.password
          }
        })
        .then(() => {
          // debugger
          this.$nuxt.$axios.setToken(this.$nuxt.$auth.getToken(this.$nuxt.$auth.strategy.name))
          this.$store.dispatch('account/init')
        })
        .catch(e => {
          this.error = e + ''
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style>
input:-webkit-autofill { transition: all 0s 50000s; }
.login-hero::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.theme--dark .login-hero::before {
  background-image: url(~@/assets/coveredcar--dark.jpg);
  opacity: 0.5;
}
.theme--light .login-hero::before {
  background-image: url(~@/assets/coveredcar--light.jpg);
  opacity: 1.0;
}
</style>
