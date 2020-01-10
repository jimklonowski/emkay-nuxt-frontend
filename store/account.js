import { set, assign } from '@/utility/vuex'

const getDefaultState = () => ({
  login_messages: [],
  centers: [],
  client_use_labels: {
    client_use_1_label: '',
    client_use_2_label: '',
    client_use_3_label: '',
    client_use_4_label: '',
    client_use_5_label: ''
  },
  driver_misc_labels: {
    driver_misc_1_label: '',
    driver_misc_2_label: '',
    driver_misc_3_label: '',
    driver_misc_4_label: ''
  }
})

export const state = () => getDefaultState()

export const actions = {
  /**
   * Initialize the account store after login.
   * Set custom labels, user preferences, save off the center hierarchy(?) for superfast widgets, etc.
   */
  async init ({ dispatch, commit }) {
    try {
      // const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      // get custom labels
      // const url = '/account/account-info'
      await dispatch('fetchCustomLabels')
      await dispatch('fetchCenterHierarchy')
      // const { data: { login_messages, center_hierarchy, custom_labels } } = await this.$axios.get(url)
      // commit('setLoginMessages', login_messages)
      // commit('setCenterHierarchy', center_hierarchy)
      // commit('setCustomLabels', custom_labels)
      // ...
    } catch (error) {
      console.error(error)
    }
  },
  // Fetch Custom Labels
  async fetchCustomLabels ({ commit }) {
    try {
      const url = '/account/custom-labels'
      const { data: { client_use_labels, driver_misc_labels } } = await this.$axios.get(url)
      commit('setClientUseLabels', client_use_labels)
      commit('setDriverMiscLabels', driver_misc_labels)
    } catch (error) {
      console.log(error)
      debugger
    }
  },
  async fetchCenterHierarchy ({ commit }) {
    const url = `/account/centers`
    const { data: { centers } } = await this.$axios.get(url)
    commit('setCenters', centers)
  },
  async logout ({ commit }) {
    // purge the current vuex state
    commit('account/reset', null, { root: true }) // saved custom labels, centers
    commit('reports/reset', null, { root: true }) // vuex data from the last report viewed
    commit('vehicle/reset', null, { root: true }) // vuex data from the last vehicle dashboard viewed
    await this.$auth.logout()
    // if a french user is logging out, make sure we redirect to /fr-ca/login instead of /login
    // this.$router.push(this.app.localePath({ name: 'login' }))
  },
  reset ({ commit }) {
    commit('reset')
  }
}

export const mutations = {
  reset: assign(getDefaultState()),
  setCenters: set('centers'),
  setClientUseLabels: set('client_use_labels'),
  setDriverMiscLabels: set('driver_misc_labels'),
  setLoginMessages: set('login_messages')
}

export const getters = {
  getCenters: state => state.centers,
  getClientUseLabels: state => state.client_use_labels,
  getDriverMiscLabels: state => state.driver_misc_labels,
  getLoginMessages: state => state.login_messages,
  isInitialized: state => !!state.client_use_labels.client_use_1_label
}
