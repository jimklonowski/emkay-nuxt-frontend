export default ({ app }) => {
  const setLocale = (locale) => {
    switch (locale) {
      case 'ca': {
        app.vuetify.framework.lang.current = 'ca'
        app.$moment.locale('en-ca')
        break
      }
      case 'fr': {
        app.vuetify.framework.lang.current = 'fr'
        app.$moment.locale('fr-ca')
        break
      }
      case 'en': // fallthrough as default
      default: {
        app.vuetify.framework.lang.current = 'en'
        app.$moment.locale('en')
        break
      }
    }
  }
  if (process.browser) {
    if (app.i18n.locale) {
      console.log(`Lang: ${app.i18n.locale}`)
      setLocale(app.i18n.locale)
    }
  }
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    console.log(`Switching Lang: ${oldLocale} => ${newLocale}`)
    setLocale(newLocale)
  }
}
