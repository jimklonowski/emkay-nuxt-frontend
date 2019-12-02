import Vue from 'vue'
// import { formatDate, formatCurrency } from '@/utility/helpers'

export default ({ app }) => {
  // filter: format currency
  Vue.filter('currency', (value) => {
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
    return formatter.format(value)
  })
  // filter: format date
  Vue.filter('date', (value) => {
    if (value) {
      return app.$moment(value).format('L')
    }
  })
}
