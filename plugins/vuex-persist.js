import VuexPersistence from 'vuex-persist'

// 7 day cookie age
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7

// httpOnly
const SECURE_COOKIE = process.env.NODE_ENV === 'production'

export default ({ store }) => {
  return new VuexPersistence({
    key: 'vuex',
    // persist auth and account
    // modules: ['auth'],
    modules: [],
    storage: {
      getItem: key => store.$cookies.get(key),
      setItem: (key, state) => store.$cookies.set(key, state, { path: '/', maxAge: COOKIE_MAX_AGE, secure: SECURE_COOKIE }),
      removeItem: key => store.$cookies.remove(key),
      clear: () => store.$cookies.removeAll()
    }
  }).plugin(store)
}
