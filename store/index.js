export const state = () => ({})

export const actions = {
  /**
   * nuxtServerInit is called on the server on first load or when reloading.
   * We can restore the auth and account vuex states and re-login from here
   * https://nuxtjs.org/guide/vuex-store#the-nuxtserverinit-action
   * Also: https://zendev.com/2018/06/07/async-data-options-in-vue-nuxt.html
   */
  async nuxtServerInit ({ commit, dispatch }, { app, params, redirect, req, res, route }) {
    if (process.server) {
      await console.log('[nuxtServerInit] server')
      // const cookie = app.$cookies.get('SESSIONID')
      // const u = await app.$axios.get('/user')
      // console.log(u)
      // console.log(app.$auth.user)
      // console.log(route)
      app.$auth.fetchUser()
      console.log(app.$auth.user)
      if (app.$auth.loggedIn) {
        console.log('logged in')
        await dispatch('account/init')
        // if the app was initiated using a vehicle# param in url, call the vehicle/init
        if (route.path.includes('/vehicle/')) {
          if (params && params.vehicle) {
            const vehicle = params.vehicle
            console.log(`[nuxtServerInit] vehicle dashboard #${vehicle}`)
            await dispatch('vehicle/init', { vehicle })
          } else {
            console.log(`[nuxtServerInit] redirecting /vehicle/ to /vehicle-search`)
            redirect(app.localePath({ path: '/vehicle-search' }))
          }
        }
      } else {
        console.log('[nuxtServerInit] logout')
        await dispatch('account/logout')
        redirect(app.localePath({ path: '/login' }))
      }
      // else {
      //   console.log('[nuxtServerInit] logout')
      //   await dispatch('account/logout')
      //   // redirect(app.localePath({ path: '/login' }))
      //   // console.log(app.i18n.locale) // LOCALE
      // }
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
