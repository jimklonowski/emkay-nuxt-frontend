<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-tabs v-model="tab" grow>
        <v-tabs-slider />
        <v-tab>Documents</v-tab>
        <v-tab>Notes</v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat tile>
              <v-carousel
                :continuous="false"
                :cycle="false"
                height="150"
              >
                asdf
              </v-carousel>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat tile>
              <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="5"
                :mobile-breakpoint="0"
                :sort-by="['date']"
                :sort-desc="[true]"
                class="striped"
                dense
              />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card-title>
    <!-- <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">

      </v-skeleton-loader>
    </v-card-text> -->
  </v-card>
</template>

<script>
import { headers } from '@/mixins/datatables'
export default {
  mixins: [headers],
  data () {
    return {
      initialized: false,
      tab: null
    }
  },
  computed: {
    columns () {
      return [
        'date',
        'timestamp',
        'note',
        'username'
      ]
    },
    notesRoute: vm => vm.localePath({ path: `/vehicle/${vm.$route.params.vehicle}/notes` }),
    items: vm => vm.$store.getters['vehicle/getNotes'],
    loading: vm => vm.$store.getters['vehicle/getNotesLoading']
  },
  async mounted () {
    const vehicle_number = this.$route.params.vehicle
    const filters = {
      command: 'NOTES',
      customer: 'EM102',
      vehicle_number,
      json: 'Y'
    }
    await this.$store.dispatch('vehicle/fetchNotes', { filters })
    this.initialized = true
  }
}
</script>
