import * as JWT from 'jsonwebtoken'
import MockAdapter from 'axios-mock-adapter'
export default function ({ $axios, redirect }) {
  // debugger
  const mock = new MockAdapter($axios)
  mock
    .onPost('/auth/login').reply((config) => {
      const account = 'EM102'
      const username = 'JCK'
      // const valid = true
      const expiresIn = 15
      const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
      const accessToken = JWT.sign({ account, username }, 'dummy', { expiresIn })
      const token = {
        accessToken,
        refreshToken,
        expiresIn,
        clientId: account
      }
      return [200, token]
    })
    .onGet('/auth/logout').reply(200, { status: 'OK' })
    .onGet('/auth/user').reply((config) => {
      const user = {
        account: 'EM102',
        username: 'JCK'
      }
      console.log('Returning mocked user EM102-JCK')
      // return [200, { user: { account, username, token } }]
      return [200, { user }]
    })
    .onGet('/vehicles/search')
    .reply(function (config) {
      let query = config.params.query
      if (query) {
        query = query.toLowerCase()
      }
      const vehicles = [
        {
          vehicle_number: 'E22444',
          driver_name: 'Andrew Griffith',
          description: '2012 Jeep Compass'
        },
        {
          vehicle_number: '442545',
          driver_name: 'Monty Burns',
          description: '2019 TESLA Model X'
        },
        {
          vehicle_number: '0F016D',
          driver_name: 'Jim Klonowski',
          description: '1994 Ford Bronco'
        }
      ]
      const filtered = vehicles.filter(v => v.vehicle_number.toLowerCase().includes(query))

      return [200, filtered]
    })
    .onGet('/drivers/search')
    .reply(function (config) {
      let query = config.params.query
      if (query) {
        query = query.toLowerCase()
      }
      const vehicles = [
        {
          vehicle_number: 'E22444',
          driver_name: 'Andrew Griffith',
          description: '2012 Jeep Compass'
        },
        {
          vehicle_number: '666069',
          driver_name: 'Lucien Greaves',
          description: '2012 TESLA Model S'
        },
        {
          vehicle_number: '442545',
          driver_name: 'J. Klo Klonowski',
          description: '1990 Ford Crown Victoria'
        }
      ]
      const filtered = vehicles.filter(v => v.driver_name.toLowerCase().includes(query))
      return [200, filtered]
    })

    // Mock Fuel Headers
    .onGet('/fuel-detail/columns')
    .reply(function (config) {
      // debugger
      const headers = [
        'amount',
        'bill_date',
        'bill_sort',
        'card_number',
        'center_code',
        'center_name',
        'client_use_1',
        'client_use_2',
        'client_use_3',
        'client_use_4',
        'client_use_5',
        'client_vehicle_number',
        'driver_id',
        'driver_name',
        'emkay_invoice_date',
        'emkay_invoice_number',
        'engine_fuel_type',
        'exception',
        'fuel_card_vendor',
        'fuel_company_name',
        'fuel_company_number',
        'invoice_number',
        'level_01',
        'level_02',
        'level_03',
        'merchant_address',
        'merchant_city',
        'merchant_state',
        'merchant_zip',
        'model_year',
        'odometer',
        'premium',
        'product',
        'product_type',
        'quantity',
        'service_date',
        'service_time',
        'tank_capacity',
        'tax_exempt',
        'unit_price',
        'vehicle_make',
        'vehicle_model',
        'vehicle_number',
        'vin',
        'voucher'
      ]
      return [200, headers]
    })
    // Mock Maintenance Headers
    .onGet('/maintenance-detail/columns')
    .reply(function (config) {
      const headers = [
        'active',
        'amount',
        'ata_group',
        'ata_group_description',
        'bill_sort',
        'brake_manufacturer',
        'brake_thickness',
        'center_code',
        'center_name',
        'charge_code',
        'client_use_1',
        'client_use_2',
        'client_use_3',
        'client_use_4',
        'client_use_5',
        'client_vehicle_number',
        'customer_po',
        'description',
        'driver_name',
        // 'driver_first_name',
        // 'driver_last_name',
        'engine_hours',
        'expense_category',
        'front_left_brake',
        'front_left_drum',
        'front_left_rotor',
        'front_left_tire',
        'front_right_brake',
        'front_right_drum',
        'front_right_rotor',
        'front_right_tire',
        'gl_code',
        'invoice_number',
        'labor_or_part',
        'level_01',
        'level_02',
        'level_03',
        'maintenance_category',
        'maintenance_code',
        'model_year',
        'odometer',
        'quantity',
        'rear_left_brake',
        'rear_left_drum',
        'rear_left_rotor',
        'rear_left_tire',
        'rear_right_brake',
        'rear_right_drum',
        'rear_right_rotor',
        'rear_right_tire',
        'service_date',
        'tire_manufacturer',
        'tire_model',
        'tire_size',
        'vehicle_make',
        'vehicle_model',
        'vehicle_number',
        'vendor_factor',
        'vendor_name',
        'vendor_number',
        'voucher'
      ]
      return [200, headers]
    })
    .onAny().passThrough()
  // debugger
  // $axios.onRequest((config) => {
  //   console.log(`Making request to ${config.url}`)
  // })

  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     console.log('RECEIVED 400')
  //   }
  // })
}
