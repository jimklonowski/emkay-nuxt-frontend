import { assign, set } from '@/utility/vuex'

const getDefaultState = () => ({
  error: null,
  loading: false,
  query: '',
  results: []
})

export const state = () => getDefaultState()

export const actions = {
  async fetchVehicles ({ commit, dispatch }, filters) {
    commit('setError', null)
    commit('setLoading', true)
    try {
      // right now this only searched by vehicle_number, but will later expand to multiple search types
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      commit('setResults', data)
      if (!success) {
        throw new Error(message)
      }
    } catch (error) {
      commit('setError', error.message)
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
  setQuery: set('query'),
  setResults: set('results')
}

export const getters = {
  getError: state => state.error,
  getLoading: state => state.loading,
  getQuery: state => state.query,
  getResults: state => state.results
}
