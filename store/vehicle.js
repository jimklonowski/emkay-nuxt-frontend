import { push, set, assign } from '@/utility/vuex'

const getDefaultState = () => ({
  errors: [],
  loading: false,
  initialized: false,
  vehicle_number: null,
  vehicle_details: {},
  driver_details: {},
  order_status: {},
  sale_info: {},
  transport_status: [],

  accident_history: [],
  accident_loading: false,
  billing_history: [],
  billing_loading: false,
  fuel_history: [],
  fuel_loading: false,
  maintenance_history: [],
  maintenance_loading: false,
  toll_history: [],
  toll_loading: false,
  vehicle_notes: [],
  vehicle_notes_loading: false,
  violation_history: [],
  violation_loading: false
})

export const state = () => getDefaultState()

export const actions = {
  /**
   * Called before entering a vehicle's dashboard. Populates vehicle, driver, order status, sale info
   * @param {*} vehicle Vehicle Number
   */
  async init ({ commit, dispatch }, { vehicle }) {
    try {
      commit('reset')
      commit('setLoading', true)
      await Promise.all([
        dispatch('fetchVehicleDetails', { vehicle }),
        dispatch('fetchDriverDetails', { vehicle }),
        dispatch('fetchOrderStatus', { vehicle }),
        dispatch('fetchSaleInfo', { vehicle })
      ]).finally(() => {
        commit('setInitialized', true)
      })
    } catch (error) {
      commit('pushError', error.message)
    } finally {
      commit('setLoading', false)
      commit('setVehicleNumber', vehicle)
    }
  },
  /**
   * Fetch Driver Details by Vehicle Number
   * @param {*} vehicle Vehicle Number
   */
  async fetchDriverDetails ({ commit }, { vehicle }) {
    commit('setLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/driver-details', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setDriverDetails', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setDriverDetails', {})
    } finally {
      commit('setLoading', false)
    }
  },
  /**
   * Fetch Order Status by Vehicle Number
   * @param {*} vehicle Vehicle Number
   */
  async fetchOrderStatus ({ commit }, { vehicle }) {
    commit('setLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/order-status', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setOrderStatus', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setOrderStatus', {})
    } finally {

    }
  },
  /**
   * Fetch Sale Info by Vehicle Number
   * @param {*} vehicle Vehicle Number
   */
  async fetchSaleInfo ({ commit }, { vehicle }) {
    commit('setLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/sale-info', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setSaleInfo', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setSaleInfo', {})
    } finally {
      commit('setLoading', false)
    }
  },
  /**
   * Fetch Vehicle Details by Vehicle Number
   * @param {*} vehicle Vehicle Number
   */
  async fetchVehicleDetails ({ commit }, { vehicle }) {
    commit('setLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/vehicle-details', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setVehicleDetails', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setVehicleDetails', {})
    } finally {
      commit('setLoading', false)
    }
  },
  /**
   * Fetch Fuel History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} use_bill_date Use Bill Date?
   * @param {*} vehicle Vehicle Number
   */
  async fetchFuelHistory ({ commit }, { start, end, use_bill_date, vehicle }) {
    commit('setFuelLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/fuel-history', { params: { start, end, use_bill_date, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setFuelHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setFuelHistory', [])
    } finally {
      commit('setFuelLoading', false)
    }
  },
  /**
   * Fetch Maintenance History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} use_bill_date Use Bill Date?
   * @param {*} vehicle Vehicle Number
   */
  async fetchMaintenanceHistory ({ commit }, { start, end, use_bill_date, vehicle }) {
    commit('setMaintenanceLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/maintenance-history', { params: { start, end, use_bill_date, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setMaintenanceHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setMaintenanceHistory', [])
    } finally {
      commit('setMaintenanceLoading', false)
    }
  },
  /* TODO: */
  /**
   * Fetch Accident History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchAccidentHistory ({ commit }, { start, end, vehicle }) {
    commit('setAccidentLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/accident-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setAccidentHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setAccidentHistory', [])
    } finally {
      commit('setAccidentLoading', false)
    }
  },
  /**
   * Fetch Billing History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchBillingHistory ({ commit }, { start, end, vehicle }) {
    commit('setBillingLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/billing-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setBillingHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setBillingHistory', [])
    } finally {
      commit('setBillingLoading', false)
    }
  },
  /**
   * Fetch Vehicle Notes by Vehicle Number
   * @param {*} vehicle Vehicle Number
   */
  async fetchVehicleNotes ({ commit }, { vehicle }) {
    commit('setVehicleNotesLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/notes', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setVehicleNotes', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setVehicleNotes', [])
    } finally {
      commit('setVehicleNotesLoading', false)
    }
  },
  /**
   * Fetch Toll History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchTollHistory ({ commit }, { start, end, vehicle }) {
    commit('setTollLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/toll-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setTollHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setTollHistory', [])
    } finally {
      commit('setTollLoading', false)
    }
  },
  /**
   * Fetch Violation History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchViolationHistory ({ commit }, { start, end, vehicle }) {
    commit('setViolationLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/violation-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setViolationHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setViolationHistory', [])
    } finally {
      commit('setViolationLoading', false)
    }
  },
  reset ({ commit }) {
    commit('reset')
  }
}

export const mutations = {
  reset: assign(getDefaultState()),
  pushError: push('errors'),
  setInitialized: set('initialized'),
  setLoading: set('loading'),

  setDriverDetails: set('driver_details'),
  setVehicleDetails: set('vehicle_details'),

  setOrderStatus: set('order_status'),
  setSaleInfo: set('sale_info'),

  setAccidentHistory: set('accident_history'),
  setAccidentLoading: set('accident_loading'),

  setBillingHistory: set('billing_history'),
  setBillingLoading: set('billing_loading'),

  setFuelHistory: set('fuel_history'),
  setFuelLoading: set('fuel_loading'),

  setMaintenanceHistory: set('maintenance_history'),
  setMaintenanceLoading: set('maintenance_loading'),

  setVehicleNotes: set('vehicle_notes'),
  setVehicleNotesLoading: set('vehicle_notes_loading'),

  setTollHistory: set('toll_history'),
  setTollLoading: set('toll_loading'),

  setViolationHistory: set('violation_history'),
  setViolationLoading: set('violation_loading'),

  setVehicleNumber: set('vehicle_number')
}

export const getters = {
  getErrors: state => state.errors,
  getInitialized: state => state.initialized,
  getLoading: state => state.loading,

  getDriverDetails: state => state.driver_details,
  getVehicleDetails: state => state.vehicle_details,

  // getDriverInfo: state => state.driver_info,
  // getVehicleInfo: state => state.vehicle_info,

  getOrderStatus: state => state.order_status,
  hasOrderStatus: state => !!state.order_status && Object.keys(state.order_status).length !== 0,

  getAccidentHistory: state => state.accident_history,
  getAccidentLoading: state => state.accident_loading,

  getBillingHistory: state => state.billing_history,
  getBillingLoading: state => state.billing_loading,

  getFuelHistory: state => state.fuel_history,
  getFuelLoading: state => state.fuel_loading,

  getMaintenanceHistory: state => state.maintenance_history,
  getMaintenanceLoading: state => state.maintenance_loading,

  getVehicleNotes: state => state.vehicle_notes,
  getVehicleNotesLoading: state => state.vehicle_notes_loading,

  getTollHistory: state => state.toll_history,
  getTollLoading: state => state.toll_loading,

  getViolationHistory: state => state.violation_history,
  getViolationLoading: state => state.violation_loading,

  getVehicleNumber: state => state.vehicle_number
}
