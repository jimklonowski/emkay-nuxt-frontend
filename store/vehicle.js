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

  accident_history: [],
  accidents_loading: false,
  billing_history: [],
  billing_loading: false,
  documents: [],
  documents_loading: false,
  expense_summary: {},
  expense_summary_loading: false,
  fuel_cards: [],
  fuel_cards_loading: false,
  fuel_history: [],
  fuel_loading: false,
  fuel_profiles: [],
  fuel_profiles_loading: false,
  inspection_history: [],
  inspections_loading: false,
  licensing_history: [],
  licensing_loading: false,
  maintenance_cost_containment_history: [],
  maintenance_cost_containment_loading: false,
  maintenance_history: [],
  maintenance_loading: false,
  notes: [],
  notes_loading: false,
  odometer_history: [],
  odometer_loading: false,
  rental_history: [],
  rentals_loading: false,
  toll_history: [],
  tolls_loading: false,
  transport_status: [],
  transport_status_loading: false,
  violation_history: [],
  violations_loading: false
})

export const state = () => getDefaultState()

export const actions = {
  /**
   * Called before entering a vehicle's dashboard. Populates vehicle, driver, order status, sale info
   * @param {*} vehicle Vehicle Number
   */
  async init ({ commit, dispatch }, { vehicle }) {
    console.log(`[vuex][vehicle] called init with vehicle #${vehicle}`)
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
      // populate driver_details in driver store with driver data
      commit('driver/setDriverDetails', data, { root: true })
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
   * Fetch Expense Summary by Vehicle Number
   * @param {*} vehicle Vehicle Number
   */
  async fetchExpenseSummary ({ commit }, { vehicle }) {
    commit('setExpenseSummaryLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/expense-summary', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setExpenseSummary', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setExpenseSummary', {})
    } finally {
      commit('setExpenseSummaryLoading', false)
    }
  },
  /**
   * Fetch Toll History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchTollHistory ({ commit }, { start, end, vehicle }) {
    commit('setTollsLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/toll-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setTollHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setTollHistory', [])
    } finally {
      commit('setTollsLoading', false)
    }
  },
  /* TODO: */
  /**
   * Fetch Inspection History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchInspectionHistory ({ commit }, { start, end, vehicle }) {
    commit('setInspectionsLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/inspections', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setInspectionHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setInspectionHistory', [])
    } finally {
      commit('setInspectionsLoading', false)
    }
  },
  /**
   * Fetch Fuel Cards by Vehicle Number
   */
  async fetchFuelCards ({ commit }, { vehicle }) {
    commit('setFuelCardsLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/fuel-cards', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setFuelCards', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setFuelCards', [])
    } finally {
      commit('setFuelCardsLoading', false)
    }
  },
  async fetchFuelProfiles ({ commit }, { vehicle }) {
    commit('setFuelProfilesLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/fuel-profiles', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setFuelProfiles', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setFuelProfiles', [])
    } finally {
      commit('setFuelProfilesLoading', false)
    }
  },
  /**
   * Fetch Transport Status by Vehicle Number
   * @param {*} vehicle Vehicle Number
   */
  async fetchTransportStatus ({ commit }, { vehicle }) {
    commit('setTransportStatusLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/transport-status', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setTransportStatus', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setTransportStatus', [])
    } finally {
      commit('setTransportStatusLoading', false)
    }
  },
  /**
   * Fetch Maintenance Cost Containment by Vehicle Number
   * @param {*} vehicle Vehicle Number
   */
  async fetchMaintenanceCostContainmentHistory ({ commit }, { vehicle }) {
    commit('setMaintenanceCostContainmentLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/maintenance-cost-containment', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setMaintenanceCostContainmentHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setMaintenanceCostContainmentHistory', [])
    } finally {
      commit('setMaintenanceCostContainmentLoading', false)
    }
  },
  /**
   * Fetch Rental History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchRentalHistory ({ commit }, { start, end, vehicle }) {
    commit('setRentalsLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/rental-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setRentalHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setRentalHistory', [])
    } finally {
      commit('setRentalsLoading', false)
    }
  },
  /**
   * Fetch Odometer History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle
   */
  async fetchOdometerHistory ({ commit }, { start, end, vehicle }) {
    commit('setOdometerLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/odometer-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setOdometerHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setOdometerHistory', [])
    } finally {
      commit('setOdometerLoading', false)
    }
  },
  /**
   * Fetch Accident History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchAccidentHistory ({ commit }, { start, end, vehicle }) {
    commit('setAccidentsLoading', true)
    try {
      // const { data: { success, message, data } } = await this.$axios.get('/vehicle/accident-history', { params: { start, end, vehicle } })
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/accident-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setAccidentHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setAccidentHistory', [])
    } finally {
      commit('setAccidentsLoading', false)
    }
  },
  /**
   * Fetch Vehicle Documents by Vehicle Number
   * @param {*} vehicle Vehicle Number
   */
  async fetchDocuments ({ commit }, { vehicle }) {
    commit('setDocumentsLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/documents', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setDocuments', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setDocuments', [])
    } finally {
      commit('setDocumentsLoading', false)
    }
  },
  /**
   * Fetch Vehicle Notes by Vehicle Number
   * @param {*} vehicle Vehicle Number
   */
  async fetchNotes ({ commit }, { vehicle }) {
    commit('setNotesLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/notes', { params: { vehicle } })
      if (!success) { throw new Error(message) }
      commit('setNotes', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setNotes', [])
    } finally {
      commit('setNotesLoading', false)
    }
  },
  /**
   * Fetch Violation History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchViolationHistory ({ commit }, { start, end, vehicle }) {
    commit('setViolationsLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/violation-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setViolationHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setViolationHistory', [])
    } finally {
      commit('setViolationsLoading', false)
    }
  },
  /**
   * Fetch Licensing History by Vehicle Number
   * @param {*} start Start Date
   * @param {*} end End Date
   * @param {*} vehicle Vehicle Number
   */
  async fetchLicensingHistory ({ commit }, { start, end, vehicle }) {
    commit('setLicensingLoading', true)
    try {
      const { data: { success, message, data } } = await this.$axios.get('/vehicle/licensing-history', { params: { start, end, vehicle } })
      if (!success) { throw new Error(message) }
      commit('setLicensingHistory', data)
    } catch (error) {
      commit('pushError', error.message)
      commit('setLicensingHistory', [])
    } finally {
      commit('setLicensingLoading', false)
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
  setAccidentsLoading: set('accidents_loading'),

  setBillingHistory: set('billing_history'),
  setBillingLoading: set('billing_loading'),

  setDocuments: set('documents'),
  setDocumentsLoading: set('documents_loading'),

  setFuelCards: set('fuel_cards'),
  setFuelCardsLoading: set('fuel_cards_loading'),

  setFuelHistory: set('fuel_history'),
  setFuelLoading: set('fuel_loading'),

  setFuelProfiles: set('fuel_profiles'),
  setFuelProfilesLoading: set('fuel_profiles_loading'),

  setInspectionHistory: set('inspection_history'),
  setInspectionsLoading: set('inspections_loading'),

  setLicensingHistory: set('licensing_history'),
  setLicensingLoading: set('licensing_loading'),

  setMaintenanceCostContainmentHistory: set('maintenance_cost_containment_history'),
  setMaintenanceCostContainmentLoading: set('maintenance_cost_containment_loading'),

  setMaintenanceHistory: set('maintenance_history'),
  setMaintenanceLoading: set('maintenance_loading'),

  setOdometerHistory: set('odometer_history'),
  setOdometerLoading: set('odometer_loading'),

  setExpenseSummary: set('expense_summary'),
  setExpenseSummaryLoading: set('expense_summary_loading'),

  setRentalHistory: set('rental_history'),
  setRentalsLoading: set('rentals_loading'),

  setNotes: set('notes'),
  setNotesLoading: set('notes_loading'),

  setTollHistory: set('toll_history'),
  setTollsLoading: set('tolls_loading'),

  setTransportStatus: set('transport_status'),
  setTransportStatusLoading: set('transport_status_loading'),

  setViolationHistory: set('violation_history'),
  setViolationsLoading: set('violations_loading'),

  setVehicleNumber: set('vehicle_number')
}

export const getters = {
  getErrors: state => state.errors,
  getInitialized: state => state.initialized,
  getLoading: state => state.loading,
  vehicleExists: state => !!state.vehicle_details && Object.keys(state.vehicle_details).length !== 0,

  getDriverDetails: state => state.driver_details,
  getVehicleDetails: state => state.vehicle_details,

  // getDriverInfo: state => state.driver_info,
  // getVehicleInfo: state => state.vehicle_info,

  getOrderStatus: state => state.order_status,
  hasOrderStatus: state => !!state.order_status && Object.keys(state.order_status).length !== 0,

  getAccidentHistory: state => state.accident_history,
  getAccidentsLoading: state => state.accidents_loading,

  getBillingHistory: state => state.billing_history,
  getBillingLoading: state => state.billing_loading,

  getFuelHistory: state => state.fuel_history,
  getFuelLoading: state => state.fuel_loading,

  getFuelCards: state => state.fuel_cards,
  getFuelCardsLoading: state => state.fuel_cards_loading,

  getFuelProfiles: state => state.fuel_profiles,
  getFuelProfilesLoading: state => state.fuel_profiles_loading,

  getInspectionHistory: state => state.inspection_history,
  getInspectionsLoading: state => state.inspections_loading,

  getLicensingHistory: state => state.licensing_history,
  getLicensingLoading: state => state.licensing_loading,

  getMaintenanceCostContainmentHistory: state => state.maintenance_cost_containment_history,
  getMaintenanceCostContainmentLoading: state => state.maintenance_cost_containment_loading,

  getMaintenanceHistory: state => state.maintenance_history,
  getMaintenanceLoading: state => state.maintenance_loading,

  getOdometerHistory: state => state.odometer_history,
  getOdometerLoading: state => state.odometer_loading,

  getExpenseSummary: state => state.expense_summary,
  getExpenseSummaryLoading: state => state.expense_summary_loading,

  getRentalHistory: state => state.rental_history,
  getRentalsLoading: state => state.rentals_loading,

  getTransportStatus: state => state.transport_status,
  getTransportStatusLoading: state => state.transport_status_loading,

  getDocuments: state => state.documents,
  getDocumentsLoading: state => state.documents_loading,

  getNotes: state => state.notes,
  getNotesLoading: state => state.notes_loading,

  getTollHistory: state => state.toll_history,
  getTollsLoading: state => state.tolls_loading,

  getViolationHistory: state => state.violation_history,
  getViolationsLoading: state => state.violations_loading,

  getDriverNumber: state => state.driver_details.reference_number,
  getVehicleNumber: state => state.vehicle_number,
  hasVehicle: state => !!state.vehicle_number,
  hasDriver: state => !!state.driver_details.reference_number
}
