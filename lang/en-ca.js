/* eslint-disable quotes */
// prettier-ignore
export default {
  address: {
    state_province: "Province",
    postal_code: "Postal Code"
  },
  common: {
    merchant: "Merchant"
  },
  reports: {
    expenses: {
      fuel_detail: {
        merchant_state: "@:common.merchant @:address.state_province",
        merchant_zip: "@:common.merchant @:address.postal_code"
      }
    }
  }
}
