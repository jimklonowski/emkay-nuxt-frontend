import Vue from 'vue'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/material.scss'

const options = {
  toast: {
    position: SnotifyPosition.rightBottom,
    pauseOnHover: true,
    showProgressBar: true,
    closeOnClick: true,
    maxAtPosition: 4,
    maxOnScreen: 5,
    newOnTop: true,
    oneAtTime: true,
    preventDuplicates: true,
    timeout: 3000
  }
}

Vue.use(Snotify, options)

export default ({ app }, inject) => {
  app.$snotify = Snotify
}
