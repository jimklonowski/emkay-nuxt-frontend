import { set, assign } from '@/utility/vuex'

const getDefaultState = () => ({
  drivers: [],
  error: null,
  loading: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchDrivers ({ commit }) {
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
  async addDriver ({ commit, dispatch }, payload) {
    try {
      const { data: { success, message } } = await this.$axios.post('drivers/add-driver', payload)
      if (!success) { throw new Error(message) }
      await dispatch('fetchDrivers')
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      throw new Error(error.message)
    }
  },
  async updateDriver ({ commit, dispatch }, payload) {
    try {
      const { data: { success, message } } = await this.$axios.post('drivers/update-driver', payload)
      if (!success) { throw new Error(message) }
      await dispatch('fetchDrivers')
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      throw new Error(error.message)
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
