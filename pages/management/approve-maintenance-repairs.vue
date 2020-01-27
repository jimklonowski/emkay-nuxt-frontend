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
        dense
      />
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
    items: vm => [],
    headers: vm => []
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
