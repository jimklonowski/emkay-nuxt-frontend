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
          <!-- Vee-Validate form wrapper -->
          <ValidationObserver v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(login)">
              <v-card-title v-text="$t('login')" />
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('account')" rules="required">
                        <v-text-field
                          v-model="account"
                          :label="$t('account')"
                          :error-messages="errors"
                          :success="valid"
                          autocomplete="organization"
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <ValidationProvider v-slot="{ errors, valid }" :name="$t('username')" rules="required">
                        <v-text-field
                          v-model="username"
                          :label="$t('username')"
                          :error-messages="errors"
                          :success="valid"
                          autocomplete="username"
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <ValidationProvider v-slot="{ errors }" :name="$t('password')" rules="required">
                        <v-text-field
                          v-model="password"
                          :label="$t('password')"
                          :error-messages="errors"
                          type="password"
                          autocomplete="current-password"
                        />
                      </ValidationProvider>
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
                  :ripple="false"
                  type="submit"
                  color="primary"
                  large
                  depressed
                  block
                >
                  {{ $t('login') }}
                </v-btn>
                <v-btn
                  tabindex="-1"
                  small
                  text
                  block
                >
                  {{ $t('forgot_password') }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { SnotifyPosition } from 'vue-snotify'
export default {
  name: 'Login',
  auth: 'guest',
  data: () => ({
    account: '',
    username: '',
    password: '',
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
  mounted () {
    // debugger
  },
  methods: {
    ...mapActions({
      loginLocal: 'account/login'
    }),
    async login () {
      try {
        this.loading = true
        await this.loginLocal({ account: this.account, username: this.username, password: this.password })
      } catch (error) {
        this.$snotify.error(error.message, this.$i18n.t('error'), { position: SnotifyPosition.centerBottom })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style>
/* Chrome Autofill background, unfortunately this doesn't work when supporting dark AND light themes */
/* input:-webkit-autofill { transition: all 0s 50000s; } */
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
