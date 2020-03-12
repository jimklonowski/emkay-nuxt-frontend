<template>
  <v-card outlined class="report">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{ $t('manage_your_drivers') }}</v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        background-color="transparent"
        class="mr-2"
        clearable
        dense
        flat
        hide-details
        outlined
        rounded
        single-line
        solo
      />
      <client-only>
        <v-divider vertical inset class="mx-3" />
        <!-- Edit/Create Dialog -->
        <v-dialog v-model="dialog" max-width="75vw" persistent scrollable>
          <template #activator="{ on }">
            <v-btn v-on="on" @click="driverId = undefined" color="primary" rounded depressed>
              <v-icon v-text="'mdi-account-plus'" class="mr-2" />
              {{ $t('add_new_driver') }}
            </v-btn>
          </template>
          <driver-details-form @close="dialog = false" :driver-id="driverId" />
        </v-dialog>
      </client-only>
      <!-- Download as XLS button -->
      <!-- <client-only>
        <v-divider vertical inset class="mx-3" />
        <download-excel :fields="downloadFields" :data="items">
          <v-btn :title="`${$t('save')} .xls`" color="primary" large icon>
            <v-icon v-text="'mdi-cloud-download'" />
          </v-btn>
        </download-excel>
      </client-only> -->
    </v-toolbar>
    <v-divider />

    <v-skeleton-loader :loading="loading" type="table">
      <v-data-table
        :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
        :headers="headers"
        :items="items"
        :items-per-page="25"
        :loading="loading"
        :mobile-break-point="0"
        :search="search"
        :sort-by="['last_name']"
        :sort-desc="[false]"
        class="striped"
        dense
      >
        <!-- Configure the #no-data message (no data from server) -->
        <template #no-data>
          <div class="text-left">
            {{ $t('no_data_found', { 'message': error }) }}
          </div>
        </template>

        <!-- Configure the #no-results message (no rows in filtered search) -->
        <template #no-results>
          <div class="text-left">
            {{ $t('no_search_results', { 'query': search }) }}
          </div>
        </template>

        <!-- Customize rendering of individual columns -->
        <template #item.actions="{ item }">
          <v-btn @click.stop="editDriver(item)" icon>
            <v-icon v-text="'mdi-account-edit'" />
          </v-btn>
        </template>

        <template #item.vehicle_number="{ item }">
          <nuxt-link :title="$t(`to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" class="text-decoration-none" nuxt />
        </template>

        <template #item.driver_phone="{ item }">
          <v-btn
            v-show="item.driver_phone"
            @click="dialTo(item.driver_phone)"
            text
            small
            tile
          >
            <v-icon v-text="'mdi-phone'" class="mr-2" />
            {{ item.driver_phone | phone }}
          </v-btn>
        </template>

        <template #item.driver_mobile="{ item }">
          <v-btn
            v-show="item.driver_mobile"
            @click="dialTo(item.driver_mobile)"
            text
            small
            tile
          >
            <v-icon v-text="'mdi-cellphone-iphone'" class="mr-2" />
            {{ item.driver_mobile | phone }}
          </v-btn>
        </template>

        <template #item.driver_email_address="{ item }">
          <v-btn
            v-show="item.driver_email_address"
            @click="emailTo(item.driver_email_address)"
            text
            small
            tile
          >
            <v-icon v-text="'mdi-email-edit'" class="mr-2" />
            {{ item.driver_email_address }}
          </v-btn>
        </template>
      </v-data-table>
    </v-skeleton-loader>
    <!-- <v-card-actions /> -->
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { dialTo, emailTo } from '@/utility/helpers'
import { downloadFields } from '@/mixins/datatables'
// import AddOrEditDriverForm from '@/components/management/AddOrEditDriverForm'
export default {
  name: 'ManageYourDrivers',
  components: {
    'driver-details-form': () => import(/* webpackChunkName: "DriverDetailsForm" */ `@/components/driver/DriverDetailsForm.vue`)
  },
  mixins: [downloadFields],
  data: () => ({
    dialog: false,
    driverId: undefined,
    search: ''
  }),
  computed: {
    ...mapGetters({
      items: 'drivers/getDrivers',
      error: 'drivers/getError',
      loading: 'drivers/getLoading'
    }),
    columns () {
      return [
        'actions',
        'reference_number',
        'driver_vehicle',
        'last_name',
        'first_name',
        'address_1',
        'address_2',
        'city',
        'state_province',
        'postal_code',
        'county',
        'phone',
        'mobile',
        'email',
        'employee_id',
        'misc_1',
        'misc_2',
        'misc_3',
        'misc_4'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('actions'),
          value: 'actions',
          class: 'report-column',
          align: 'center',
          divider: true
        },
        {
          text: this.$i18n.t('driver_reference_number'),
          value: 'reference_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_number'),
          value: 'driver_vehicle',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_last_name'),
          value: 'last_name',
          class: 'report-column',
          width: 250,
          divider: true
        },
        {
          text: this.$i18n.t('driver_first_name'),
          value: 'first_name',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('driver_address_1'),
          value: 'address_1',
          class: 'report-column',
          width: 250,
          divider: true
        },
        {
          text: this.$i18n.t('driver_address_2'),
          value: 'address_2',
          class: 'report-column',
          width: 250,
          divider: true
        },
        {
          text: this.$i18n.t('driver_city'),
          value: 'city',
          class: 'report-column',
          width: 250,
          divider: true
        },
        {
          text: this.$i18n.t('driver_state_province'),
          value: 'state_province',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_postal_code'),
          value: 'postal_code',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_county'),
          value: 'county',
          class: 'report-column',
          width: 250,
          divider: true
        },
        {
          text: this.$i18n.t('driver_phone'),
          value: 'phone',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_mobile'),
          value: 'mobile',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_email_address'),
          value: 'email',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_employee_id'),
          value: 'employee_id',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_misc_1'),
          value: 'misc_1',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_misc_2'),
          value: 'misc_2',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_misc_3'),
          value: 'misc_3',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_misc_4'),
          value: 'misc_4',
          class: 'report-column',
          divider: true
        }
      ]
    }
  },
  async asyncData ({ store }) {
    await store.dispatch('drivers/fetchDrivers')
    return {}
  },
  methods: {
    dialTo,
    emailTo,
    editDriver (item) {
      this.driverId = item.reference_number
      this.dialog = true
    }
  },
  head () {
    const title = this.$t('manage_your_drivers')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
