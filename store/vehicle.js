import { set, assign } from '@/utility/vuex'

const getDefaultState = () => ({
  error: null,
  loading: false,
  driver_info: {},
  sale_info: {},
  order_status: {},
  vehicle_info: {},

  fuel_error: null,
  fuel_history: [],
  fuel_loading: false,

  maintenance_error: null,
  maintenance_history: [],
  maintenance_loading: false,

  toll_error: null,
  toll_history: [],
  toll_loading: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchVehicleDashboardSummary ({ commit }, filters) {
    commit('setLoading', true)
    try {
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { success, message, data } } = await this.$axios.post(url, filters)
      // debugger
      if (!success) {
        throw new Error(message)
      }
      commit('setVehicleInfo', data.vehicle_info)
      commit('setDriverInfo', data.driver_info)
      commit('setSaleInfo', data.sale_info)
      commit('setOrderStatus', data.order_status_info)
    } catch (error) {
      // console.error(error)
      commit('setError', error)
      commit('setVehicleInfo', {})
      commit('setDriverInfo', {})
      commit('setSaleInfo', {})
      commit('setOrderStatus', {})
    } finally {
      commit('setLoading', false)
    }
  },
  async fetchFuelHistory ({ commit }, filters) {
    commit('setFuelLoading', true)
    try {
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { data, success, message } } = await this.$axios.post(url, filters)
      if (!success) {
        throw new Error(message)
      }
      commit('setFuelHistory', data)
    } catch (error) {
      // console.error(error)
      commit('setFuelError', error.message)
      commit('setFuelHistory', [])
    } finally {
      commit('setFuelLoading', false)
    }
  },
  async fetchMaintenanceHistory ({ commit }, filters) {
    commit('setMaintenanceError', null)
    commit('setMaintenanceLoading', true)
    try {
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { data, success, message } } = await this.$axios.post(url, filters)
      if (!success) {
        throw new Error(message)
      }
      commit('setMaintenanceHistory', data)
    } catch (error) {
      commit('setMaintenanceError', error.message)
      commit('setMaintenanceHistory', [])
    } finally {
      commit('setMaintenanceLoading', false)
    }
  },
  async fetchTollHistory ({ commit }, filters) {
    commit('setTollError', null)
    commit('setTollLoading', true)
    try {
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { data, success, message } } = await this.$axios.post(url, filters)
      if (!success) {
        throw new Error(message)
      }
      commit('setTollHistory', data)
    } catch (error) {
      commit('setTollError', error.message)
      commit('setTollHistory', [])
    } finally {
      commit('setTollLoading', false)
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

  setFuelError: set('fuel_error'),
  setFuelHistory: set('fuel_history'),
  setFuelLoading: set('fuel_loading'),

  setMaintenanceError: set('maintenance_error'),
  setMaintenanceHistory: set('maintenance_history'),
  setMaintenanceLoading: set('maintenance_loading'),

  setTollError: set('toll_error'),
  setTollHistory: set('toll_history'),
  setTollLoading: set('toll_loading'),

  setDriverInfo: set('driver_info'),
  setSaleInfo: set('sale_info'),
  setOrderStatus: set('order_status'),
  setVehicleInfo: set('vehicle_info')
}

export const getters = {
  getError: state => state.error,
  getLoading: state => state.loading,

  getDriverInfo: state => state.driver_info,

  getFuelError: state => state.fuel_error,
  getFuelHistory: state => state.fuel_history,
  getFuelLoading: state => state.fuel_loading,

  getMaintenanceError: state => state.maintenance_error,
  getMaintenanceHistory: state => state.maintenance_history,
  getMaintenanceLoading: state => state.maintenance_loading,

  getTollError: state => state.toll_error,
  getTollHistory: state => state.toll_history,
  getTollLoading: state => state.toll_loading,

  getSaleInfo: state => state.sale_info,
  getOrderStatus: state => state.order_status,

  getVehicleInfo: state => state.vehicle_info,
  getVehicleNumber: state => state.vehicle_info.vehicle_number
}
