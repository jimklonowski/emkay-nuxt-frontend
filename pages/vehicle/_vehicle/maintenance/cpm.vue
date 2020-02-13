<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <MaintenanceCPM />
      </v-col>
      <v-col cols="12" lg="6">
        <v-card
          class="mx-auto text-center"
          color="primary"
          dark
          max-width="600"
        >
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :value="value"
                color="rgba(255, 255, 255, .7)"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              >
                <template v-slot:label="item">
                  ${{ item.value }}
                </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="display-1 font-weight-thin">
              Here is some chart data
            </div>
          </v-card-text>

          <v-divider />

          <v-card-actions class="justify-center">
            <v-btn block text>
              This is a button
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import MaintenanceCPM from '@/components/vehicle/maintenance/MaintenanceCPM'
export default {
  name: 'VehicleMaintenanceCPM',
  components: { MaintenanceCPM },
  data: () => ({
    value: [423, 446, 675, 510, 590, 610, 760]
  }),
  computed: {
    ...mapGetters({
      vehicle_number: 'vehicle/getVehicleNumber'
    })
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$i18n.t('cpm')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
