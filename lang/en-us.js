/* eslint-disable quotes */
// prettier-ignore
export default {
  actions: {
    edit_custom_labels: "Edit Custom Labels",
    report_expenses: "Report Expenses",
    schedule_ac: "Schedule A/C",
    terminate_vehicle: "Terminate Vehicle",
    used_vehicle_quote: "Used Vehicle Quote"
  },
  auth: {
    account: "Account",
    email: "Email",
    forgot_password: "Forgot Password",
    login: "Login",
    logout: "Logout",
    password: "Password",
    remember_me: "Remember Me",
    username: "Username"
  },
  common: {
    cancel: "Cancel",
    dark_mode: "Dark Mode",
    download: "Download",
    emkay: "EMKAY",
    emkay_inc: "EMKAY, Inc.",
    fleet: "Fleet",
    language: "Language",
    loading: "Loading...",
    ok: "OK",
    save: "Save",
    search: "Search",
    no_search_results: "Your search for \"{query}\" found no results.",
    only_one_request: "Only one request allowed at a time.",
    request_cancelled: "Request Cancelled",
    welcome_to_emkay: "Welcome to EMKAY"
  },
  date: {
    bill_date: "Bill Date",
    end_date: "End Date",
    service_date: "Service Date",
    service_time: "Service Time",
    start_date: "Start Date"
  },
  footer: {
    about: "About",
    about_emkay: "About EMKAY",
    blog: "Blog",
    careers: "Careers",
    contact: "Contact",
    more: "More",
    automotive_links: "Automotive Links",
    fleet_incentives: "Fleet Incentives",
    leadtime_guides: "Leadtime Guides",
    press_releases: "Press Releases",
    technology: "Technology",
    tech: "Tech",
    celsius: "Celsius",
    driver_360: "Driver 360",
    fleet_360: "Fleet 360",
    fleet_exchange: "Fleet Exchange",
    geotab: "Geotab"
  },
  management: {
    menu_title: "Management",
    menu_subtitle: "Configure your fleet settings",
    fleet: {
      category: "Fleet",
      customize_your_fleet_labels: "Customize your fleet labels",
      manage_your_cases: "Manage your cases",
      manage_your_drivers: "Manage your drivers",
      manage_your_driver_fuel_pins: "Manage your driver fuel pins",
      manage_your_enotifications: "Manage your enotifications",
      manage_your_fleet_policies: "Manage your fleet policies",
      manage_your_online_users: "Manage your online users",
      view_your_fuel_auth_profiles: "View your fuel auth profiles"
    },
    customization: {
      category: "Customization",
      approve_your_driver_orders: "Approve your driver orders",
      approve_your_maintenance_repairs: "Approve your maintenance repairs",
      request_an_mvr: "Request an MVR",
      upload_your_odometers: "Upload your odometers"
    },
    tools: {
      category: "Tools",
      locate_preferred_shops: "Locate preferred shops",
      quote_a_transport: "Quote a transport",
      lcca: "LCCA"
    }
  },
  ordering: {
    menu_title: "Ordering",
    menu_subtitle: "Place orders, check order status, etc.",
    orders: {
      category: "Orders",
      place_factory_orders: {
        title: "Place Factory Orders"
      },
      place_stock_orders: {
        title: "Place Stock Orders"
      },
      view_order_requests: {
        title: "View Order Requests"
      }
    },
    driver_orders: {
      category: "Driver Orders",
      allow_drivers_to_order: {
        title: "Allow Drivers to Order"
      },
      approve_driver_orders: {
        title: "Approve Driver Orders"
      },
      manage_driver_order_settings: {
        title: "Manage Driver Order Settings"
      }
    },
    selectors: {
      category: "Selectors",
      manage_selectors: {
        title: "Manage Selectors"
      },
      manage_selector_groups: {
        title: "Manage Selector Groups"
      }
    }
  },
  reports: {
    menu_title: "Reporting",
    menu_subtitle: "All of your fleet reports in one place",

    // Fleet Report Bucket
    fleet: {
      // bucket name
      category: "@:common.fleet",
      // inventory report
      inventory: {
        report: "Inventory Report"
      },
      // order status report
      order_status: {
        report: "Order Status"
      },
      // replacement analysis report
      replacement_analysis: {
        report: "Replacement Analysis"
      },
      // sold vehicle analysis report
      sold_vehicle_analysis: {
        report: "Sold Vehicle Analysis"
      }
    },

    // Expenses Report Bucket
    expenses: {
      // bucket name
      category: "Expenses",
      // expense summary report
      expense_summary: {
        report: "Expense Summary"
      },
      // fuel detail report
      fuel_detail: {
        report: "Fuel Detail",
        amount: "Amount",
        bill_date: "@:date.bill_date",
        bill_sort: "Billing Sort",
        card_number: "Card Number",
        center_code: "Center Code",
        center_name: "Center Name",
        client_use_1: "Client Use 1",
        client_use_2: "Client Use 2",
        client_use_3: "Client Use 3",
        client_use_4: "Client Use 4",
        client_use_5: "Client Use 5",
        client_vehicle_number: "Client Vehicle Number",
        driver_id: "Driver ID",
        driver_name: "Driver Name",
        emkay_invoice_date: "EMKAY Invoice Date",
        emkay_invoice_number: "EMKAY Invoice Number",
        engine_fuel_type: "Engine Fuel Type",
        exception: "Exception",
        fuel_card_vendor: "Fuel Card Vendor",
        fuel_company_name: "Fuel Company Name",
        fuel_company_number: "Fuel Company Number",
        invoice_number: "Invoice Number",
        level_01: "Level 1",
        level_02: "Level 2",
        level_03: "Level 3",
        merchant_address: "Merchant Address",
        merchant_city: "Merchant City",
        merchant_state: "Merchant State",
        merchant_zip: "Merchant ZIP",
        model_year: "Model Year",
        odometer: "Odometer",
        premium: "Premium",
        product: "Product",
        product_type: "Product Type",
        quantity: "Quantity",
        service_date: "@:date.service_date",
        service_time: "@:date.service_time",
        tank_capacity: "Tank Capacity",
        tax_exempt: "Tax Exempt",
        to_vehicle_dashboard: "To Vehicle Dashboard",
        unit_price: "Unit Price",
        vehicle_make: "Vehicle Make",
        vehicle_model: "Vehicle Model",
        vehicle_number: "Vehicle Number",
        vin: "VIN Number",
        voucher: "Voucher"
      },
      // maintenance detail report
      maintenance_detail: {
        report: "Maintenance Detail"
      },
      // short term rental detail report
      short_term_rental_detail: {
        report: "Short Term Rental Detail"
      },
      // toll detail report
      toll_detail: {
        report: "Toll Detail"
      }
    },

    // Invoicing Report Bucket
    invoicing: {
      // bucket name
      category: "Invoicing",
      // custom invoicing
      custom_invoicing: {
        report: "Custom Invoicing"
      },
      // invoice history report
      invoice_history: {
        report: "Invoice History"
      }
    },

    // Services Report Bucket
    services: {
      // bucket name
      category: "Services",
      // accident claim
      accident_claim: {
        report: "Accident Claim"
      },
      // driver360 mileage report
      driver_360_mileage: {
        report: "Driver 360 Mileage"
      },
      // evoucher report
      evoucher: {
        report: "eVoucher"
      },
      // license renewal report
      license_renewal: {
        report: "License Renewal"
      }
    },

    // Safety and Telematics Report Bucket
    safety_and_telematics: {
      // bucket name
      category: "Safety and Telematics",
      // driver record report
      driver_record: {
        report: "Driver Record"
      },
      // driver safety report
      driver_safety: {
        report: "Driver Safety"
      },
      // engine faults report
      engine_faults: {
        report: "Engine Faults"
      },
      // saferoads fleet summary report
      saferoads_fleet_summary: {
        report: "Saferoads Fleet Summary"
      },
      // saferoads trip detail report
      saferoads_trip_detail: {
        report: "Saferoads Trip Detail"
      }
    },

    // Custom Reports Bucket
    custom: {
      // bucket name
      category: "Custom",
      // Custom Fuel Report
      fuel: {
        report: "Fuel"
      },
      // Custom Insurance Claim Report
      insurance_claim: {
        report: "Insurance Claim"
      },
      // Custom Invoice Report
      invoice: {
        report: "Invoice"
      },
      // Custom Maintenance Report
      maintenance: {
        report: "Maintenance"
      },
      // Custom vehicle/driver report
      vehicle_and_driver: {
        report: "Vehicle and Driver"
      },
      // Custom Violation Report
      violation: {
        report: "Violation"
      }
    }
  },
  navigation: {
    account_management: "Account Management",
    home: "Home",
    ordering: "Ordering",
    reporting: "Reporting",
    vehicle_dashboard: "Vehicle Dashboard"
  },
  vehicle_dashboard: {
    search_placeholder: "Find a vehicle, driver, or website feature..."
  }
}
