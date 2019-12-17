import Vue from 'vue'
import { formatCurrency } from '@/utility/helpers'

export default ({ app }) => {
  // filter: format currency. Default: two decimals. can be used as | currency(0, 0) to show only dollars
  Vue.filter('currency', formatCurrency)
  // filter: format date
  Vue.filter('date', (value) => {
    if (value) {
      return app.$moment(value).format('L')
    }
  })
}
