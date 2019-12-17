import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      // persist in localstorage on refresh
      // change later to something more secure than default localstorage
      modules: ['account']
    }).plugin(store)
  })
}
