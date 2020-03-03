export default function ({ app, $auth, redirect }) {
  // if (process.server) {
  //   // if the page was reloaded, check for cookie and restore
  //   const vuex = app.$cookies.get('vuex')
  //   const persistedAuth = vuex && vuex.auth
  //   if (persistedAuth) {
  //     console.log('[SERVER][check-auth]: restoring auth state from vuex cookie')
  //     $auth.$storage.setState('user', persistedAuth.user)
  //     $auth.$storage.setState('loggedIn', persistedAuth.loggedIn)
  //     $auth.$storage.setState('strategy', persistedAuth.strategy)
  //     // return redirect('/login')
  //   }
  // }
  // if (!$auth.loggedIn) {
  //   console.log(`[${process.server ? 'SERVER' : 'CLIENT'}][check-auth]: Not logged in, redirecting to login.`)
  //   return redirect('/login')
  //   // return redirect(app.localePath('/login'))
  // }
}
