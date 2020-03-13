import { mapGetters } from 'vuex'
/**
 * Maps an array of strings to an array of TableHeader[] objects { text, value, class }
 * @returns {TableHeader[]}
 */
export const headers = {
  computed: {
    headers () {
      return this.columns.map((column, index) => {
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
 * Needed for downloading json as excel.
 */
export const downloadFields = {
  computed: {
    // downloadFields: vm => (Object.assign({}, ...vm.columns.map(column => ({ [vm.$i18n.t(column)]: column }))))
    ...mapGetters({
      center_levels: 'account/getCenterLevels'
    }),
    /**
     * Flatten an array of strings to a single object { text1: value1, text2: value2, etc... }
     */
    downloadFields () {
      const headers = Object.assign({}, ...this.columns.map(column => {
        // If this is a center level, lookup center level name from vuex.  Otherwise use the column as i18n translation key.
        let header
        if (column.startsWith('level_')) {
          if (this.center_levels[column] && this.center_levels[column].startsWith('level_')) {
            header = this.$i18n.t(column)
          } else {
            header = this.center_levels[column]
          }
        } else {
          header = this.$i18n.t(column)
        }
        return { [header]: column }
      }, this))
      return headers
    },
    /**
     * Name of exported file
     * example: EM102-InventoryReport-2020-03-13.xls
     */
    exportName () {
      const extension = '.xls'
      const acct = this.$auth.user.account || this.$i18n.t('account')
      const vehicle = this.vehicle_number
      const title = this.title || this.$i18n.t('report')
      const date = this.$moment().format()
      // const filename = `${acct}-${name}-${date}.xls`
      const filename = [acct, vehicle, title, date].filter(Boolean).join('-').concat(extension).replace(/\s/g, '')
      return filename
    }
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
