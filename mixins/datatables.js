import { mapGetters } from 'vuex'
/**
 * Maps an array of strings to an array of TableHeader[] objects { text, value, class }
 * @returns {TableHeader[]}
 */
export const headers = {
  computed: {
    headers () {
      return this.columns.map((column) => {
        return {
          text: this.$i18n.t(column),
          value: column,
          class: 'report-column'
          // align: 'start',
          // sortable: true,
          // filterable: true,
          // divider: true,
          // width: 'auto',
          // filter: () => true,
          // sort: (a, b) => ...
        }
      })
    }
  }
}

/**
 * Flatten an array of strings to a single object { text1: value1, text2: value2, etc... }
 * Needed for downloading json as excel.
 */
export const downloadFields = {
  computed: {
    downloadFields: vm => (Object.assign({}, ...vm.columns.map(column => ({ [vm.$i18n.t(column)]: column }))))
  }
}

/**
 * MapGetters for report data
 */
export const reportGetters = {
  computed: {
    ...mapGetters('reports', {
      'items': 'getData',
      'error': 'getError',
      'loading': 'getLoading'
    })
    // above is equivalent to:
    // items: vm => vm.$store.getters['reports/getData'],
    // error: vm => vm.$store.getters['reports/getError'],
    // loading: vm => vm.$store.getters['reports/getLoading']
  }
}
