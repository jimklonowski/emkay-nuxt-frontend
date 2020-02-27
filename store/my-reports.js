import { assign, set } from '@/utility/vuex'

const getDefaultState = () => ({
  selected_report: undefined,
  saved_reports: [],
  error: null,
  loading: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchSavedReports ({ commit }) {
    commit('setError', null)
    commit('setLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/my-reports/saved-reports')
      if (!success) { throw new Error(message) }
      commit('setSavedReports', data)
    } catch (error) {
      commit('setError', error.message)
      commit('setData', [])
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
  setSavedReports: set('saved_reports'),
  setSelectedReport: set('selected_report')
}

export const getters = {
  getError: state => state.error,
  getLoading: state => state.loading,
  getSavedReports: state => state.saved_reports,
  getSelectedReport: state => state.selected_report
}
