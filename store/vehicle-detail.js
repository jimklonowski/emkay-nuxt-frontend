import { assign, set } from '@/utility/vuex'

const getDefaultState = () => ({
  data: [],
  error: null,
  loading: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchData ({ commit }, { filters }) {
    try {
      commit('reset')
      commit('setLoading', true)
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      commit('setData', data)
      if (!success) { throw new Error(message) }
    } catch (error) {
      commit('setError', error)
    } finally {
      commit('setLoading', false)
    }
  },
  /**
   * Fetch Billing History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   * @see vehicle.js fetchBillingHistory
   */
  async fetchBillingHistory ({ commit }, { start, end, vehicle }) {
    commit('setLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/billing-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setData', data)
    } catch (error) {
      commit('setError', error.message)
      commit('setData', [])
    } finally {
      commit('setLoading', false)
    }
  },
  /**
   * Fetch Toll History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   * @see vehicle.js fetchTollHistory
   */
  async fetchTollHistory ({ commit }, { start, end, vehicle }) {
    commit('setLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/toll-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setData', data)
    } catch (error) {
      commit('setError', error.message)
      commit('setData', [])
    } finally {
      commit('setLoading', false)
    }
  },
  reset ({ commit }) {
    commit('reset')
  }
}

export const mutations = {
  reset: assign(getDefaultState()),
  setData: set('data'),
  setError: set('error'),
  setLoading: set('loading')
}

export const getters = {
  getError: state => state.error,
  getLoading: state => state.loading,
  getData: state => state.data
}
