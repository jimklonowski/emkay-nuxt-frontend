import { set, assign } from '@/utility/vuex'
import { flatten } from '@/utility/helpers'

const getDefaultState = () => ({
  initialized: false,
  login_messages: [],
  centers: [],
  center_levels: {
    level_01: 'level_01',
    level_02: 'level_02',
    level_03: 'level_03',
    level_04: 'level_04',
    level_05: 'level_05',
    level_06: 'level_06',
    level_07: 'level_07',
    level_08: 'level_08',
    level_09: 'level_09',
    level_10: 'level_10'
  },
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
      dispatch('fetchCenterHierarchy'),
      dispatch('fetchCenterLevels')
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
  async updateCustomLabels ({ commit, dispatch }, payload) {
    try {
      const { data: { success, message } } = await this.$axios.post('/account/update-labels', payload)
      if (!success) { throw new Error(message) }
      await dispatch('fetchCustomLabels')
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      throw new Error(error.message)
    }
  },
  async fetchCenterHierarchy ({ commit }) {
    try {
      const { data: { data, success, message } } = await this.$axios.get('/account/centers')
      if (!success) { throw new Error(message) }
      commit('setCenters', data)
    } catch (error) {
      console.error('error in fetchCenterHierarchy')
      // console.error(error)
    }
  },
  async fetchCenterLevels ({ commit }) {
    try {
      const { data: { data, success, message } } = await this.$axios.get('/account/center-levels')
      if (!success) { throw new Error(message) }
      commit('setCenterLevels', data)
    } catch (error) {
      debugger
      console.error(`[vuex error]: ${error.message}`)
      // console.error(error)
    }
  },
  async login ({ commit, dispatch }, credentials) {
    await this.$auth.loginWith('local', { data: credentials }).then(async () => {
      if (this.$auth.loggedIn && this.$auth.user.token) {
        // save session cookie
        this.$cookies.set('SESSIONID', this.$auth.user.token)
        await dispatch('account/init', null, { root: true })
      } else {
        throw new Error(`[${this.$i18n.t('login')}]: ${this.$i18n.t('invalid_login')}`)
      }
    })
  },
  async logout ({ commit }) {
    // purge the current vuex state
    commit('account/reset', null, { root: true }) // saved custom labels, centers
    commit('reports/reset', null, { root: true }) // vuex data from the last report viewed
    commit('vehicle-dashboard/reset', null, { root: true }) // vuex data from the last vehicle dashboard viewed
    commit('drivers/reset', null, { root: true }) // vuex data from drivers
    this.$cookies.remove('SESSIONID')
    // if (process.client) {
    await this.$auth.logout()
    // }
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
  setCenterLevels: set('center_levels'),
  setCustomLabels (state, data) {
    state.custom_labels = { ...state.custom_labels, ...data }
  },
  // setCustomLabels: assign('custom_labels'),
  setInitialized: set('initialized'),
  setLoginMessages: set('login_messages')
}

export const getters = {
  getCenters: state => state.centers,
  getCenterLevels: state => state.center_levels,
  getClientLabels: state => Object.entries(state.custom_labels).map(([key, value]) => ({ key, value })).slice(0, 5),
  getCustomLabels: state => state.custom_labels,
  getDriverLabels: state => Object.entries(state.custom_labels).map(([key, value]) => ({ key, value })).slice(5),
  getLoginMessages: state => state.login_messages,
  isInitialized: state => state.initialized,
  getFlattenedCenters: state => flatten(state.centers)
}
