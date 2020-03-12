import { assign, set } from '@/utility/vuex'

const getDefaultState = () => ({
  accident_history: [],
  accident_loading: false,
  billing_history: [],
  billing_loading: false,
  driver_details: {},
  driver_number: null,
  fuel_history: [],
  fuel_loading: false,
  inspection_history: [],
  inspection_loading: false,
  licensing_history: [],
  licensing_loading: false,
  maintenance_history: [],
  maintenance_loading: false,
  odometer_history: [],
  odometer_loading: false,
  order_status: {},
  rental_history: [],
  rental_loading: false,
  sale_info: {},
  toll_history: [],
  toll_loading: false,
  vehicle_details: {},
  vehicle_number: null,
  violation_history: [],
  violation_loading: false
})

export const state = () => getDefaultState()

export const actions = {
  /**
   * Called first when entering a vehicle's dashboard.
   * @param {*} vehicle Vehicle Number
   */
  async init ({ commit, dispatch }, { vehicle }) {
    console.log(`[vuex][vehicle-dashboard]: called init for #${vehicle}`)
    await Promise.all([
      dispatch('fetchVehicleDetails', { vehicle }),
      dispatch('fetchDriverDetails', { vehicle }),
      dispatch('fetchOrderStatus', { vehicle }),
      dispatch('fetchSaleInfo', { vehicle })
    ]).then(() => {
      commit('setVehicleNumber', vehicle)
    })
  },
  /**
   * Fetch Vehicle Details
   * @param {*} vehicle Vehicle Number
   */
  async fetchVehicleDetails ({ commit }, { vehicle }) {
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/vehicle-details', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setVehicleDetails', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setVehicleDetails', {})
    }
  },
  /**
   * Fetch Driver Details
   * MAYBE WE SHOULD USE THE DRIVER STORE INSTEAD?
   * @param {*} vehicle Vehicle Number
   */
  async fetchDriverDetails ({ commit }, { vehicle }) {
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/driver-details', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setDriverDetails', data)
      commit('setDriverNumber', data.reference_number)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setDriverDetails', {})
    }
  },
  /**
   * Fetch Order Status
   * @param {*} vehicle Vehicle Number
   */
  async fetchOrderStatus ({ commit }, { vehicle }) {
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/order-status', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setOrderStatus', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setOrderStatus', {})
    }
  },
  /**
   * Fetch Sale Info
   * @param {*} vehicle Vehicle Number
   */
  async fetchSaleInfo ({ commit }, { vehicle }) {
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/sale-info', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setSaleInfo', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setSaleInfo', {})
    }
  },
  /**
   * Fetch Billing History between two dates
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchBillingHistory ({ commit }, { start, end, vehicle }) {
    try {
      commit('setBillingLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/billing-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setBillingHistory', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setBillingHistory', [])
    } finally {
      commit('setBillingLoading', false)
    }
  },
  /**
   * Fetch Licensing History between two dates
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchLicensingHistory ({ commit }, { start, end, vehicle }) {
    try {
      commit('setLicensingLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/licensing-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setLicensingHistory', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setLicensingHistory', [])
    } finally {
      commit('setLicensingLoading', false)
    }
  },
  /**
   * Fetch Fuel History between two dates
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} use_bill_date Use Bill Date?
   * @param {*} vehicle Vehicle Number
   */
  async fetchFuelHistory ({ commit }, { start, end, use_bill_date, vehicle }) {
    try {
      commit('setFuelLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/fuel-history', { params: { start, end, use_bill_date, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setFuelHistory', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setFuelHistory', [])
    } finally {
      commit('setFuelLoading', false)
    }
  },
  /**
   * Fetch Maintenance History between two dates
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} use_bill_date Use Bill Date?
   * @param {*} vehicle Vehicle Number
   */
  async fetchMaintenanceHistory ({ commit }, { start, end, use_bill_date, vehicle }) {
    try {
      commit('setMaintenanceLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/maintenance-history', { params: { start, end, use_bill_date, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setMaintenanceHistory', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setMaintenanceHistory', [])
    } finally {
      commit('setMaintenanceLoading', false)
    }
  },
  /**
   * Fetch Odometer History between two dates
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchOdometerHistory ({ commit }, { start, end, vehicle }) {
    try {
      commit('setOdometerLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/odometer-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setOdometerHistory', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setOdometerHistory', [])
    } finally {
      commit('setOdometerLoading', false)
    }
  },
  /**
   * Fetch Toll History between two dates
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchTollHistory ({ commit }, { start, end, vehicle }) {
    try {
      commit('setTollLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/toll-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setTollHistory', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setTollHistory', [])
    } finally {
      commit('setTollLoading', false)
    }
  },
  /**
   * Fetch Accident History between two dates
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchAccidentHistory ({ commit }, { start, end, vehicle }) {
    try {
      commit('setAccidentLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/accident-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setAccidentHistory', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setAccidentHistory', [])
    } finally {
      commit('setAccidentLoading', false)
    }
  },
  /**
   * Fetch Rental History between two dates
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchRentalHistory ({ commit }, { start, end, vehicle }) {
    try {
      commit('setRentalLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/rental-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setRentalHistory', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setRentalHistory', [])
    } finally {
      commit('setRentalLoading', false)
    }
  },
  /**
   * Fetch Violation History between two dates
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchViolationHistory ({ commit }, { start, end, vehicle }) {
    try {
      commit('setViolationLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/violation-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setViolationHistory', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setViolationHistory', [])
    } finally {
      commit('setViolationLoading', false)
    }
  },
  /**
   * Fetch Inspection History between two dates
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchInspectionHistory ({ commit }, { start, end, vehicle }) {
    try {
      commit('setInspectionLoading', true)
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/inspection-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setInspectionHistory', data)
    } catch (error) {
      console.error(`[vuex error]: ${error.message}`)
      commit('setInspectionHistory', [])
    } finally {
      commit('setInspectionLoading', false)
    }
  },
  reset ({ commit }) {
    commit('reset')
  }
}

export const mutations = {
  reset: assign(getDefaultState()),
  setAccidentHistory: set('accident_history'),
  setAccidentLoading: set('accident_loading'),
  setBillingHistory: set('billing_history'),
  setBillingLoading: set('billing_loading'),
  setDriverDetails: set('driver_details'),
  setDriverNumber: set('driver_number'),
  setFuelHistory: set('fuel_history'),
  setFuelLoading: set('fuel_loading'),
  setInspectionHistory: set('inspection_history'),
  setInspectionLoading: set('inspection_loading'),
  setLicensingHistory: set('licensing_history'),
  setLicensingLoading: set('licensing_loading'),
  setMaintenanceHistory: set('maintenance_history'),
  setMaintenanceLoading: set('maintenance_loading'),
  setOdometerHistory: set('odometer_history'),
  setOdometerLoading: set('odometer_loading'),
  setOrderStatus: set('order_status'),
  setRentalHistory: set('rental_history'),
  setRentalLoading: set('rental_loading'),
  setSaleInfo: set('sale_info'),
  setTollHistory: set('toll_history'),
  setTollLoading: set('toll_loading'),
  setVehicleDetails: set('vehicle_details'),
  setVehicleNumber: set('vehicle_number'),
  setViolationHistory: set('violation_history'),
  setViolationLoading: set('violation_loading')
}

export const getters = {
  getAccidentHistory: state => state.accident_history,
  getAccidentLoading: state => state.accident_loading,
  getBillingHistory: state => state.billing_history,
  getBillingLoading: state => state.billing_loading,
  getDriverDetails: state => state.driver_details,
  getDriverNumber: state => state.driver_number,
  getFuelHistory: state => state.fuel_history,
  getFuelLoading: state => state.fuel_loading,
  getInspectionHistory: state => state.inspection_history,
  getInspectionLoading: state => state.inspection_loading,
  getLicensingHistory: state => state.licensing_history,
  getLicensingLoading: state => state.licensing_loading,
  getMaintenanceHistory: state => state.maintenance_history,
  getMaintenanceLoading: state => state.maintenance_loading,
  getOdometerHistory: state => state.odometer_history,
  getOdometerLoading: state => state.odometer_loading,
  getOrderStatus: state => state.order_status,
  getRentalHistory: state => state.rental_history,
  getRentalLoading: state => state.rental_loading,
  getSaleInfo: state => state.sale_info,
  getTollHistory: state => state.toll_history,
  getTollLoading: state => state.toll_loading,
  getVehicleDetails: state => state.vehicle_details,
  getVehicleNumber: state => state.vehicle_number,
  getViolationHistory: state => state.violation_history,
  getViolationLoading: state => state.violation_loading,
  hasOrderStatus: state => !!state.order_status && Object.keys(state.order_status).length !== 0,
  hasSaleInfo: state => !!state.sale_info && !!state.sale_info.sale_date
}
