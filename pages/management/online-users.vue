<template>
  <v-card outlined>
    <v-card-title class="font-lato">
      {{ $t('manage_your_online_users') }}
      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        clearable
        dense
        flat
        hide-details
        outlined
        rounded
        single-line
        solo
      />
    </v-card-title>
    <v-card-text class="pa-0">
      <v-data-table
        :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
        :headers="headers"
        :items="items"
        :items-per-page="25"
        :loading="loading"
        :mobile-break-point="0"
        :search="search"
        :sort-by="['vehicle_number']"
        :sort-desc="[false]"
        class="striped"
        dense
      />
    </v-card-text>
    <!-- <v-card-actions /> -->
  </v-card>
</template>

<script>
import { dialTo, emailTo } from '@/utility/helpers'
export default {
  name: 'ManageYourDrivers',
  computed: {
    columns () {
      return []
    },
    headers () {
      return [
        // {
        //   text: this.$i18n.t('actions'),
        //   value: 'actions',
        //   class: 'report-column',
        //   align: 'center',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('vehicle_number'),
        //   value: 'vehicle_number',
        //   class: 'report-column',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_last_name'),
        //   value: 'driver_last_name',
        //   class: 'report-column',
        //   width: 200,
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_first_name'),
        //   value: 'driver_first_name',
        //   class: 'report-column',
        //   width: 150,
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_address_1'),
        //   value: 'driver_address_1',
        //   class: 'report-column',
        //   width: 200,
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_address_2'),
        //   value: 'driver_address_2',
        //   class: 'report-column',
        //   width: 200,
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_city'),
        //   value: 'driver_city',
        //   class: 'report-column',
        //   width: 150,
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_state_province'),
        //   value: 'driver_state_province',
        //   class: 'report-column',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_postal_code'),
        //   value: 'driver_postal_code',
        //   class: 'report-column',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_county'),
        //   value: 'driver_county',
        //   class: 'report-column',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_phone'),
        //   value: 'driver_phone',
        //   class: 'report-column',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_mobile'),
        //   value: 'driver_mobile',
        //   class: 'report-column',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_email_address'),
        //   value: 'driver_email_address',
        //   class: 'report-column',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_employee_id'),
        //   value: 'driver_employee_id',
        //   class: 'report-column',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_misc_1'),
        //   value: 'driver_misc_1',
        //   class: 'report-column',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_misc_2'),
        //   value: 'driver_misc_2',
        //   class: 'report-column',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_misc_3'),
        //   value: 'driver_misc_3',
        //   class: 'report-column',
        //   divider: true
        // },
        // {
        //   text: this.$i18n.t('driver_misc_4'),
        //   value: 'driver_misc_4',
        //   class: 'report-column',
        //   divider: true
        // }
      ]
    },
    items: vm => vm.$store.getters['users/getUsers'],
    error: vm => vm.$store.getters['users/getError'],
    loading: vm => vm.$store.getters['users/getLoading']
  },
  async asyncData ({ store }) {
    let search
    const filters = {
      command: 'FLEET',
      subcommand: 'USERS',
      customer: 'EM102',
      json: 'Y'
    }
    // Fetch users
    await store.dispatch('users/fetchOnlineUsers', filters)
    return {
      search
    }
  },
  methods: {
    dialTo,
    emailTo
  },
  head () {
    const title = this.$t('manage_your_online_users')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
