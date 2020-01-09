import { set, assign } from '@/utility/vuex'

const getDefaultState = () => ({
  quote: null,
  error: null,
  loading: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchQuote ({ commit }, params) {
    commit('setError', null)
    commit('setLoading', true)
    try {
      const url = '/transtor/quote'
      const { data } = await this.$axios.post(url, params)
      commit('setQuote', data)
    } catch (error) {
      commit('setError', error.message)
      commit('setQuote', null)
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
  setQuote: set('quote')
}

export const getters = {
  getError: state => state.error,
  getQuote: state => state.quote,
  getLoading: state => state.loading,
  hasQuote: state => !!state.quote
}
