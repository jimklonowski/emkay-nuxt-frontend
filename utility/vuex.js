/* eslint-disable arrow-parens */
// *******************************************************************
// Helpers
// *******************************************************************
const last = xs => xs[xs.length - 1]

// *******************************************************************
// Getters
// *******************************************************************
/**
 * Find an object in a list of objects by matching a property value.
 * @vuex userById: findByKey('users', 'id')
 * @example getters.userById('123')
 */
export function findByKey (prop, targetKey) {
  return state => val => state[prop].find(x => x[targetKey] === val)
}

/**
 * Filter a list of objects by matching a property value.
 * @vuex usersByStatus: filterByKey('users', 'status')
 * @example getters.usersByStatus('INACTIVE')
 */
export function filterByKey (prop, targetKey) {
  return state => vals => {
    if (!Array.isArray(vals)) { vals = [vals] }
    return state[prop].filter(x => vals.includes(x[targetKey]))
  }
}

export function mapKeys (prop, targetKey) {
  const filter = filterByKey(prop, targetKey)
  return state => vals => filter(state)(vals)
    .sort((a, b) => vals.indexOf(a[targetKey]) - vals.indexOf(b[targetKey]))
}

// *******************************************************************
// Mutators
// *******************************************************************

/**
 * Set property on state
 * @vuex setUser: set('user')
 * @example commit('setUser', { name: 'foo' })
 */
export const set = key => (state, val) => { state[key] = val }

/**
 * Set a value at a path within state
 * Create objects and arrays as needed
 * Path is an array, and array indicies are numbers (not string numbers)
 * @vuex setUserName: setPath(['user', 'name'])
 * @example commit('setUserName', 'foo')
 */
export const setPath = path => (state, val) => {
  const obj = path.slice(0, -1).reduce((acc, x, i) => {
    if (!(x in acc)) { acc[x] = typeof path[i + 1] === 'number' ? [] : {} }
    return acc[x]
  }, state)
  obj[last(path)] = val
}

/**
 * Toggle boolean in state
 * @vuex toggleOpen: toggle('open')
 * @example commit('toggleOpen')
 */
export const toggle = key => state => { state[key] = !state[key] }

/**
 * For all key/value in propMap, set state[key] = data[propMap[value]]
 */
export const pick = propMap => (state, data) => {
  data = data || {}
  Object.keys(propMap).forEach(x => { state[x] = data[propMap[x]] })
}

/**
 * Push an item onto a list
 * @vuex addItem: push('items')
 */
export const push = key => (state, val) => state[key].push(val)

/**
 * copy all key/values from data to state
 * useful for resetting state to default values
 * @vuex resetState: assignConstant(initialState)
 * @example commit('resetState')
 */
export const assign = data => state => Object.assign(state, data)

/**
 * Remove item from list
 */
export const omitFromList = key => (state, item) => {
  const index = state[key].indexOf(item)
  if (index > -1) { state[key].splice(index, 1) }
}

/**
 * Increment the index of a list argument or a list in state
 */
export const incrementListIndex = (key, listOrListProp) => state => {
  const list = Array.isArray(listOrListProp) ? listOrListProp : state[listOrListProp]
  state[key] = (state[key] + 1) % list.length
}

/**
 * Add or extend a record in a list
 */
export const extendRecordInList = (key, idKey = 'id', valKey) => (state, data) => {
  const id = data[idKey]
  const val = valKey ? data[valKey] : data
  const index = state[key].findIndex(x => x[idKey] === id)
  return index < 0
    ? state[key].push(val)
    : state[key].splice(index, 1, Object.assign({}, state[key][index], val))
}

/**
 * Add or replace a record in a list
 */
export const replaceRecordInList = (key, idKey = 'id', valKey) => (state, data) => {
  const id = data[idKey]
  const val = valKey ? data[valKey] : data
  const index = state[key].findIndex(x => x[idKey] === id)
  return index < 0
    ? state[key].push(val)
    : state[key].splice(index, 1, val)
}
