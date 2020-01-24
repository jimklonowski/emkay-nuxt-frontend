import { push, set, assign } from '@/utility/vuex'

const getDefaultState = () => ({
  errors: [],
  loading: false,

  vehicle_number: null,

  driver_info: {},
  vehicle_info: {},

  accident_history: [],
  accident_loading: false,

  billing_history: [],
  billing_loading: false,

  fuel_history: [],
  fuel_loading: false,

  maintenance_history: [],
  maintenance_loading: false,

  vehicle_notes: [],
  vehicle_notes_loading: false,

  toll_history: [],
  toll_loading: false,

  violation_history: [],
  violation_loading: false,

  order_status: {},
  transport_status: []
})

export const state = () => getDefaultState()

export const actions = {
  /**
   * Called before entering a vehicle's dashboard. Populates vehicle/driver, order status
   * @param {*} vehicle_number
   */
  async init ({ commit, dispatch }, vehicle_number) {
    try {
      commit('reset')
      commit('setLoading', true)
      await Promise.all([
        dispatch('fetchVehicleAndDriver', vehicle_number),
        dispatch('fetchOrderStatus', vehicle_number)
      ])
    } catch (error) {
      commit('pushError', error)
    } finally {
      commit('setLoading', false)
    }
  },
  /**
   * Fetch Vehicle and Driver details
   */
  async fetchVehicleAndDriver ({ commit }, vehicle_number) {
    try {
      const filters = {
        command: 'WEBVEHICLE',
        customer: 'EM102',
        vehicle_number,
        json: 'Y'
      }
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      if (!success) { throw new Error(message) }
      commit('setVehicleInfo', data.vehicle_info)
      commit('setDriverInfo', data.driver_info)
      commit('setVehicleNumber', vehicle_number)
    } catch (error) {
      // debugger
      commit('pushError', error)
    }
  },
  /**
   * Fetch Order Status
   */
  async fetchOrderStatus ({ commit }, vehicle_number) {
    try {
      const filters = {
        command: 'VEHICLEORDERSTATUS',
        customer: 'EM102',
        vehicle_number,
        json: 'Y'
      }
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      // eslint-disable-next-line
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      if (!Object.keys(data).length) { throw new Error(message) }
      commit('setOrderStatus', data)
    } catch (error) {
      // debugger
      commit('pushError', error)
    }
  },
  /**
   * Fetch Accident History
   */
  async fetchAccidentHistory ({ commit }, { filters }) {
    try {
      commit('setAccidentLoading', true)
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      if (!success) { throw new Error(message) }
      commit('setAccidentHistory', data)
    } catch (error) {
      commit('pushError', error)
    } finally {
      commit('setAccidentLoading', false)
    }
  },
  /**
   * Fetch Billing History
   */
  async fetchBillingHistory ({ commit }, { filters }) {
    try {
      commit('setBillingLoading', true)
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      if (!success) { throw new Error(message) }
      commit('setBillingHistory', data)
    } catch (error) {
      commit('pushError', error)
    } finally {
      commit('setBillingLoading', false)
    }
  },
  /**
   * Fetch Fuel History
   */
  async fetchFuelHistory ({ commit }, { filters }) {
    try {
      commit('setFuelLoading', true)
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      if (!success) { throw new Error(message) }
      commit('setFuelHistory', data)
    } catch (error) {
      commit('pushError', error)
    } finally {
      commit('setFuelLoading', false)
    }
  },
  /**
   * Fetch Maintenance History
   */
  async fetchMaintenanceHistory ({ commit }, { filters }) {
    try {
      commit('setMaintenanceLoading', true)
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      if (!success) { throw new Error(message) }
      commit('setMaintenanceHistory', data)
    } catch (error) {
      commit('pushError', error)
    } finally {
      commit('setMaintenanceLoading', false)
    }
  },
  /**
   * Fetch Vehicle Notes
   */
  async fetchVehicleNotes ({ commit }, { filters }) {
    try {
      commit('setVehicleNotesLoading', true)
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      if (!success) { throw new Error(message) }
      commit('setVehicleNotes', data)
    } catch (error) {
      commit('pushError', error)
    } finally {
      commit('setVehicleNotesLoading', false)
    }
  },
  /**
   * Fetch Toll History
   */
  async fetchTollHistory ({ commit }, { filters }) {
    try {
      commit('setTollLoading', true)
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      if (!success) { throw new Error(message) }
      commit('setTollHistory', data)
    } catch (error) {
      commit('pushError', error)
    } finally {
      commit('setTollLoading', false)
    }
  },
  /**
   * Fetch Violation History
   */
  async fetchViolationHistory ({ commit }, { filters }) {
    try {
      commit('setViolationLoading', true)
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      if (!success) { throw new Error(message) }
      commit('setViolationHistory', data)
    } catch (error) {
      commit('pushError', error)
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
  setLoading: set('loading'),

  setDriverInfo: set('driver_info'),
  setVehicleInfo: set('vehicle_info'),
  setOrderStatus: set('order_status'),

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
  getLoading: state => state.loading,

  getDriverInfo: state => state.driver_info,
  getVehicleInfo: state => state.vehicle_info,

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
