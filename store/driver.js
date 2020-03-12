import { assign, push, set } from '@/utility/vuex'

const getDefaultState = () => ({
  errors: [],
  loading: false,
  driver_details: {},
  vehicle_history: []
})

export const state = () => getDefaultState()

export const actions = {
  async init ({ commit, dispatch }, { driver }) {
    console.log(`[vuex][driver] called init with driver #${driver}`)
    try {
      commit('reset')
      commit('setLoading', true)
      await Promise.all([
        dispatch('fetchDriverDetails', { driver }),
        dispatch('fetchVehicleHistory', { driver })
      ])
    } catch (error) {
      debugger
      commit('pushError', error.message)
    } finally {
      commit('setLoading', false)
    }
  },
  async fetchDriverDetails ({ commit }, { driver }) {
    try {
      commit('setLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/driver/driver-details', { params: { driver } })
      if (!success) { throw new Error(message) }
      commit('setDriverDetails', data)
    } catch (error) {
      debugger
      commit('pushError', error.message)
      commit('setDriverDetails', {})
    } finally {
      commit('setLoading', false)
    }
  },
  async fetchVehicleHistory ({ commit }, { driver }) {
    commit('setLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/driver/vehicle-history', { params: { driver } })
      if (!success) { throw new Error(message) }
      commit('setVehicleHistory', data)
    } catch (error) {
      debugger
      commit('pushError', error.message)
      commit('setVehicleHistory', [])
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
  setLoading: set('loading'),
  pushError: push('errors'),
  setDriverDetails: set('driver_details'),
  setVehicleHistory: set('vehicle_history')
}

export const getters = {
  getErrors: state => state.errors,
  getLoading: state => state.loading,
  getDriverDetails: state => state.driver_details,
  getDriverNumber: state => state.driver_details.reference_number,
  getVehicleHistory: state => state.vehicle_history
}
