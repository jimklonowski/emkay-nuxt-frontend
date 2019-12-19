export const state = () => ({})

export const actions = {
  /**
   * nuxtServerInit is called on the server on first load or when reloading.
   * We can restore the auth and account vuex states and re-login from here
   * https://nuxtjs.org/guide/vuex-store#the-nuxtserverinit-action
   */
  async nuxtServerInit ({ commit, state }, { req }) {
    if (process.server) {
      // console.info('im the server')
    }
    const vuex = this.$cookies.get('vuex')
    // console.log('vuex:')
    // await console.dir(vuex)
    if (vuex) {
      await console.log('found vuex from cookies')
    }
  }
}

// eslint-disable-line space-before-function-paren
// async nuxtServerInit ({ commit, dispatch, state }, { req }) {
//   const vuex = this.$cookies.get('vuex')
//   // if there is vuex data stored in a cookie, try to restore it
//   if (vuex) {
//     try {
//       debugger
//       // if there is a logged in user saved in cookies
//       if (vuex.auth && vuex.auth.loggedIn) {
//         console.log(`Restoring persisted user cookie and token`)
//         console.dir(vuex.auth)

//         if (vuex.account) {
//           if (vuex.account.center_hierarchy) {
//             console.log('restoring persisted centers')
//             commit('account/setCenterHierarchy', vuex.account.center_hierarchy)
//           }
//           if (vuex.account.custom_labels) {
//             console.log('restoring persisted labels')
//             commit('account/setCustomLabels', vuex.account.custom_labels)
//           }
//         }
//       } else {
//         console.log('no logged in user found in vuex')
//         console.log('RESETTING STATES')
//         commit('account/reset')
//         commit('reports/reset')
//         commit('vehicle/reset')
//         // commit('auth/reset')
//         // await dispatch('auth/logout')
//         console.dir(state)
//         await this.$auth.logout()
//         console.log('LOGGED OUT!')
//       }
//     } catch (error) {
//       console.error('no valid cookie found', error)
//     }
// }
// let vuex = null
// // if there's a valid cookie, parse and load state
// if (req.headers.cookie) {
//   console.log(req.headers.cookie)
//   const parsed = Cookie.getJSON(req.headers.cookie)
//   console.log(parsed)
//   console.log('that was parsed')
//   try {
//     vuex = JSON.parse(parsed.vuex)
//     console.log(vuex)
//   } catch (err) {
//     // No valid cookie found
//     console.error('nuxtServerInit: ' + err)
//   }
// } else {
//   console.log('No vuex cookie found, go to login')
// }
// await dispatch('account/init')
