// export default async ({ $axios, store, req, res }) => {
export default async ({ app, $axios, store, req, res }) => {
  if (process.server) {
    // console.log('account server middleware!')
    // console.log($axios.defaults)
    // // await $axios.get('/user').then(response => console.log('done ' + response))
    // await $axios.get(`${process.env.BASE_URL}/user`)
  }
  if (!store.getters['account/isInitialized']) {
    console.log('Calling account/init to fetch custom labels and centers')
    // fetch labels and centers
    await store.dispatch('account/init')
  }
}
