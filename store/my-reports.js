import { assign, set } from '@/utility/vuex'

const getDefaultState = () => ({
  column_groups: [],
  report_data: [],
  report_loading: false,
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
  saved_reports: [],
  selected_report: undefined,
  suggested_emails: []
})

export const state = () => getDefaultState()

export const actions = {
  async init ({ commit, dispatch }) {
    console.log('Fetching saved reports and emails')
    await Promise.all([
      dispatch('fetchSavedReports'),
      dispatch('fetchSuggestedEmails')
    ])
  },
  /**
   * Fetch Available My Reports Column Groups
   * @param {*} reportType
   */
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
  /**
   * Fetch My Report Data
   * @param {*} reportConfig
   */
  async fetchReportData ({ commit }, reportConfig) {
    try {
      commit('setReportLoading', true)
      // const { data: { success, message, data } } = await this.$axios.post('/my-reports/build-report', reportConfig)
      // if (!success) { throw new Error(message) }
      await console.log('TODO: fetch data')
      const data = [
        { 'center_code': '001', 'vehicle_number': 'E22444' },
        { 'center_code': 'A01', 'vehicle_number': 'E22445' },
        { 'center_code': 'B01', 'vehicle_number': 'E22446' }
      ]
      commit('setReportData', data)
    } catch (error) {
      commit('setReportData', [])
    } finally {
      commit('setReportLoading', false)
    }
  },
  async fetchSavedReports ({ commit }) {
    try {
      const { data: { success, message, data } } = await this.$axios.get('/my-reports/saved-reports')
      if (!success) { throw new Error(message) }
      commit('setSavedReports', data)
    } catch (error) {
      commit('setData', [])
    }
  },
  async fetchSuggestedEmails ({ commit }) {
    try {
      // const { data: { success, message, data } } = await this.$axios.get('/my-reports/suggested-emails')
      // if (!success) { throw new Error(message) }
      await console.log('TODO: suggested emails')
      const emails = [
        'agriffith@emkay.com',
        'jklonowski@emkay.com',
        'jim@jimklonowski.com'
      ]
      commit('setSuggestedEmails', emails)
    } catch (error) {
      commit('setSuggestedEmails', [])
    }
  },
  reset ({ commit }) {
    commit('reset')
  }
}

export const mutations = {
  reset: assign(getDefaultState()),
  setColumnGroups: set('column_groups'),
  setReportData: set('report_data'),
  setReportLoading: set('report_loading'),
  setSavedReports: set('saved_reports'),
  setSelectedReport: set('selected_report'),
  setSuggestedEmails: set('suggested_emails')
}

export const getters = {
  getColumnGroups: state => state.column_groups,
  getReportData: state => state.report_data,
  getReportLoading: state => state.report_loading,
  getReportTypes: state => state.report_types,
  getSavedReports: state => state.saved_reports,
  getSelectedReport: state => state.selected_report,
  getSuggestedEmails: state => state.suggested_emails
}
