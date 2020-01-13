import { set, assign } from '@/utility/vuex'

const getDefaultState = () => ({
  drivers: [],
  error: null,
  loading: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchDrivers ({ commit }, params) {
    commit('setError', null)
    commit('setLoading', true)
    try {
      const url = '/fleet/drivers'
      const { data: { drivers } } = await this.$axios.get(url, params)
      commit('setDrivers', drivers)
    } catch (error) {
      commit('setError', error.message)
      commit('setDrivers', [])
      console.error(error)
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
  setDrivers: set('drivers'),
  setError: set('error'),
  setLoading: set('loading')
}

export const getters = {
  getDrivers: state => state.drivers,
  getError: state => state.error,
  getLoading: state => state.loading
}
