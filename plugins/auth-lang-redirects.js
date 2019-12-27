export default function ({ app, $auth }) {
  // https://github.com/nuxt-community/auth-module/pull/185#issuecomment-485020573
  if (app.i18n.locale === 'ca') {
    $auth.options.redirect = {
      login: '/ca/login',
      logout: '/ca/login',
      home: '/ca',
      callback: false
    }
  } else if (app.i18n.locale === 'fr') {
    $auth.options.redirect = {
      login: '/fr/login',
      logout: '/fr/login',
      home: '/fr',
      callback: false
    }
  } else {
    $auth.options.redirect = {
      login: '/login',
      logout: '/login',
      home: '/',
      callback: false
    }
  }
}
