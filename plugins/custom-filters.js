import Vue from 'vue'
// import { formatDate, formatCurrency } from '@/utility/helpers'

export default ({ app }) => {
  // filter: format currency. Default: two decimals. can be used as | currency(0, 0) to show only dollars
  Vue.filter('currency', (value, minDigits = 2, maxDigits = 2) => {
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: minDigits, maximumFractionDigits: maxDigits })
    return formatter.format(value)
  })
  // filter: format date
  Vue.filter('date', (value) => {
    if (value) {
      return app.$moment(value).format('L')
    }
  })
}
