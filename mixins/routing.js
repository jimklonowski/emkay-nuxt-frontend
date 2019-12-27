/**
 * Updates the query parameters and URL, triggering watchQuery handlers.
 * Requires that there is a computed property named 'query' that returns the query object
 */
export const updateQuery = {
  methods: {
    updateQuery () {
      if (!this.query) { throw new Error(`[Error]: 'query' method not found in 'computed'.`) }
      const query = this.query
      this.$router.push({ query })
    }
  }
}

/**
 * Get localized route to /vehicle dashboard using current vehicle param
 */
export const vehicleRoute = {
  computed: {
    vehicleRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}` })
  }
}
