<template>
  <v-container>
    <v-btn @click="centers_selected = []" class="mb-4" color="error" text>
      RESET
    </v-btn>
    <v-btn @click="select(['001', '002', '003'])" class="mb-4" color="error lighten-2">
      Test Selection by selecting 001, 002, 003
    </v-btn>
    <br>
    <v-dialog
      ref="centers_dialog"
      v-model="centers_dialog"
      max-width="1000"
      persistent
      scrollable
    >
      <template #activator="{ on }">
        <v-btn v-on="on" class="primary" text>
          Open Center Picker
          ({{ centers_selected.length }} selected)
        </v-btn>
      </template>
      <v-card class="mx-auto" max-width="1000">
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
            <v-checkbox
              v-model="case_sensitive_search"
              dark
              hide-details
              label="Case sensitive search"
            />
          </v-sheet>
        </v-sheet>
        <v-card-text class="row">
          <v-col cols="12" md="6">
            <v-treeview
              v-model="centers_selected"
              :items="centers"
              :filter="filter"
              :search="search"
              :return-value.sync="centers_selected"
              return-object
              selected-color="primary"
              item-children="children"
              item-key="center_code"
              item-text="center_name"
              selectable
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-scroll-x-transition group hide-on-leave tag="div" class="overflow-auto flex" style="height:100%;">
              <v-chip
                v-for="item in centers_selected"
                :key="`${item.center_code}`"
                class="mr-1 mb-1"
                color="primary lighten-2"
                text-color="white"
                small
              >
                <v-avatar left class="caption primary darken-2">
                  {{ item.center_code }}
                </v-avatar>
                {{ item.center_name }}
              </v-chip>
            </v-scroll-x-transition>
          </v-col>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          Centers Selected: {{ centers_selected.length }}
          <v-spacer />
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
export default {
  name: 'Centers',
  data: () => ({
    case_sensitive_search: false,
    centers_dialog: false,
    centers_selected: [],
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
      console.log(`Selected: ${this.centers_selected.map(x => x.center_code).join(', ')}`)
    },
    /**
     * Accepts a list of center_codes(strings), looks up the corresponding { code, name } objects and stores in centers_selected.
     */
    select (codes = []) {
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
