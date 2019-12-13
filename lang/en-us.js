/* eslint-disable quotes */
// prettier-ignore
export default {
  actions: {
    report_expenses: "Report Expenses",
    schedule_ac: "Schedule A/C",
    terminate_vehicle: "Terminate Vehicle",
    used_vehicle_quote: "Used Vehicle Quote"
  },
  address: {
    address: "Address",
    cell: "Cell",
    city: "City",
    email: "Email",
    phone: "Phone",
    state_province: "State",
    postal_code: "ZIP Code"
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
    amount: "Amount",
    billing_sort: "Billing Sort",
    cancel: "Cancel",
    center: "Center",
    center_code: "Center Code",
    center_name: "Center Name",
    client_vehicle_number: "@:vehicle.client_vehicle_number",
    client_use_1: "Client Use 1",
    client_use_2: "Client Use 2",
    client_use_3: "Client Use 3",
    client_use_4: "Client Use 4",
    client_use_5: "Client Use 5",
    dark_mode: "Dark Mode",
    description: "Description",
    download: "Download",
    driver_id: "@:driver.driver_id",
    driver_name: "@:driver.driver_name",
    driver_number: "@:driver.driver_number",
    edit: "Edit",
    emkay: "EMKAY",
    emkay_inc: "EMKAY, Inc.",
    fleet: "Fleet",
    invoice_number: "Invoice Number",
    language: "Language",
    level: "Level",
    loading: "Loading...",
    merchant: "Merchant",
    no_search_results: "Your search for \"{query}\" found no results.",
    odometer: "Odometer",
    ok: "OK",
    only_one_request: "Only one request allowed at a time.",
    quantity: "Quantity",
    request_cancelled: "Request Cancelled",
    save: "Save",
    search: "Search",
    to_vehicle_dashboard: "To Vehicle Dashboard",
    voucher: "Voucher",
    welcome_to_emkay: "Welcome to EMKAY"
  },
  date: {
    bill_date: "Bill Date",
    end_date: "End Date",
    invoice_date: "Invoice Date",
    past_days: "Past 0 Days | Past Day | Past {n} Days",
    service_date: "Service Date",
    service_time: "Service Time",
    start_date: "Start Date"
  },
  driver: {
    driver_id: "Driver ID",
    driver_name: "Driver Name",
    driver_number: "Driver Number",
    'driver_#': "Driver #",
    employee_id: "Employee ID",
    selector_level: "Selector Level"
  },
  footer: {
    about: "About",
    about_emkay: "About EMKAY",
    blog: "Blog",
    careers: "Careers",
    contact: "Contact",
    more: "@:navigation.more",
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
        amount: "@:common.amount",
        bill_date: "@:date.bill_date",
        bill_sort: "@:common.billing_sort",
        card_number: "Card Number",
        center_code: "@:common.center_code",
        center_name: "@:common.center_name",
        client_use_1: "@:common.client_use_1",
        client_use_2: "@:common.client_use_2",
        client_use_3: "@:common.client_use_3",
        client_use_4: "@:common.client_use_4",
        client_use_5: "@:common.client_use_5",
        client_vehicle_number: "@:vehicle.client_vehicle_number",
        driver_id: "@:common.driver_id",
        driver_name: "@:common.driver_name",
        emkay_invoice_date: "EMKAY @:date.invoice_date",
        emkay_invoice_number: "EMKAY @:common.invoice_number",
        engine_fuel_type: "Engine Fuel Type",
        exception: "Exception",
        fuel_card_vendor: "Fuel Card Vendor",
        fuel_company_name: "Fuel Company Name",
        fuel_company_number: "Fuel Company Number",
        invoice_number: "@:common.invoice_number",
        level_01: "@:common.level 01",
        level_02: "@:common.level 02",
        level_03: "@:common.level 03",
        merchant_address: "@:common.merchant @:address.address",
        merchant_city: "@:common.merchant @:address.city",
        merchant_state: "@:common.merchant @:address.state_province",
        merchant_zip: "@:common.merchant @:address.postal_code",
        model_year: "@:vehicle.model_year",
        odometer: "@:common.odometer",
        premium: "Premium",
        product: "Product",
        product_type: "Product Type",
        quantity: "@:common.quantity",
        service_date: "@:date.service_date",
        service_time: "@:date.service_time",
        tank_capacity: "Tank Capacity",
        tax_exempt: "Tax Exempt",
        unit_price: "Unit Price",
        vehicle_make: "@:vehicle.make",
        vehicle_model: "@:vehicle.model",
        vehicle_number: "@:vehicle.vehicle_number",
        vin: "@:vehicle.vin",
        voucher: "@:common.voucher"
      },
      // maintenance detail report
      maintenance_detail: {
        report: "Maintenance Detail",
        active: "Active",
        amount: "@:common.amount",
        ata_group: "ATA Group",
        ata_group_description: "ATA Group Description",
        bill_sort: "@:common.billing_sort",
        brake_manufacturer: "Brake Manufacturer",
        brake_thickness: "Brake Thickness",
        center_code: "@:common.center_code",
        center_name: "@:common.center_name",
        charge_code: "Charge Code",
        client_use_1: "@:common.client_use_1",
        client_use_2: "@:common.client_use_2",
        client_use_3: "@:common.client_use_3",
        client_use_4: "@:common.client_use_4",
        client_use_5: "@:common.client_use_5",
        client_vehicle_number: "@:vehicle.client_vehicle_number",
        customer_po: "Customer PO",
        description: "@:common.description",
        // driver_first_name: "Driver First Name",
        // driver_last_name: "Driver Last Name",
        driver_name: "@:common.driver_name",
        engine_hours: "Engine Hours",
        expense_category: "Expense Category",
        front_left_brake: "Front Left Brake",
        front_left_drum: "Front Left Drum",
        front_left_rotor: "Front Left Rotor",
        front_left_tire: "Front Left Tire",
        front_right_brake: "Front Right Brake",
        front_right_drum: "Front Right Drum",
        front_right_rotor: "Front Right Rotor",
        front_right_tire: "Front Right Tire",
        gl_code: "GL Code",
        invoice_number: "@:common.invoice_number",
        labor_or_part: "Labor or Part",
        level_01: "@:common.level 01",
        level_02: "@:common.level 02",
        level_03: "@:common.level 03",
        maintenance_category: "Maintenance Category",
        maintenance_code: "Maintenance Code",
        model_year: "@:vehicle.model_year",
        odometer: "@:common.odometer",
        quantity: "@:common.quantity",
        rear_left_brake: "Rear Left Brake",
        rear_left_drum: "Rear Left Drum",
        rear_left_rotor: "Rear Left Rotor",
        rear_left_tire: "Rear Left Tire",
        rear_right_brake: "Rear Right Brake",
        rear_right_drum: "Rear Right Drum",
        rear_right_rotor: "Rear Right Rotor",
        rear_right_tire: "Rear Right Tire",
        service_date: "@:date.service_date",
        tire_manufacturer: "Tire Manufacturer",
        tire_model: "Tire Model",
        tire_size: "Tire Size",
        vehicle_make: "@:vehicle.make",
        vehicle_model: "@:vehicle.model",
        vehicle_number: "@:vehicle.vehicle_number",
        vendor_factor: "Vendor Factor",
        vendor_name: "Vendor Name",
        vendor_number: "Vendor Number",
        voucher: "@:common.voucher"
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
    back: "Go Back",
    home: "Home",
    more: "More",
    ordering: "Ordering",
    reporting: "Reporting",
    see_more: "See More",
    vehicle_dashboard: "@:vehicle.dashboard"
  },
  vehicle: {
    client_vehicle_number: "Client Vehicle Number",
    dashboard: "Vehicle Dashboard",
    edit_custom_labels: "Edit Custom Labels",
    fuel: "Fuel",
    maintenance: "Maintenance",
    make: "Vehicle Make",
    model: "Vehicle Model",
    model_year: "Model Year",
    order_status: "Order Status",
    reassign_vehicle: "Re-assign Vehicle",
    vehicle_classification: "Vehicle Classification",
    vehicle_number: "Vehicle Number",
    'vehicle_#': "Vehicle #",
    vin: "VIN Number"
  },
  vehicle_dashboard: {
    search_placeholder: "Find a vehicle, driver, or website feature..."
  }
}
