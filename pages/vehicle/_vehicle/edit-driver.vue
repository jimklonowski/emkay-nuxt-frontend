<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <AddOrEditDriverForm :driver-id="driver_number">
          <template #title>
            {{ $t('edit_driver') }}
          </template>
          <template #subtitle>
            {{ driver_number }}
          </template>
          <template #history>
            <driver-vehicle-history :driver-id="driver_number" />
          </template>
        </AddOrEditDriverForm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { SnotifyPosition } from 'vue-snotify'
import { vehicleRoute } from '@/mixins/routing'
import AddOrEditDriverForm from '@/components/management/AddOrEditDriverForm'
import DriverVehicleHistory from '@/components/driver/DriverVehicleHistory'
export default {
  name: 'edit-driver',
  components: { AddOrEditDriverForm, DriverVehicleHistory },
  mixins: [vehicleRoute],
  head () {
    const title = this.$t('edit_driver')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  computed: {
    ...mapGetters({
      custom_labels: 'account/getCustomLabels',
      driver_details: 'driver/getDriverDetails',
      driver_number: 'driver/getDriverNumber',
      hasDriver: 'vehicle/hasDriver',
      hasVehicle: 'vehicle/hasVehicle',
      vehicle_details: 'vehicle/getVehicleDetails',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    model () {
      return {
        employee_id: this.employee_id,
        driver_first_name: this.driver_first_name,
        driver_last_name: this.driver_last_name,
        driver_address_1: this.driver_address_1,
        driver_address_2: this.driver_address_2,
        driver_city: this.driver_city,
        driver_state_province: this.driver_state_province,
        driver_postal_code: this.driver_postal_code,
        driver_county: this.driver_county,
        driver_phone: this.driver_phone,
        driver_mobile: this.driver_mobile,
        driver_email: this.driver_email,
        driver_misc_1: this.driver_misc_1,
        driver_misc_2: this.driver_misc_2,
        driver_misc_3: this.driver_misc_3,
        driver_misc_4: this.driver_misc_4
      }
    }
  },
  async mounted () {
    // reset form and load model
    // this.init()
    await this.initialize({ driver: this.driver_number })
  },
  methods: {
    ...mapActions({
      initialize: 'driver/init'
    }),
    init () {
      // clear inputs
      this.employee_id = null
      this.driver_first_name = null
      this.driver_last_name = null
      this.driver_address_1 = null
      this.driver_address_2 = null
      this.driver_city = null
      this.driver_state_province = null
      this.driver_postal_code = null
      this.driver_county = null
      this.driver_phone = null
      this.driver_mobile = null
      this.driver_email = null
      this.driver_misc_1 = null
      this.driver_misc_2 = null
      this.driver_misc_3 = null
      this.driver_misc_4 = null
      // load driver from vuex
      if (this.hasDriver) {
        this.loadCurrentDriver()
      }
      this.reset()
    },
    loadCurrentDriver () {
      this.employee_id = this.driver_details.employee_id
      this.driver_first_name = this.driver_details.first_name
      this.driver_last_name = this.driver_details.last_name
      this.driver_address_1 = this.driver_details.address_1
      this.driver_address_2 = this.driver_details.address_2
      this.driver_city = this.driver_details.city
      this.driver_state_province = this.driver_details.state_province
      this.driver_postal_code = this.driver_details.postal_code
      this.driver_county = this.driver_details.county
      this.driver_phone = this.driver_details.phone
      this.driver_mobile = this.driver_details.mobile
      this.driver_email = this.driver_details.email
      this.driver_misc_1 = this.driver_details.misc_1
      this.driver_misc_2 = this.driver_details.misc_2
      this.driver_misc_3 = this.driver_details.misc_3
      this.driver_misc_4 = this.driver_details.misc_4
    },
    reset () {
      this.$refs.driverForm.reset()
    },
    async submitEditDriver () {
      this.loading = true
      try {
        await this.$axios.post('/driver/edit', this.model)
      } catch (error) {
        console.error(error)
        this.$snotify.error(error.message, this.$i18n.t('error'), { position: SnotifyPosition.centerTop })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
