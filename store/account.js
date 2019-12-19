import { set } from '@/utility/vuex'

const getDefaultState = () => ({
  center_hierarchy: null,
  custom_labels: null
})

export const state = () => getDefaultState()

export const actions = {
  /**
   * Initialize the account store after login.
   * Set custom labels, user preferences, save off the center hierarchy(?) for superfast widgets, etc.
   */
  async init ({ commit }) {
    try {
      // const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      // get custom labels
      const url = '/account/account-info'
      const { data } = await this.$axios.get(url)
      commit('setCenterHierarchy', data.center_hierarchy)
      commit('setCustomLabels', data.custom_labels)
      // ...
    } catch (error) {
      console.error(error)
    }
  },
  async logout ({ commit }) {
    // purge the current vuex state
    commit('account/reset', null, { root: true }) // saved custom labels, centers
    commit('reports/reset', null, { root: true }) // vuex data from the last report viewed
    commit('vehicle/reset', null, { root: true }) // vuex data from the last vehicle dashboard viewed
    await this.$auth.logout()
    debugger
    // if a french user is logging out, make sure we redirect to /fr-ca/login instead of /login
    this.$router.push(this.$nuxt.localePath({ name: 'login' }))
  }
}

export const mutations = {
  reset (state) {
    Object.assign(state, getDefaultState())
  },
  setCenterHierarchy: set('center_hierarchy'),
  setCustomLabels: set('custom_labels')
}

export const getters = {
  getCenterHierarchy: state => state.center_hierarchy,
  getCustomLabels: state => state.custom_labels
}
