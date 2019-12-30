import { assign, set, push } from '@/utility/vuex'

const getDefaultState = () => ({
  error: null,
  loading: false,
  query: '',
  results: []
})

export const state = () => getDefaultState()

export const actions = {
  async fetchVehicles ({ commit, dispatch }, { filters, cancelToken }) {
    // commit('reset')
    commit('setResults', [])
    try {
      const searchTypes = [
        'VEHICLE_NUMBER',
        'LAST_NAME',
        'FIRST_NAME'
        // 'CLIENT_VEHICLE_NUMBER'
        // 'VIN',
        // 'PLATE',
      ]
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      await Promise.all(searchTypes.map(async (searchType) => {
        const f = { ...filters, ...{ search_type: searchType } }
        // get vehicles and push them to the results when ready
        const { data: { success, message, data } } = await this.$axios.post(url, f, cancelToken)
        // debugger
        if (!success) { console.error('error: ' + message) }
        if (data && data.length !== 0) {
          data.forEach(item => {
            commit('pushResults', item)
          })
        }
      }))
      // get vehicles by vehicle number
      // const { data: { success, message, data } } = await this.$axios.post(url, filters, cancelToken)
    } catch (error) {
      debugger
      console.log(error)
    } finally {
      commit('setLoading', false)
    }
  },
  async fetchVehicles2 ({ commit, dispatch }, { filters, cancelToken }) {
    commit('setError', null)
    commit('setLoading', true)
    try {
      // right now this only searched by vehicle_number, but will later expand to multiple search types
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters, cancelToken)
      commit('setResults', data)
      if (!success) {
        throw new Error(message)
      }
    } catch (error) {
      debugger
      if (this.$axios.isCancel(error)) {
        console.log('REQUEST CANCELLED!')
      } else {
        commit('setError', error.message)
      }
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
