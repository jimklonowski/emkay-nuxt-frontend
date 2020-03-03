import { set, assign } from '@/utility/vuex'

const getDefaultState = () => ({
  initialized: false,
  login_messages: [],
  centers: [],
  custom_labels: {
    client_use_label_1: '',
    client_use_label_2: '',
    client_use_label_3: '',
    client_use_label_4: '',
    client_use_label_5: '',
    driver_use_label_1: '',
    driver_use_label_2: '',
    driver_use_label_3: '',
    driver_use_label_4: ''
  }
})

export const state = () => getDefaultState()

export const actions = {
  /**
   * Initialize the account store after login.
   * Set custom labels, user preferences, save off the center hierarchy(?) for superfast widgets, etc.
   */
  async init ({ dispatch, commit }) {
    console.log(`[vuex][account] called init`)
    await Promise.all([
      dispatch('fetchCustomLabels'),
      dispatch('fetchCenterHierarchy')
    ]).finally(() => {
      commit('setInitialized', true)
    })
  },
  /**
   * Fetch Custom Client Use and Driver Labels
   */
  async fetchCustomLabels ({ commit }) {
    try {
      const { data: { data, success, message } } = await this.$axios.get('/account/custom-labels')
      if (!success) { throw new Error(message) }
      commit('setCustomLabels', data)
    } catch (error) {
      // debugger
      console.error('error in fetchcustomlabels')
      console.error(error)
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
  setCustomLabels (state, data) {
    state.custom_labels = { ...state.custom_labels, ...data }
  },
  // setCustomLabels: assign('custom_labels'),
  setInitialized: set('initialized'),
  setLoginMessages: set('login_messages')
}

export const getters = {
  getCenters: state => state.centers,
  getCustomLabels: state => state.custom_labels,
  getLoginMessages: state => state.login_messages,
  isInitialized: state => state.initialized
}
