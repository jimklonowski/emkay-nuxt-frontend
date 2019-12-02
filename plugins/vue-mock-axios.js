import * as JWT from 'jsonwebtoken'
import MockAdapter from 'axios-mock-adapter'
export default function ({ $axios, redirect }) {
  // debugger
  const mock = new MockAdapter($axios)
  mock
    .onPost('/auth/login').reply((config) => {
      return [200]
    })
    .onPost('/auth/logout').reply(200, { status: 'OK' })
    .onGet('/auth/user').reply((config) => {
      // debugger
      // const data = JSON.parse(config.data)
      const account = 'EM102'
      const username = 'TEST'
      const valid = true
      const expiresIn = 15
      const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1

      if (!valid) {
        throw new Error('Invalid username or password')
      }
      const accessToken = JWT.sign(
        {
          account,
          username
        }, 'dummy', {
          expiresIn
        }
      )

      const token = {
        accessToken,
        refreshToken,
        expiresIn,
        clientId: '123'
      }
      // debugger
      console.log('Returning mocked user EM102-JCK')
      return [200, { user: { account: 'EM102', username: 'JCK', token } }]
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
