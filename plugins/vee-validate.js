/* eslint-disable import/namespace */
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize, configure } from 'vee-validate'
import en from 'vee-validate/dist/locale/en.json'
import fr from 'vee-validate/dist/locale/fr.json'
// import moment from 'moment'
// import only the rules needed, then extend them
// import { required, email, max, min } from 'vee-validate/dist/rules'
// extend('required', required)
// ...
// OR import all rules and loop to extend
import * as rules from 'vee-validate/dist/rules'

export default ({ app }) => {
  configure({
    defaultMessage: (_, values) =>
      app.i18n.t(`validations.${values._rule_}`, values)
  })

  for (const rule in rules) {
    extend(rule, rules[rule])
  }

  extend('after', {
    params: ['other'],
    validate (value, { other }) {
      // debugger
      return app.$moment(value).isAfter(app.$moment(other))
    },
    message: (field, { other }) => {
      // debugger
      return app.i18n.t(`validations.after`, [app.i18n.t(field), app.i18n.t(other)])
    }
    // message: (field, target) => {
    //   return app.i18n.t()
    //   // return app.i18n.t(`validations.after`, [app.i18n.t(field), app.i18n.t(target)])
    // }
  })

  Vue.component('ValidationProvider', ValidationProvider)
  Vue.component('ValidationObserver', ValidationObserver)
  localize('en', en)
  localize('fr', fr)
  localize('ca', en)
}
