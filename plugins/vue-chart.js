/* eslint-disable vue/require-prop-types */
import Vue from 'vue'
import { Bar, Doughnut, Line, Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('bar-chart', {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
})

Vue.component('donut-chart', {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
})

Vue.component('line-chart', {
  extends: Line,
  mixins: [reactiveProp],
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
})

Vue.component('pie-chart', {
  extends: Pie,
  mixins: [reactiveProp],
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
