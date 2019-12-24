/* eslint-disable arrow-parens */
import Vue from 'vue'
import { formatCurrency } from '@/utility/helpers'

export default ({ app }) => {
  // format currency. Default: two decimals. can be used as | currency(0, 0) to show only dollars
  Vue.filter('currency', formatCurrency)

  // format date (uses current locale)
  Vue.filter('date', value => {
    if (value) {
      return app.$moment(value).format('L')
    }
  })

  // string: capitalize
  Vue.filter('capitalize', (value, options) => {
    const globalOptions = (this && this.capitalize) ? this.capitalize : {}
    options = options || globalOptions
    const onlyFirstLetter = options.onlyFirstLetter != null ? options.onlyFirstLetter : false
    if (!value && value !== 0) { return '' }
    if (onlyFirstLetter === true) {
      return value.toString().charAt(0).toUpperCase() + value.toString().slice(1)
    } else {
      value = value.toString().toLowerCase().split(' ')
      return value.map(function (item) {
        return item.charAt(0).toUpperCase() + item.slice(1)
      }).join(' ')
    }
  })

  // string: make lowercase
  Vue.filter('lowercase', value => {
    return (value || value === 0)
      ? value.toString().toLowerCase()
      : ''
  })
}
