/**
 * Click-to-Dial a phone number
 */
export const dialTo = (number) => { window.location = `tel:${number}` }

/**
 * Click-to-Compose an email
 */
export const emailTo = (email) => { window.location = `mailto:${email}` }

/**
 * Format Currency
 */
export const formatCurrency = (value, minDigits = 2, maxDigits = 2) => {
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: minDigits, maximumFractionDigits: maxDigits })
  return formatter.format(value)
}

/**
 * Calculate Total of keys in array of objects
 */
export const computeTotalByKey = (items, key) => {
  const total = items.reduce((a, b) => {
    return {
      [key]: a[key] + b[key]
    }
  })
  return total[key]
}

/**
 * Multifilter
 * https://gist.github.com/jherax/f11d669ba286f21b7a2dcff69621eb72
 */
export const multiFilter = (item, condition) => {
  const filterKeys = Object.keys(condition)
  return item.filter((eachObj) => {
    return filterKeys.every(eachKey => {
      if (!condition[eachKey].length) {
        return true // passing an empty filter means that filter is ignored
      }
      // debugger
      // return (condition[eachKey].toString()).toLowerCase().includes((eachObj[eachKey].toString()).toLowerCase())

      // this works, but is not case insensitive
      // return Array.prototype.includes.call(condition[eachKey], eachObj[eachKey].toString().toLowerCase())
      const lowercaseArray = condition[eachKey].map(x => x.toString().toLowerCase())
      return Array.prototype.includes.call(lowercaseArray, eachObj[eachKey].toString().toLowerCase())
    })
  })
}
// export const multiFilter = (items, filters) => {
//   return items.filter((item) => {
//     return Object.entries(filters).every(([filterProperty, filterValues]) => {
//       switch (Object.prototype.toString.call(item[filterProperty])) {
//         case '[object Object]': return Object.entries(filterValues).every(([extFilterProperty, extFilterValue]) => {
//           return new Map(Object.entries(item[filterProperty])).get(extFilterProperty) === extFilterValue
//         })
//         case '[object Array]': return item[filterProperty].some((itemValue) => {
//           return filterValues.includes(itemValue)
//         })
//         default: return filterValues.includes(item[filterProperty])
//       }
//     })
//   })
// }

export const compareObjectByKey = (key, order = 'asc') => {
  return function innerSort (a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0
    }
    const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
    const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
    let comparison = 0
    if (varA > varB) { comparison = 1 } else if (varA < varB) { comparison = -1 }
    return ((order === 'desc') ? (comparison * -1) : comparison)
  }
}

/**
 * Flatten tree-like center hierarchy
 */
export const flatten = array => array.reduce((res, { center_code, center_name, children = [] }) => res.concat({ center_code, center_name }).concat(flatten(children)), [])
