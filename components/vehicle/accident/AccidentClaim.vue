<template>
  <v-card :loading="loading">
    <v-toolbar color="primary" dark>
      <v-btn @click="$emit('close-dialog')" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-divider vertical inset class="mr-4" />
      <v-toolbar-title>
        {{ $t('accident_claim_inquiry') }}
      </v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-expansion-panels
            :value="expansion_panels"
            :dark="false"
            accordion
            hover
            multiple
            tile
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="text-uppercase" color="primary white--text">
                {{ $t('vehicle_and_driver_details') }}
                <template #actions>
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row justify="end">
                  <v-col cols="12" sm="6">
                    <v-list subheader dense>
                      <v-subheader>
                        {{ $t('vehicle_details') }}
                      </v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('vehicle_number') }}</v-list-item-title>
                          <v-list-item-subtitle>E53112</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('year_make_model') }}</v-list-item-title>
                          <v-list-item-subtitle>2019 FORD EXPLORER SPORT</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('vin') }}</v-list-item-title>
                          <v-list-item-subtitle>1234567890</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-list two-line subheader dense>
                      <v-subheader>
                        {{ $t('driver_details') }}
                      </v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('driver_name') }}</v-list-item-title>
                          <v-list-item-subtitle>BRAD VLIEK</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('driver_phone') }}</v-list-item-title>
                          <v-list-item-subtitle>2019 FORD EXPLORER SPORT</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('driver_email_address') }}</v-list-item-title>
                          <v-list-item-subtitle>bvliek@okay.com</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-list subheader dense>
                      <v-subheader>
                        {{ $t('actual_driver') }}
                      </v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('driver_name') }}</v-list-item-title>
                          <v-list-item-subtitle>BRAD VLIEK</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('driver_phone') }}</v-list-item-title>
                          <v-list-item-subtitle>2019 FORD EXPLORER SPORT</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('driver_email_address') }}</v-list-item-title>
                          <v-list-item-subtitle>bvliek@okay.com</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-uppercase" color="primary white--text">
                {{ $t('loss_details') }}
                <template #actions>
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row no-gutters>
                  <v-col cols="12" sm="6">
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('accident_date') }}</v-list-item-title>
                          <v-list-item-subtitle>{{ '2019-06-28' | datetime }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('city_state_zip') }}</v-list-item-title>
                          <v-list-item-subtitle>N/A</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('location_type') }}</v-list-item-title>
                          <v-list-item-subtitle>INTERSECTION</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('location_description') }}</v-list-item-title>
                          <v-list-item-subtitle>N/A</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('date_reported') }}</v-list-item-title>
                          <v-list-item-subtitle>{{ '2019-06-28' | datetime }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('reported_by') }}</v-list-item-title>
                          <v-list-item-subtitle>Fleet driver</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('percentage_of_fault') }}</v-list-item-title>
                          <v-list-item-subtitle>0 %</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('preventable') }}</v-list-item-title>
                          <v-list-item-subtitle>N/A</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('claim_number') }}</v-list-item-title>
                          <v-list-item-subtitle>
                            <v-chip outlined small>
                              123456
                            </v-chip>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('claim_type') }}</v-list-item-title>
                          <v-list-item-subtitle>Collision</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('claim_category') }}</v-list-item-title>
                          <v-list-item-subtitle>Sideswiped Collision</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('point_of_impact') }}</v-list-item-title>
                          <v-list-item-subtitle>Right fender</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('comments') }}</v-list-item-title>
                          <v-list-item-subtitle>N/A</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('contributing_factors') }}</v-list-item-title>
                          <v-list-item-subtitle>N/A</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col cols="12">
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{ $t('loss_description') }}</v-list-item-title>
                          <p class="caption font-weight-medium grey--text text--darken-1">
                            Vehicle 2 attempted lane change from straight direction lane to left turn lane crossing over solid white line striking entire right side of vehicle 1 with left front corner of vehicle 2.
                          </p>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-uppercase" color="primary white--text">
                {{ $t('additional_information') }}
                <template #actions>
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list subheader dense>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ $t('documents') }}</v-list-item-title>
                      <v-list-item-subtitle>
                        <nuxt-link
                          :to="'/home'"
                        >
                          SKM_C36819062812380.PDF
                        </nuxt-link>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ $t('photos') }}</v-list-item-title>
                      <v-list-item-subtitle>
                        <v-carousel>
                          <v-carousel-item
                            v-for="(image, index) in claim_images"
                            :key="index"
                            :height="200"
                            :src="image.src"
                          >
                            <template #default>
                              <v-img :src="image.src" />
                            </template>
                          </v-carousel-item>
                        </v-carousel>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-uppercase" color="primary white--text">
                {{ $t('non_emkay_vehicles') }}
                <template #actions>
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-simple-table light dense>
                  <template #default>
                    <thead>
                      <tr>
                        <th>{{ $t('year_make_model') }}</th>
                        <th>{{ $t('owner') }}</th>
                        <th>{{ $t('damage_description') }}</th>
                        <th>{{ $t('at_fault') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>GMC</td>
                        <td>Larry Steen</td>
                        <td>Left Front</td>
                        <td>NO</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-uppercase" color="primary white--text">
                {{ $t('vendors') }}
                <template #actions>
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                no data found
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-uppercase" color="primary white--text">
                {{ $t('transaction_summary') }}
                <template #actions>
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                no data found
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-uppercase" color="primary white--text">
                {{ $t('notes') }}
                <template #actions>
                  <v-icon color="white">
                    mdi-chevron-down
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-simple-table dense>
                  <template #default>
                    <thead>
                      <tr>
                        <th>{{ $t('date') }}</th>
                        <th>{{ $t('username') }}</th>
                        <th>{{ $t('note') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ '2019-07-01' | date }}</td>
                        <td>{{ 'MXL' }}</td>
                        <td>claim will be handled by Ford since this is a demo vehicle. Advised Brad to contact Ford. Deleted claim.</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    claimNumber: {
      type: String,
      required: true
    }
  },
  data: () => ({
    claim: {},
    claim_images: [],
    expansion_panels: [0, 1, 2, 3, 4, 5, 6],
    images_loading: false,
    loading: false
  }),
  computed: {
    vehicle_number: vm => vm.$store.getters['vehicle/getVehicleNumber']
  },
  async mounted () {
    await this.populateClaim()
    await this.fetchImages()
  },
  methods: {
    async fetchImages () {
      try {
        this.images_loading = true
        const vehicle = this.vehicle_number
        const claim = this.claimNumber
        const { data: { success, message, data } } = await this.$axios.get('/vehicle/accident-claim-images', { params: { vehicle, claim } })
        if (!success) { throw new Error(message) }
        this.claim_images = data
      } catch (error) {
        console.error(error.message)
      } finally {
        this.images_loading = false
      }
    },
    async populateClaim () {
      try {
        this.loading = true
        const vehicle = this.vehicle_number
        const claim = this.claimNumber
        const { data: { success, message, data } } = await this.$axios.get('/vehicle/accident-claim', { params: { vehicle, claim } })
        if (!success) { throw new Error(message) }
        this.claim = data
      } catch (error) {
        console.error(error.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
