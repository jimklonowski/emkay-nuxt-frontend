<script>
import { VTreeview } from 'vuetify/lib'
export default {
  name: 'center-picker',
  extends: VTreeview,
  props: {
    // filter: {
    //   type: Function,
    //   default: () => {}
    // },
    // color: {
    //   type: String,
    //   default: 'primary'
    // },
    dense: {
      type: Boolean,
      default: true
    },
    expandIcon: {
      type: String,
      default: 'mdi-menu-down'
    },
    indeterminateIcon: {
      type: String,
      default: 'mdi-minus-box'
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default () {
        return this.$store.getters['account/getCenters']
      }
    },
    itemChildren: {
      type: String,
      default: 'children'
    },
    itemKey: {
      type: String,
      default: 'center_code'
    },
    itemText: {
      type: String,
      default: 'center_name'
    },
    offIcon: {
      type: String,
      default: 'mdi-checkbox-blank-outline'
    },
    onIcon: {
      type: String,
      default: 'mdi-checkbox-marked'
    },
    openAll: {
      type: Boolean,
      default: false
    },
    openOnClick: {
      type: Boolean,
      default: true
    },
    returnObject: {
      type: Boolean,
      default: true
    },
    rounded: {
      type: Boolean,
      default: false
    },
    search: {
      type: String,
      default: ''
    },
    selectedColor: {
      type: String,
      default: 'primary'
    },
    selectable: {
      type: Boolean,
      default: true
    },
    selectionType: {
      type: String,
      // default: 'independent'
      default: 'leaf' // or 'independent'
    },
    shaped: {
      type: Boolean,
      default: true
    },
    transition: {
      type: Boolean,
      default: false
    }
  },
  async created () {
    await this.$store.dispatch('account/fetchCenterHierarchy')
  }
}
</script>
