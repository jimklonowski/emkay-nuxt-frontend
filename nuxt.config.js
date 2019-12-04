import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import { en as enUS, fr as frCA, en as enCA } from 'vuetify/lib/locale'
// import nodeExternals from 'webpack-node-externals'
import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** vue.config: https://nuxtjs.org/api/configuration-vue-config
  */
  vue: {
    config: {
      productionTip: false,
      devtools: true // process.env.NODE_ENV === 'development'
    }
  },
  /*
  ** Customize vue-router https://nuxtjs.org/api/configuration-router
  */
  router: {
    base: process.env.NODE_ENV === 'production' ? '/nuxt/' : '/'
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'EMKAY :: %s',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Since 1946, EMKAY has been the premier vehicle fleet management company in North America. We are your solution for your company car needs. Contact EMKAY 630-250-7400.' },
      { hid: 'keywords', name: 'keywords', content: 'Emkay, leasing, fleet, fleet leasing, managed vehicles, corporate leasing, emkay, emkaynet, lease' },

      // Open Graph
      { hid: 'og:url', property: 'og:url', content: 'https://emkay.com' },
      { hid: 'og:title', property: 'og:title', content: 'EMKAY' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'EMKAY' }
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Loading Indicator: Unused (used in SPA apps)
  */
  // loadingIndicator: {
  //   name: 'circle',
  //   color: '#3B8070',
  //   background: 'white'
  // },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    // color: colors.deepPurple.base,
    color: colors.amber.base,
    continuous: true,
    failedColor: colors.deepOrange.accent4,
    height: '4px'
  },
  /*
  ** Global CSS
  */
  css: [
    './assets/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/custom-filters',
    '~/plugins/vue-mock-axios',
    { src: '~/plugins/vue-json-excel', ssr: false },
    { src: '~/plugins/vue-snotify', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/vuetify-module
    '@nuxtjs/vuetify',
    // Doc: https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/
    'nuxt-i18n'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: 'http://localhost:3000/api'
    baseURL: process.env.BASE_URL
    // ,credentials: true
  },
  /*
  ** Auth module configuration
  ** See https://auth.nuxtjs.org/api/options.html#redirect
  */
  auth: {
    plugins: [
      {
        // In production, we shouldn't be using mock-axios...
        src: '~/plugins/vue-mock-axios'
      }
    ],
    // cookie: false,
    // localStorage: false,
    token: {
      prefix: 'token.'
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          // the backend accepts a POST of login credentials at /auth/login and returns an object { accessToken, refreshToken, expiresIn, clientId }.  see plugins/vue-mock-axios.js
          login: { url: '/auth/login', method: 'post', propertyName: 'accessToken' },
          // the backend accepts a GET at /auth/logout that logs out the current session
          logout: { url: '/auth/logout', method: 'get' },
          // the backend accepts a GET at /auth/user that returns an object { account, username, ... }
          user: { url: '/auth/user', method: 'get', propertyName: 'user' }
          // logout: false,
        }
        // tokenRequired: true,
        // tokenType: 'Bearer'
      }
    }
  },
  /*
  ** i18n module configuration
  ** See https://nuxt-community.github.io/nuxt-i18n/
  */
  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        alt: 'enUS',
        iso: 'en-US',
        file: 'en-us.js'
      },
      {
        name: 'English (Metric)',
        code: 'en-ca',
        alt: 'enCA',
        iso: 'en-CA',
        file: 'en-ca.js'
      },
      {
        name: 'Français',
        code: 'fr-ca',
        alt: 'frCA',
        iso: 'fr-CA',
        file: 'fr-ca.js'
      }
    ],
    defaultLocale: 'en',
    // strategy: 'prefix_and_default',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    noPrefixDefaultLocale: false,
    redirectCookieKey: true,
    useRedirectCookie: true,
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      silentFallbackWarn: true
    }
  },
  /*
  ** moment.js module configuration
  ** See https://github.com/nuxt-community/moment-module
  */
  moment: {
    defaultLocale: 'en',
    locales: ['fr-ca', 'en-ca']
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    lang: {
      locales: { enUS, frCA, enCA },
      current: 'en'
    },
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        light: {
          primary: colors.deepPurple,
          accent: colors.amber.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten2
          // warning: colors.amber.base,
          // accent: '#005CAF',
        },
        dark: {
          primary: colors.deepPurple.lighten2,
          secondary: colors.grey.darken3,
          accent: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    // vendor: ['@babel/polyfill'],
    transpile: ['vuetify/lib'],
    // transpile: [/^vuetify/],
    // plugins: [new VuetifyLoaderPlugin()],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // if (process.server) {
      //   config.externals = [
      //     nodeExternals({
      //       whitelist: [/^vuetify/]
      //     })
      //   ]
      // }
    }
  }
}
