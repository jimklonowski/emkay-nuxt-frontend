import { set, assign } from '@/utility/vuex'

const getDefaultState = () => ({
  login_messages: [],
  center_hierarchy: {},
  custom_labels: {
    client_use_label_1: 'Client Use Label 1',
    client_use_label_2: 'Client Use Label 2',
    client_use_label_3: 'Client Use Label 3',
    client_use_label_4: 'Client Use Label 4',
    client_use_label_5: 'Client Use Label 5'
  }
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
      const { data: { login_messages, center_hierarchy, custom_labels } } = await this.$axios.get(url)
      debugger
      commit('setLoginMessages', login_messages)
      commit('setCenterHierarchy', center_hierarchy)
      commit('setCustomLabels', custom_labels)
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
    // if a french user is logging out, make sure we redirect to /fr-ca/login instead of /login
    this.$router.push(this.localePath({ name: 'login' }))
  },
  reset ({ commit }) {
    commit('reset')
  }
}

export const mutations = {
  reset: assign(getDefaultState()),
  setCenterHierarchy: set('center_hierarchy'),
  setCustomLabels: set('custom_labels'),
  setLoginMessages: set('login_messages')
}

export const getters = {
  getCenterHierarchy: state => state.center_hierarchy,
  getCustomLabels: state => state.custom_labels,
  getLoginMessages: state => state.login_messages
}
