<template>
  <v-card outlined class="report">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{ $t('driver_record') }}</v-toolbar-title>
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

      <!-- Download as XLS button -->
      <client-only>
        <v-divider vertical inset class="mx-3" />
        <download-excel :fields="downloadFields" :data="items">
          <v-btn :title="`${$t('save')} .xls`" color="primary" large icon>
            <v-icon v-text="'mdi-cloud-download'" />
          </v-btn>
        </download-excel>
      </client-only>
    </v-toolbar>
    <v-divider />

    <!-- Report Filters -->
    <!-- ... -->

    <!-- Report Content -->
    <v-skeleton-loader :loading="loading" type="table">
      <v-data-table
        :dense="items && !!items.length"
        :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
        :headers="headers"
        :items="items"
        :items-per-page="25"
        :loading="loading"
        :mobile-breakpoint="0"
        :search="search"
        :sort-by="['driver_id']"
        :sort-desc="[true]"
        class="striped"
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
      </v-data-table>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
/**
 * Driver Record Report
 */
export default {
  name: 'DriverRecord',
  mixins: [downloadFields],
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapGetters({
      items: 'reports/getData',
      error: 'reports/getError',
      loading: 'reports/getLoading'
    }),
    columns () {
      return [
        'driver_id',
        'last_name',
        'first_name',
        'license_number',
        'date_of_birth',
        'state_province'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('driver_id'),
          value: 'driver_id',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('last_name'),
          value: 'last_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('first_name'),
          value: 'first_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('license_number'),
          value: 'license_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('state_province'),
          value: 'state_province',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('date_of_birth'),
          value: 'date_of_birth',
          class: 'report-column'
        }
      ]
    }
  },
  async asyncData ({ store }) {
    await store.dispatch('reports/fetchDriverRecordReport')
    return {}
  },
  head () {
    const title = this.$t('driver_record')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
