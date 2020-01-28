import { assign, set } from '@/utility/vuex'

const getDefaultState = () => ({
  error: null,
  vehicles: [],
  loading: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchVehicles ({ commit }, filters) {
    try {
      commit('setLoading', true)
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      if (!success) { throw new Error(message) }
      commit('setVehicles', data)
    } catch (error) {
      commit('setError', error)
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
  setError: set('error'),
  setLoading: set('loading'),
  setVehicles: set('vehicles')
}

export const getters = {
  getError: state => state.error,
  getLoading: state => state.loading,
  getVehicles: state => state.vehicles
}
