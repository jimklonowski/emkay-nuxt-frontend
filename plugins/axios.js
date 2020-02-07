export default function ({ $axios, store, redirect }) {
  $axios.interceptors.response.use(res => res, async error => {
    if (error.response.status === 401) {
      await store.dispatch('account/logout')
      return error
    }
  })
  // $axios.onError(async error => {
  //   if (error.response.status === 401) {
  //     console.log('dispatching logout...')
  //     await store.dispatch('account/logout').then(() => {
  //       console.log('401 ERROR -> LOGIN')
  //       // redirect('/login')
  //     })
  //   } else {
  //     Promise.reject(error)
  //   }
  // })
  // configure axios timeout
  // $axios.defaults.timeout = 1000

  // $axios.onRequest((config) => {
  //   console.log(`Making request to ${config.url}`)
  // })
  // $axios.onError((error) => {
  //   console.error(`Axios error (${error.response.status}): ${error.response}`)
  //   // const code = parseInt(error.response && error.response.status)
  //   // if (code === 400) {
  //   //   redirect('/400')
  //   // }
  // })

  // $axios.onRequest(config => {
  //   config.withCredentials = true
  //   return config
  // })
}
