<template>
  <v-container>
    <v-row>
      <v-scroll-x-transition group hide-on-leave tag="div" class="overflow-auto flex" style="height:100%;">
        <v-chip
          v-for="item in centers_selected"
          :key="`${item.center_code}`"
          class="mr-1 mb-1"
          color="primary lighten-2"
          text-color="white"
          small
        >
          <!-- <v-avatar left class="caption primary darken-2">
            {{ item.center_code }}
          </v-avatar> -->
          {{ item.center_name || item.center_code }}
        </v-chip>
      </v-scroll-x-transition>
    </v-row>
    <v-btn @click="selectCenters(['001', '002', '003'])" class="mb-4" color="error lighten-2">
      Test Selection by selecting 001, 002, 003
    </v-btn>
    <br>
    <v-dialog
      ref="centers_dialog"
      v-model="centers_dialog"
      max-width="650"
      scrollable
    >
      <template #activator="{ on }">
        <v-btn v-on="on" class="primary" text>
          Open Center Picker
          ({{ centers_selected.length }} selected)
        </v-btn>
      </template>
      <v-card class="mx-auto" max-width="650">
        <v-sheet class="pa-0 primary lighten-2" dark>
          <v-toolbar flat color="transparent">
            <v-toolbar-title>{{ $t('centers') }}</v-toolbar-title>
            <v-spacer />
            <v-btn @click="centers_dialog = false" icon>
              <v-icon v-text="'mdi-close'" />
            </v-btn>
          </v-toolbar>
          <v-sheet class="primary lighten-1 flex-column pa-4" dark>
            <v-text-field
              v-model="search"
              label="Search Centers"
              dark
              flat
              solo-inverted
              hide-details
              clearable
              clear-icon="mdi-close-circle-outline"
            />
            <!-- <v-checkbox
              v-model="case_sensitive_search"
              dark
              hide-details
              label="Case sensitive search"
            /> -->
          </v-sheet>
        </v-sheet>
        <v-card-text>
          <center-picker v-model="centers_selected" :return-value.sync="centers_selected" :search="search" />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          Centers Selected: {{ centers_selected.length }}
          <v-spacer />
          <v-btn @click="centers_selected = [], search = ''" color="error" text>
            RESET
          </v-btn>
          <v-btn @click="centers_dialog = false">
            {{ $t('ok') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CenterPicker from '@/components/core/CenterPicker'
export default {
  name: 'Centers',
  components: { CenterPicker },
  data: () => ({
    case_sensitive_search: false,
    centers_dialog: false,
    centers_selected: [],
    centers_selected2: [],
    search: ''
  }),
  computed: {
    ...mapGetters({
      centers: 'account/getCenters',
      flat_centers: 'account/getFlattenedCenters'
    }),
    filter () {
      return this.case_sensitive_search
        ? (item, search, textKey) => item[textKey].includes(search)
        : undefined
    },
    selectedList () {
      return this.centers_selected.map(x => x.center_code).join(', ')
    },
    selectedList2 () {
      return this.centers_selected2.map(x => x.center_code).join(', ')
    }
  },
  watch: {
    centers_selected () {
      // this.printSelection()
    }
  },
  async mounted () {
    await this.$store.dispatch('account/fetchCenterHierarchy')
    // console.log(this.centers)
    // console.log(this.flat_centers)
  },
  methods: {
    printSelection () {
      console.log(`Selected: ${this.selectedList}`)
    },
    printSelection2 () {
      console.log(`Selected2: ${this.selectedList2}`)
    },
    /**
     * Accepts a list of center_codes(strings), looks up the corresponding { code, name } objects and stores in centers_selected.
     */
    selectCenters (codes = []) {
      if (!codes.length) { return }
      const array = []
      codes.forEach(x => {
        const item = this.flat_centers.find(y => {
          return y.center_code === x
        })
        if (item) { array.push(item) }
      }, this)
      this.centers_selected = array
    }
  }
}
</script>
