import { assign, set, push } from '@/utility/vuex'

const getDefaultState = () => ({
  error: null,
  loading: false,
  query: '',
  results: []
})

export const state = () => getDefaultState()

export const actions = {
  async fetchVehicles ({ commit }, query) {
    commit('setLoading', true)
    commit('setResults', []) // clear previous search results
    try {
      const searchTypes = [
        'VEHICLE_NUMBER',
        'LAST_NAME',
        'FIRST_NAME',
        'CLIENT_VEHICLE_NUMBER',
        'VIN',
        'PLATE'
      ]
      // fire off all searches at once, pushing data to the results array as soon as they return
      await Promise.all(searchTypes.map(async (type) => {
        const params = { type, query }
        const { data: { success, message, data } } = await this.$axios.get('/vehicle-search', { params })
        if (success) {
          data.forEach(item => {
            commit('pushResults', item)
          })
        } else {
          console.info(message)
        }
      }))
    } catch (error) {
      debugger
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
  pushResults: push('results'),
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
