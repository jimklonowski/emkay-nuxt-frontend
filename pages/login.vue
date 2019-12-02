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
            <v-card-title v-t="'auth.login'" />
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="account" :label="$t('auth.account')" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="username" :label="$t('auth.username')" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="password" :label="$t('auth.password')" type="password" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-checkbox v-model="remember" :label="$t('auth.remember_me')" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="flex-column">
              <v-btn
                v-t="'auth.login'"
                :ripple="false"
                type="submit"
                color="primary"
                large
                depressed
                block
              />
              <v-btn
                v-t="'auth.forgot_password'"
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
  methods: {
    async login () {
      // https://github.com/nuxt-community/auth-module/blob/feat/refresh/examples/demo/pages/login.vue
      // https://github.com/nuxt-community/auth-module/blob/feat/refresh/examples/api/auth.js
      this.loading = true
      // const loginLocale = this.$i18n.locale
      await this.$auth
        .loginWith('local', {
          data: {
            account: this.account,
            username: this.username,
            password: this.password
          }
        })
        .catch((e) => {
          // debugger
          this.error = e + ''
        })
        .finally((a) => {
          this.loading = false
          debugger
          this.$router.push(this.localePath({ name: 'index' }))
        })
      // forward them to /{locale}/index.vue (i.e. /fr/)
      // this.$router.push(this.localePath({ name: 'index' }))
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
