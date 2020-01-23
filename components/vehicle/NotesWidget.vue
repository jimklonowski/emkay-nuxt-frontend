<template>
  <v-card outlined>
    <v-card-title class="pa-0">
      <v-list-item :to="notesRoute" link style="height:80px;">
        <v-list-item-avatar>
          <v-icon v-text="'mdi-message-bulleted'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="''" class="overline" />
          <v-list-item-title v-text="$t('notes')" />
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-0">
      <v-skeleton-loader :loading="!initialized" type="table">
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
      </v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
import { headers } from '@/mixins/datatables'
export default {
  mixins: [headers],
  data () {
    return {
      initialized: false
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
    items: vm => vm.$store.getters['vehicle/getVehicleNotes'],
    loading: vm => vm.$store.getters['vehicle/getVehicleNotesLoading']
  },
  async mounted () {
    const vehicle_number = this.$route.params.vehicle
    const filters = {
      command: 'NOTES',
      customer: 'EM102',
      vehicle_number,
      json: 'Y'
    }
    await this.$store.dispatch('vehicle/fetchVehicleNotes', { filters })
    this.initialized = true
  }
}
</script>
