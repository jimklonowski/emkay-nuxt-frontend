import { set, assign } from '@/utility/vuex'

const getDefaultState = () => ({
  data: [],
  error: null,
  loading: false
})

export const state = () => getDefaultState()

export const actions = {
  // Moved column logic to report computed property
  // /**
  //  * Get an array of strings that represent the report columns given the report name.
  //  * For testing: Mocked response from /fuel-report/columns, /maintenance-report/columns, etc...
  //  */
  // async fetchColumns ({ commit, state }) {
  //   commit('setLoading', true)
  //   try {
  //     const { data } = await this.$axios.get(`${state.report}/columns`)
  //     commit('setColumns', data)
  //   } catch (error) {
  //     debugger
  //     commit('setError', error)
  //   } finally {
  //     commit('setLoading', false)
  //   }
  // },
  // /**
  //  * Get an array of TableHeader[] objects for configuring the report datatable
  //  * https://vuetifyjs.com/en/components/data-tables
  //  */
  // async fetchHeaders ({ commit, dispatch, state }) {
  //   // debugger
  //   try {
  //     await dispatch('fetchColumns').then(() => {
  //       let headers = []
  //       headers = state.columns.map((column) => {
  //         return {
  //           text: this.$i18n.t(column),
  //           value: column,
  //           class: 'report-column'
  //         }
  //       })
  //       commit('setHeaders', headers)
  //     })
  //   } catch (error) {
  //     debugger
  //     commit('setError', error)
  //   }
  // },
  /**
   * Get the data using the generic webcom url (dev)
   * @param {*} filters The dbc command, subcommand, and other params
   */
  async fetchData ({ commit }, filters) {
    commit('setError', null)
    commit('setLoading', true)
    try {
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      commit('setData', data)
      if (!success) {
        throw new Error(message)
      }
    } catch (error) {
      // debugger
      console.error(`ERROR: ${error}`)
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
  setData: set('data'),
  setError: set('error'),
  setLoading: set('loading')
  // setColumns: set('columns'),
  // setDownloadHeaders: set('downloadHeaders'),
  // setHeaders: set('headers'),
  // setReport: set('report'),
}

export const getters = {
  getError: state => state.error,
  getLoading: state => state.loading,
  getData: state => state.data
  // getColumns: state => state.columns,
  // getDownloadHeaders: state => state.downloadHeaders,
  // getHeaders: state => state.headers,
  // getReport: state => state.report
}
