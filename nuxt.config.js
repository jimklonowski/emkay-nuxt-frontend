// import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import path from 'path'
import fs from 'fs'
import { en, fr, en as ca } from 'vuetify/lib/locale'
import colors from 'vuetify/es5/util/colors'
import locales from './plugins/i18n/locales'
require('dotenv').config()

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '127.0.0.1',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'))
    }
    // timing: {
    //   total: true
    // }
  },
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
      // {
      //   src: 'https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js'
      // }
      // {
      //   src: 'https://cdn.jsdelivr.net/npm/idempotent-babel-polyfill@7.4.4/lib/index.min.js'
      // }
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
    // color: colors.amber.base,
    color: colors.deepPurple.base,
    continuous: true,
    failedColor: colors.deepOrange.accent4,
    height: '4px'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false },
    '~/plugins/axios',
    '~/plugins/custom-filters',
    '~/plugins/vue-mock-axios',
    '~/plugins/vee-validate',
    '~/plugins/i18n/vue-i18n',
    { src: '~/plugins/polyfills', ssr: false },
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
    '@nuxtjs/moment',
    // Doc: https://github.com/nuxt-community/analytics-module
    '@nuxtjs/google-analytics'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // // Doc: https://github.com/lewyuburi/nuxt-validate
    // 'nuxt-validate',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/
    'nuxt-i18n',
    // Doc: https://github.com/nuxt-community/sitemap-module
    '@nuxtjs/sitemap',
    // Doc: https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
    'cookie-universal-nuxt',
    // Doc: https://github.com/Developmint/nuxt-webfontloader
    'nuxt-webfontloader',
    // Doc: https://github.com/bazzite/nuxt-optimized-images
    '@bazzite/nuxt-optimized-images'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL,
    browserBaseURL: process.env.BASE_URL,
    credentials: true
    // ,timeout: 5
  },
  /*
  ** Auth module configuration
  ** See https://auth.nuxtjs.org/api/options.html#redirect
  */
  auth: {
    // localStorage: false,
    // cookie: {
    //   options: {
    //     expires: 7
    //   }
    // },
    plugins: [
      { src: '~/plugins/vue-mock-axios' },
      { src: '~/plugins/auth-lang-redirects', ssr: false }
    ],
    // token: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post'
          },
          logout: {
            url: '/logout',
            method: 'post'
          },
          // user: false
          user: {
            url: '/user',
            method: 'get',
            propertyName: false // use the entire response as the user object
          }
        },
        // used for cookie-only flows
        tokenRequired: false,
        tokenType: false
      }
    },
    redirect: {
      login: '/login', // User will be redirected to this path if login is required.
      logout: '/login', // User will be redirected to this path if after logout, current route is protected.
      home: '/', // User will be redirected to this path after login. (rewriteRedirects will rewrite this path)
      callback: false
    }
  },
  // auth: {
  //   plugins: [
  //     {
  //       // In production, we shouldn't be using mock-axios...
  //       src: '~/plugins/vue-mock-axios'
  //     },
  //     { src: '~/plugins/auth-lang-redirects', ssr: false }
  //   ],
  //   // cookie: false,
  //   // localStorage: false,
  //   token: {
  //     prefix: 'token.'
  //   },
  //   redirect: {
  //     login: '/login',
  //     logout: '/login',
  //     home: '/',
  //     callback: false
  //   },
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         // the backend accepts a POST of login credentials at /login
  //         login: { url: '/login', method: 'post', propertyName: false },
  //         // the backend accepts a GET at /logout that logs out the current session
  //         logout: { url: '/logout', method: 'post' },
  //         // the backend accepts a GET at /user that returns an object { account, username, ... }
  //         user: { url: '/user', method: 'get', propertyName: 'user' }
  //         // logout: false,
  //       }
  //       // tokenRequired: true,
  //       // tokenType: 'Bearer'
  //     }
  //   }
  // },
  /*
  ** i18n module configuration
  ** See https://nuxt-community.github.io/nuxt-i18n/
  */
  i18n: {
    locales,
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
    },
    langDir: 'lang/',
    lazy: true,
    // seo: false,
    strategy: 'prefix_except_default',
    vuex: {
      moduleName: 'i18n',
      syncLocale: true
    },
    vueI18n: {
      fallbackLocale: 'en',
      silentFallbackWarn: true
    }
  },
  /*
   ** google analytics module configuration
   ** See: https://github.com/nuxt-community/analytics-module
   */
  googleAnalytics: {
    id: process.env.GA_ID || '',
    dev: true,
    debug: {
      enabled: false, // disable debug console.logs
      sendHitTask: true
    }
  },
  /*
  ** webfontloader configuration
  ** See: https://github.com/Developmint/nuxt-webfontloader
  ** Also: https://github.com/nuxt-community/vuetify-module
  ** Note: https://github.com/nuxt-community/vuetify-module#defaultassets
  */
  webfontloader: {
    google: {
      families: ['Roboto', 'Roboto+Condensed', 'Lato']
    }
  },
  /*
  ** nuxt-optimized-images configuration
  ** See: https://github.com/bazzite/nuxt-optimized-images
  ** Also: https://www.bazzite.com/docs/nuxt-optimized-images/#features
  */
  optimizedImages: {
    optimizeImages: true
  },
  /*
  ** moment.js module configuration
  ** See https://github.com/nuxt-community/moment-module
  */
  moment: {
    defaultLocale: 'en',
    locales: ['fr-ca', 'en-ca'],
    // This doesn't work.  Setting $nuxt.$moment.suppressDeprecationWarnings = true does work.
    suppressDeprecationWarnings: true
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    lang: {
      // locales: { enUS, frCA, enCA },
      locales: { en, fr, ca },
      current: 'en'
    },
    customVariables: ['~/assets/styles/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
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
  ** robots.txt configuration
  */
  robots: {
    UserAgent: '*',
    Disallow: process.env.NODE_ENV === 'production' ? '' : '/',
    Sitemap: '/sitemap.xml'
  },
  /*
  ** sitemap configuration
  */
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.ifoo.bar',
    // generate: true,
    exclude: [],
    routes: []
  },
  /*
  ** dotenv configuration
  */
  env: {
    BASE_URL: process.env.BASE_URL,
    EMKAY_API: process.env.EMKAY_API,
    FLEET_DASHBOARD_URL: process.env.FLEET_DASHBOARD_URL,
    GA_ID: process.env.GA_ID
  },
  /*
  ** Build configuration
  */
  build: {
    html: {
      // Fix hydration errors? https://github.com/nuxt/nuxt.js/issues/5800#issuecomment-570110683
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    },
    profile: true,
    // vendor: ['@babel/polyfill'],
    transpile: ['vee-validate/dist/rules', 'vuetify'],
    // transpile: [/^vuetify/],
    // plugins: [new VuetifyLoaderPlugin()],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // run ESLint on save
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
        // config.devtool = '#source-map'
        // config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
        // config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map'
      }
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
