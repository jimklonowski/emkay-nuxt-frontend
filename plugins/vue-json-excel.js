import Vue from 'vue'
import JsonExcel from 'vue-json-excel'

export default ({ app }) => {
  Vue.component('downloadExcel', JsonExcel)
}
