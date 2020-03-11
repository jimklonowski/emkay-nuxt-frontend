import * as JWT from 'jsonwebtoken'
import MockAdapter from 'axios-mock-adapter'
/* eslint-disable camelcase */
export default function ({ $axios, redirect }) {
  // debugger
  // const mock = new MockAdapter($axios, { delayResponse: 3000 })
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
      if (process.client) {
        console.log('Returning mocked user EM102-JCK')
      }
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
          vehicle_number: 'E09490',
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
        // 'level_01',
        // 'level_02',
        // 'level_03',
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
    // 12-12-2019 mock vehicle summary
    .onGet('/vehicle/summary')
    .reply(function (config) {
      const vehicle_info = {
        billing_sort: 'AABBCC',
        center_code: '001',
        center_name: 'Executive',
        client_vehicle_number: 'CV12345',
        vehicle_classification: 'Sport Utility - 4x4',
        vehicle_color: 'Black',
        vehicle_make: 'Jeep',
        vehicle_model: 'Compass',
        vehicle_year: '2019',
        vehicle_number: config.params.vehicle,
        vin: 'VIN1234567890'
      }
      const driver_info = {
        address_1: 'EMKAY, Inc.',
        address_2: '805 W THORNDALE AVE',
        city: 'ITASCA',
        county: 'DUPAGE',
        driver_misc_1: '',
        driver_misc_2: '',
        driver_misc_3: '',
        driver_misc_4: '',
        driver_number: '123456',
        email: 'jklo@emkay.com',
        employee_id: 'ID123456',
        first_name: 'Jimmy',
        last_name: 'Klonowski',
        license_number: '123456IL1234567883242',
        license_state_province: 'IL',
        phone: '630-250-9999',
        cell: '630-250-9999',
        pool: false,
        postal_code: '60143',
        selector_level: 'asdf',
        state_province: 'IL'
      }
      return [200, { vehicle_info, driver_info }]
    })
    .onGet('/account/account-info')
    .reply(function (config) {
      const login_messages = []
      const center_hierarchy = {}
      const custom_labels = {
        client_use_1_label: 'My Custom Label 1',
        client_use_2_label: 'Our New Label 2',
        client_use_3_label: 'A Label 3',
        client_use_4_label: 'The Label 4',
        client_use_5_label: 'JCK 5',
        driver_misc_1_label: 'Driver Misc 1 Label',
        driver_misc_2_label: 'Driver Misc 2 Label',
        driver_misc_3_label: 'Driver Misc 3 Label',
        driver_misc_4_label: 'Driver Misc 4 Label'
      }
      // const custom_labels = ['Client Use 1 Label', 'Client Use 2 Label', 'Client Use 3 Label', 'Client Use 4 Label', 'Client Use 5 Label']
      return [200, { login_messages, center_hierarchy, custom_labels }]
    })
    // .onGet('/account/custom-labels').replyOnce(200, { client_use_labels: {}, driver_misc_labels: {} })
    .onPost('/account/update-custom-labels')
    .replyOnce(500)
    .onPost('/account/update-custom-labels')
    .reply(function (config) {
      return [200, { data: {}, success: true, message: 'Labels Updated' }]
    })
    // .onGet('/account/centers')
    // .reply(function (config) {
    //   const centers = [
    //     { text: 'Executive', value: '001' },
    //     { text: 'Sales', value: '002' },
    //     { text: 'Account Managers', value: '003' },
    //     { text: 'Short Term/Unassigned Demos', value: '004' }
    //   ]
    //   return [200, { centers }]
    // })
    .onPost('/transtor/quote')
    .reply(function (config) {
      const request = JSON.parse(config.data)
      // debugger
      // return the request object merged with some additional quote fields
      const quote = {
        ...request,
        estimated_distance: '1500 miles',
        estimated_cost: 1965.97
      }
      return [200, quote]
    })
    .onPost('/fleet/drivers/edit')
    .reply(function (config) {
      return [400, { data: {}, success: false, message: 'Bad Details' }]
    })
    // .onGet('/fleet/drivers')
    // .reply(function (config) {
    //   const drivers = [
    //     {
    //       driver_id: '1',
    //       driver_last_name: 'GRIFFITH',
    //       driver_first_name: 'ANDREW',
    //       driver_address_1: 'EMKAY, Inc.',
    //       driver_address_2: '805 W. THORNDALE AVE.',
    //       driver_city: 'ITASCA',
    //       driver_state_province: 'IL',
    //       driver_postal_code: '60143',
    //       driver_county: 'DuPage',
    //       driver_phone: '6308649999',
    //       driver_mobile: '6309996464',
    //       driver_email_address: 'TESTEMAIL@EMKAY.COM',
    //       driver_employee_id: '123456',
    //       driver_misc_1: 'MISC 1',
    //       driver_misc_2: 'MISC 2',
    //       driver_misc_3: 'MISC 3',
    //       driver_misc_4: 'MISC 4',
    //       vehicle_number: 'E66429'
    //     },
    //     {
    //       driver_id: '2',
    //       driver_last_name: 'KLONOWSKI',
    //       driver_first_name: 'JAMES',
    //       driver_address_1: '1077 BRIARBROOK DR.',
    //       driver_address_2: 'APT 420',
    //       driver_city: 'WHEATON',
    //       driver_state_province: 'IL',
    //       driver_postal_code: '60189',
    //       driver_county: 'DuPage',
    //       driver_phone: '6308649999',
    //       driver_mobile: '6309996464',
    //       driver_email_address: 'JCK@EMKAY.COM',
    //       driver_employee_id: '123456',
    //       driver_misc_1: 'MISC 1',
    //       driver_misc_2: 'MISC 2',
    //       driver_misc_3: 'MISC 3',
    //       driver_misc_4: 'MISC 4',
    //       vehicle_number: 'E66420'
    //     },
    //     {
    //       driver_id: '3',
    //       driver_last_name: 'SMITH',
    //       driver_first_name: 'JOHN',
    //       driver_address_1: '',
    //       driver_address_2: '',
    //       driver_city: 'CHICAGO',
    //       driver_state_province: 'IL',
    //       driver_postal_code: '60607',
    //       driver_county: 'Cook',
    //       driver_phone: '6308649999',
    //       driver_mobile: '6309996464',
    //       driver_email_address: 'test@EMKAY.COM',
    //       driver_employee_id: '123456',
    //       driver_misc_1: 'MISC 1',
    //       driver_misc_2: 'MISC 2',
    //       driver_misc_3: 'MISC 3',
    //       driver_misc_4: 'MISC 4',
    //       vehicle_number: 'E22111'
    //     }
    //   ]
    //   return [200, { drivers, success: true, message: 'OK' }]
    // })
    .onGet('/vehicle/fuel-cards')
    .reply(function (config) {
      const data = [
        {
          card_number: '3655-3',
          vendor: 'WEX',
          issue_date: '2020-01-10',
          expiration_date: '2024-01',
          restrictions: 'ID & ODOMETER, UNRESTRICTED',
          pin: '1234',
          status: 'ACTIVE',
          authorization_profile_id: '123'
        }
      ]
      return [200, { data, success: true, message: 'TEST' }]
    })
    .onGet('/vehicle/fuel-profiles')
    .reply(function (config) {
      const data = [
        {
          id: '146',
          authorization_profile: 'DLY:#3/$300 MTH:$1000',
          center: 'All',
          sort: 'All',
          vehicle_type: 'All',
          restrictions: 'ID & ODOMETER, UNRESTRICTED',
          card_type: 'VEH1:1'
        }
      ]
      return [200, { data, success: true, message: 'TEST' }]
    })
    // .onGet('/vehicle/violation-history')
    // .reply(function (config) {
    //   const data = [
    //     {
    //       date: '2020-01-01',
    //       violation_number: 'A1B2C300',
    //       type: 'TOLL VIOLATION',
    //       state_province: 'IL',
    //       paid_date: '2020-02-01',
    //       amount: 123.45,
    //       document_id: 'AAADOC1'
    //     }
    //   ]
    //   return [200, { data, success: true, message: 'TEST' }]
    // })
    .onGet('/vehicle/accident-claim')
    .reply(function (config) {
      const claim = config.params.claim
      const vehicle = config.params.vehicle
      const data = {
        // clicked claim
        claim_number: claim,
        vehicle_number: vehicle,
        document_id: '1234'
      }
      return [200, { data, success: true, message: 'TEST' }]
    })
    .onGet('/vehicle/accident-claim-images')
    .reply(function (config) {
      const data = [
        {
          text: 'Front',
          src: '//placekitten.com/600/700'
        },
        {
          text: 'Side',
          src: '//placekitten.com/500/800'
        },
        {
          text: 'Rear',
          src: '//placekitten.com/600/800'
        }
      ]
      return [200, { data, success: true, message: 'TEST' }]
    })
    .onGet('/reports/my-reports-saved-config')
    .reply(function (config) {
      const id = config.params.id
      const savedConfig = {
        auto_send: true,
        report_id: id,
        report_schedule: 'monthly',
        report_title: id,
        report_type: 'fuel',
        start: '2019-01-01',
        end: '2020-01-01',
        centers_selected: ['002', '003', '004', '005', '006'],
        columns_selected: ['vehicle_number', 'client_vehicle_number', 'driver_last_name', 'employee_id', 'bill_month', 'bill_year'],
        email_recipients: ['agriffith2@mmmkay.com', 'jklonowski@mmmkay.ca']
      }
      return [200, { savedConfig, success: true, message: 'OK' }]
    })
    .onGet('/my-reports/saved-reports')
    .reply(function (config) {
      const data = [
        { header: '(Mocked) Your saved reports' },
        'ABC123',
        'QWERTY666',
        'MySavedReport3'
      ]
      return [200, { data, success: true, message: 'TEST' }]
    })
    .onGet('/reports/my-reports-columns')
    .reply(function (config) {
      const type = config.params.type
      console.log(`returning mocked columns for report type ${type}`)
      let groups = []
      switch (type) {
        case 'vehicle':
          groups = [
            {
              category: 'vehicle_information',
              columns: [
                'vehicle_number',
                'client_vehicle_number',
                'prior_vehicle_number',
                'next_vehicle_number',
                'center_code',
                'center_name',
                'bill_sort',
                'lease_type',
                'status',
                'model_year',
                'vehicle_make',
                'vehicle_model',
                'vehicle_category',
                'body_style',
                'vehicle_color',
                'number_of_cylinders',
                'vin',
                'odometer',
                'odometer_date',
                'reading_type',
                'order_date',
                'in_service_date',
                'out_of_service_date',
                'date_sold'
                // ,...
              ]
            },
            {
              category: 'driver_information',
              columns: [
                'driver_last_name',
                'driver_first_name',
                // 'driver_first_initial',
                'driver_address_1',
                'driver_address_2',
                'driver_city',
                'driver_state_province',
                'driver_postal_code',
                'driver_county',
                'driver_phone',
                'driver_mobile',
                'driver_fax',
                'driver_email_address',
                'employee_id',
                'driver_misc_1',
                'driver_misc_2',
                'driver_misc_3',
                'driver_misc_4'
              ]
            },
            {
              category: 'billing_information',
              columns: [
                'months_in_service',
                'capitalized_cost',
                'accumulated_depreciation',
                'current_depreciation',
                'rental_amount'
              ]
            }
          ]
          break
        case 'billing':
          groups = [
            {
              category: 'vehicle_information',
              columns: [
                'vehicle_number',
                'client_vehicle_number',
                'prior_vehicle_number',
                'next_vehicle_number',
                'center_code',
                'center_name',
                'bill_sort',
                'lease_type',
                'status',
                'model_year',
                'vehicle_make',
                'vehicle_model',
                'vehicle_category',
                'number_of_cylinders',
                'vin',
                'odometer',
                'odometer_date',
                'reading_type',
                'in_service_date',
                'out_of_service_date',
                'date_sold',
                'close_odometer',
                // 'mgd_original_date', ?
                'depreciation_rate',
                'license_plate_number',
                'license_plate_state_province',
                // 'c_e_team', ?
                // 'c_e_alw_ml, ?
                'client_use_label_1',
                'client_use_label_2',
                'client_use_label_3',
                'client_use_label_4',
                'client_use_label_5',
                'gross_vehicle_weight'
                // ,...
              ]
            },
            {
              category: 'driver_information',
              columns: [
                'driver_last_name',
                'driver_first_name',
                // 'driver_first_initial',
                // 'driver_address_1',
                // 'driver_address_2',
                'driver_city',
                'driver_state_province',
                // 'driver_postal_code',
                'driver_county',
                // 'driver_phone',
                // 'driver_mobile',
                // 'driver_fax',
                // 'driver_email_address',
                'employee_id',
                'driver_misc_1',
                'driver_misc_2',
                'driver_misc_3',
                'driver_misc_4'
              ]
            },
            {
              category: 'billing_information',
              columns: [
                'bill_year',
                'bill_month',
                'cycle',
                'bill_for_year',
                'bill_for_month',
                'lease_period',
                'invoice_number',
                'days_billed',
                'months_in_service',
                'interest_rate',
                // 'int_rpt_type', ?
                'capitalized_cost',
                'accumulated_depreciation',
                'residual_value',
                'current_depreciation',
                'rental_amount',
                'lease_tax',
                'provincial_tax',
                'insurance_expense',
                'maintenance_expense',
                'license_expense',
                'fuel_expense',
                'fleet_services',
                'sales_tax'
              ]
            }
          ]
          break
        case 'fuel':
          groups = [
            {
              category: 'vehicle_information',
              columns: [
                'vehicle_number',
                'client_vehicle_number',
                'prior_vehicle_number',
                'next_vehicle_number',
                'center_code',
                'center_name',
                'bill_sort',
                'lease_type',
                'status',
                'model_year',
                'vehicle_make',
                'vehicle_model',
                'vehicle_category',
                'number_of_cylinders',
                'vin',
                'odometer',
                'odometer_date',
                'reading_type',
                'in_service_date',
                'out_of_service_date',
                'date_sold',
                'close_odometer',
                // 'mgd_original_date', ?
                'depreciation_rate',
                'license_plate_number',
                'license_plate_state_province',
                // 'c_e_team', ?
                // 'c_e_alw_ml, ?
                'client_use_label_1',
                'client_use_label_2',
                'client_use_label_3',
                'client_use_label_4',
                'client_use_label_5',
                'gross_vehicle_weight'
                // ,...
              ]
            },
            {
              category: 'driver_information',
              columns: [
                'driver_last_name',
                'driver_first_name',
                'driver_city',
                'driver_state_province',
                'driver_county',
                'employee_id',
                'driver_misc_1',
                'driver_misc_2',
                'driver_misc_3',
                'driver_misc_4'
              ]
            },
            {
              category: 'billing_information',
              columns: [
                'months_in_service',
                'capitalized_cost',
                'accumulated_depreciation',
                'residual_value',
                'current_depreciation',
                'rental_amount'
              ]
            },
            {
              category: 'fuel_information',
              columns: [
                'bill_year',
                'bill_month',
                'vendor_invoice',
                'vendor_name',
                'vendor_address_1',
                'vendor_address_2',
                'vendor_city',
                'vendor_state_province',
                'vendor_postal_code',
                'card_number',
                'purchase_date',
                'odometer',
                'voucher',
                'charge_code',
                'product_type',
                'purchase_product',
                'premium',
                'quantity',
                'unit_cost',
                'amount',
                'purchaser_id',
                'purchaser_name'
              ]
            }
          ]
          break
        case 'maintenance':
          groups = [
            {
              category: 'vehicle_information',
              columns: [
                'vehicle_number',
                'client_vehicle_number',
                'prior_vehicle_number',
                'next_vehicle_number',
                'center_code',
                'center_name',
                'bill_sort',
                'lease_type',
                'status',
                'model_year',
                'vehicle_make',
                'vehicle_model',
                'vehicle_category',
                'number_of_cylinders',
                'vin',
                'odometer',
                'odometer_date',
                'reading_type',
                'in_service_date',
                'out_of_service_date',
                'date_sold',
                'close_odometer',
                'depreciation_rate',
                'license_plate_number',
                'license_plate_state_province',
                'client_use_label_1',
                'client_use_label_2',
                'client_use_label_3',
                'client_use_label_4',
                'client_use_label_5',
                'gross_vehicle_weight'
              ]
            },
            {
              category: 'driver_information',
              columns: [
                'driver_last_name',
                'driver_first_name',
                'driver_city',
                'driver_state_province',
                'driver_county',
                'employee_id',
                'driver_misc_1',
                'driver_misc_2',
                'driver_misc_3',
                'driver_misc_4'
              ]
            },
            {
              category: 'billing_information',
              columns: [
                'months_in_service',
                'capitalized_cost',
                'accumulated_depreciation',
                'residual_value',
                'current_depreciation',
                'rental_amount'
              ]
            },
            {
              category: 'maintenance_information',
              columns: [
                'service_date',
                'voucher',
                'coupon',
                'odometer',
                'vendor_name',
                'vendor_address_1',
                'vendor_address_2',
                'vendor_city',
                'vendor_state_province',
                'vendor_postal_code',
                'national_vendor',
                'ata_group',
                'maintenance_type',
                'description',
                'charge_code',
                'quantity',
                'amount',
                'preferred_vendor'
              ]
            }
          ]
          break
        case 'expenses':
          groups = [
            {
              category: 'vehicle_information',
              columns: [
                'vehicle_number',
                'client_vehicle_number',
                'prior_vehicle_number',
                'next_vehicle_number',
                'center_code',
                'center_name',
                'bill_sort',
                'lease_type',
                'status',
                'model_year',
                'vehicle_make',
                'vehicle_model',
                'vehicle_category',
                'number_of_cylinders',
                'vin',
                'odometer',
                'odometer_date',
                'reading_type',
                'in_service_date',
                'out_of_service_date',
                'date_sold',
                'close_odometer',
                'depreciation_rate',
                'license_plate_number',
                'license_plate_state_province',
                'client_use_label_1',
                'client_use_label_2',
                'client_use_label_3',
                'client_use_label_4',
                'client_use_label_5',
                'gross_vehicle_weight'
              ]
            },
            {
              category: 'driver_information',
              columns: [
                'driver_last_name',
                'driver_first_name',
                'driver_city',
                'driver_state_province',
                'driver_county',
                'employee_id',
                'driver_misc_1',
                'driver_misc_2',
                'driver_misc_3',
                'driver_misc_4'
              ]
            },
            {
              category: 'expense_summary_information',
              columns: [
                'month_year',
                'odometer',
                'odometer_date',
                'reading_type',
                'business_miles',
                'personal_miles',
                'gallons',
                'fuel_cost',
                'tire_quantity',
                'tire_cost',
                'oil_change',
                'maintenance_expense',
                'license_tax',
                'license_expense',
                'accident_expense',
                // 'subr_exp',
                // 'liab_exp',
                // 'phys_exp',
                // 'misc_exp',
                // 'park_exp',
                // 'prs_card',
                'rental_amount',
                'depreciation',
                // 'rent-a-car',
                'toll_expense',
                'glass_expense',
                'violation_expense',
                'tax_expense',
                'provincial_tax'

              ]
            },
            {
              category: 'billing_information',
              columns: [
                'months_in_service',
                'capitalized_cost',
                'accumulated_depreciation',
                'residual_value',
                'current_depreciation',
                'rental_amount'
              ]
            }
          ]
          break
        case 'claims':
          groups = [
            {
              category: 'vehicle_information',
              columns: [
                'vehicle_number',
                'client_vehicle_number',
                'prior_vehicle_number',
                'next_vehicle_number',
                'center_code',
                'center_name',
                'bill_sort',
                'lease_type',
                'status',
                'model_year',
                'vehicle_make',
                'vehicle_model',
                'vehicle_category',
                'number_of_cylinders',
                'vin',
                'odometer',
                'odometer_date',
                'reading_type',
                'in_service_date',
                'out_of_service_date',
                'date_sold',
                'close_odometer',
                'depreciation_rate',
                'license_plate_number',
                'license_plate_state_province',
                'client_use_label_1',
                'client_use_label_2',
                'client_use_label_3',
                'client_use_label_4',
                'client_use_label_5',
                'gross_vehicle_weight'
              ]
            },
            {
              category: 'driver_information',
              columns: [
                'driver_last_name',
                'driver_first_name',
                'driver_city',
                'driver_state_province',
                'driver_county',
                'employee_id',
                'driver_misc_1',
                'driver_misc_2',
                'driver_misc_3',
                'driver_misc_4'
              ]
            },
            {
              category: 'billing_information',
              columns: [
                'months_in_service',
                'capitalized_cost',
                'accumulated_depreciation',
                'residual_value',
                'current_depreciation',
                'rental_amount'
              ]
            },
            {
              category: 'insurance_claims',
              columns: [
                'claim_number',
                'loss_date',
                'report_date',
                'city',
                'state_province',
                'location',
                'preventable',
                'percentage_of_fault',
                'authority',
                'report_number',
                'damages',
                'not_drivable',
                'vendor_name',
                'repair_cost',
                'days_to_repair',
                'cost_containment',
                'rental',
                'subrogated',
                'subrogation_start_date',
                'subrogation_end_date',
                'subrogation_amount',
                'subrogation_received',
                'rental_subrogation_amount',
                'rental_subrogation_received',
                'date_closed',
                'claim_status'
              ]
            }
          ]
          break
        case 'violations':
          groups = [
            {
              category: 'vehicle_information',
              columns: [
                'vehicle_number',
                'client_vehicle_number',
                'prior_vehicle_number',
                'next_vehicle_number',
                'center_code',
                'center_name',
                'bill_sort',
                'lease_type',
                'status',
                'model_year',
                'vehicle_make',
                'vehicle_model',
                'vehicle_category',
                'number_of_cylinders',
                'vin',
                'odometer',
                'odometer_date',
                'reading_type',
                'in_service_date',
                'out_of_service_date',
                'date_sold',
                'close_odometer',
                'depreciation_rate',
                'license_plate_number',
                'license_plate_state_province',
                'client_use_label_1',
                'client_use_label_2',
                'client_use_label_3',
                'client_use_label_4',
                'client_use_label_5',
                'gross_vehicle_weight'
              ]
            },
            {
              category: 'driver_information',
              columns: [
                'driver_last_name',
                'driver_first_name',
                'driver_city',
                'driver_state_province',
                'driver_county',
                'employee_id',
                'driver_misc_1',
                'driver_misc_2',
                'driver_misc_3',
                'driver_misc_4'
              ]
            },
            {
              category: 'billing_information',
              columns: [
                'months_in_service',
                'capitalized_cost',
                'accumulated_depreciation',
                'residual_value',
                'current_depreciation',
                'rental_amount'
              ]
            },
            {
              category: 'tickets_and_violations',
              columns: [
                'violation_number',
                'violation_date',
                'description'
              ]
            }
          ]
          break
      }
      return [200, { groups, success: true, message: 'TEST' }]
    })
    // .onGet('/driver/driver-details')
    // .reply(function (config) {
    //   const driverId = config.params.driver
    //   const data = {
    //     driver_id: driverId,
    //     driver_last_name: 'GRIFFITH',
    //     driver_first_name: 'ANDREW',
    //     driver_address_1: 'EMKAY, Inc.',
    //     driver_address_2: '805 W. THORNDALE AVE.',
    //     driver_city: 'ITASCA',
    //     driver_state_province: 'IL',
    //     driver_postal_code: '60143',
    //     driver_county: 'DuPage',
    //     driver_phone: '6308649999',
    //     driver_mobile: '6309996464',
    //     driver_email_address: 'TESTEMAIL@EMKAY.COM',
    //     driver_employee_id: '123456',
    //     driver_misc_1: 'MISC 1',
    //     driver_misc_2: 'MISC 2',
    //     driver_misc_3: 'MISC 3',
    //     driver_misc_4: 'MISC 4',
    //     vehicle_number: 'E66429'
    //   }
    //   return [200, { data, success: true, message: 'TEST' }]
    // })
    .onGet('/driver/vehicle-history')
    .reply(function (config) {
      const data = [
        {
          vehicle: '269947',
          model_year: '2012',
          model: 'EXPLORER LTD',
          status: 'CLOSE OUT'
        },
        {
          vehicle: '442545',
          model_year: '2014',
          model: 'DURANGO CITADEL',
          status: 'CLOSE OUT'
        },
        {
          vehicle: 'E05060',
          model_year: '2019',
          model: 'DURANGO CITADEL BATTLE TANK',
          status: 'CLOSE OUT'
        },
        {
          vehicle: 'E66429',
          model_year: '2020',
          model: 'DURANGO GT AWD',
          status: 'ON BILLING'
        }
      ]
      return [200, { data, success: true, message: 'TEST' }]
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
