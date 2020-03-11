import { set, assign } from '@/utility/vuex'

const getDefaultState = () => ({
  drivers: [],
  error: null,
  loading: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchDrivers ({ commit }, params) {
    try {
      commit('setLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/fleet/drivers')
      if (!success) { throw new Error(message) }
      commit('setDrivers', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setDrivers', [])
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
