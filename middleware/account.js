export default async ({ store }) => {
  // need a better check to see if labels are missing, but this works. check if label_1 is null, then fetch
  if (!store.getters['account/isInitialized']) {
    console.log('Calling account/init to fetch custom labels and centers')
    // fetch labels and centers
    await store.dispatch('account/init')
  }
}
