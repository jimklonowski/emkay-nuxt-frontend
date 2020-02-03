import { set, assign } from '@/utility/vuex'

/**
 * All report data can share the same vuex store, since we can't be on two different reports at the same time in this Vue app.
 */
const getDefaultState = () => ({
  data: [],
  error: null,
  loading: false
})

export const state = () => getDefaultState()

export const actions = {
  /**
   * Fetch inventory report data.  No parameters are supplied.
   */
  async fetchInventoryReport ({ commit }) {
    commit('setError', null)
    commit('setLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/reports/inventory')
      if (success) {
        commit('setData', data)
      } else {
        console.info(message)
      }
    } catch (error) {
      commit('setError', error.message)
      commit('setData', [])
    } finally {
      commit('setLoading', false)
    }
  },
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
  setData: set('data'),
  setError: set('error'),
  setLoading: set('loading')
}

export const getters = {
  getError: state => state.error,
  getLoading: state => state.loading,
  getData: state => state.data
}
