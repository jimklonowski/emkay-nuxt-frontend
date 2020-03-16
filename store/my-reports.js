import { assign, set } from '@/utility/vuex'

const getDefaultState = () => ({
  column_groups: [],
  report_types: [
    {
      type: 'accident',
      icon: 'mdi-car-parking-lights'
    },
    {
      type: 'billing',
      icon: 'mdi-receipt'
    },
    {
      type: 'expense',
      icon: 'mdi-cash-usd'
    },
    {
      type: 'fuel',
      icon: 'mdi-gas-station'
    },
    {
      type: 'maintenance',
      icon: 'mdi-tools'
    },
    {
      type: 'vehicle',
      icon: 'mdi-car'
    },
    {
      type: 'violation',
      icon: 'mdi-shield-car'
    }
  ],
  selected_report: undefined,
  saved_reports: [],
  error: null,
  loading: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchColumnGroups ({ commit }, reportType) {
    try {
      const { data: { success, message, data } } = await this.$axios.get('/my-reports/columns', { params: { reportType } })
      if (!success) { throw new Error(message) }
      // filter out blank groups and sort columns
      const filteredData = data.filter(x => x.columns && !!x.columns.length && x.columns.sort())
      commit('setColumnGroups', filteredData)
    } catch (error) {
      commit('setColumnGroups', [])
      throw error
    }
  },
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
  setColumnGroups: set('column_groups'),
  setError: set('error'),
  setLoading: set('loading'),
  setSavedReports: set('saved_reports'),
  setSelectedReport: set('selected_report')
}

export const getters = {
  getColumnGroups: state => state.column_groups,
  getError: state => state.error,
  getLoading: state => state.loading,
  getReportTypes: state => state.report_types,
  getSavedReports: state => state.saved_reports,
  getSelectedReport: state => state.selected_report
}
