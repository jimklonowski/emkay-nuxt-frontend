import { assign, set } from '@/utility/vuex'
import { compareObjectByKey, multiFilter } from '@/utility/helpers'

const getDefaultState = () => ({
  error: null,
  vehicles: [],
  loading: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchVehicles ({ commit }) {
    commit('setError', null)
    commit('setLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/reports/inventory')
      if (!success) { throw new Error(message) }
      commit('setVehicles', data)
    } catch (error) {
      commit('setError', error)
      commit('setVehicles', [])
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
  getVehicles: state => state.vehicles,
  filteredVehicles: state => (filters, sortBy, order) => {
    const filtered = multiFilter(state.vehicles, filters)
    return filtered.sort(compareObjectByKey(sortBy, order))
  }
}
