/* eslint-disable import/namespace */
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize, configure } from 'vee-validate'
import en from 'vee-validate/dist/locale/en.json'
import fr from 'vee-validate/dist/locale/fr.json'
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

  Vue.component('ValidationProvider', ValidationProvider)
  Vue.component('ValidationObserver', ValidationObserver)
  localize('en', en)
  localize('fr', fr)
  localize('ca', en)
}
