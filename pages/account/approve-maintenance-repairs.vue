<template>
  <v-card :loading="loading" outlined>
    <v-card-title class="font-lato">
      {{ $t('approve_your_maintenance_repairs') }}
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
    <v-divider />
    <v-card-text class="pa-0">
      <v-data-table
        :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
        :headers="headers"
        :items="items"
        :items-per-page="25"
        :loading="loading"
        :mobile-break-point="0"
        :search="search"
        :sort-by="[0]"
        :sort-desc="[false]"
        class="striped"
      >
        <template #item.vehicle_number="{ item }">
          <nuxt-link :title="$t(`to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" class="text-decoration-none" nuxt />
        </template>
        <template #item.date="{ item }">
          {{ item.date | date }}
        </template>
        <template #item.actions>
          <a class="text-decoration-none">
            Review/Approve
          </a>/
          <a class="text-decoration-none">
            Maintenance History
          </a>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- <v-card-actions /> -->
  </v-card>
</template>

<script>
export default {
  name: 'ApproveMaintenanceRepairs',
  data: () => ({
    loading: false,
    search: ''
  }),
  computed: {
    items () {
      return [
        {
          driver: 'ANDREW GRIFFITH',
          vehicle_number: 'E66429',
          year_make_model: '2019 DODGE DURANGO',
          date: '2020-02-01'
        }
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('driver'),
          value: 'driver',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_#'),
          value: 'vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('year_make_model'),
          value: 'year_make_model',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('date'),
          value: 'date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('actions'),
          value: 'actions',
          class: 'report-column'
        }
      ]
    }
  },
  head () {
    const title = this.$t('approve_your_maintenance_repairs')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
