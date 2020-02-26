<template>
  <span>
    <v-app-bar
      :src="require('@/assets/myreports.jpg')"
      :elevate-on-scroll="false"
      dark
      extended
      prominent
      flat
      hide-on-scroll
      elevation="4"
      scroll-threshold="60"
      class="emkay-image-nav"
    >
      <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25, 32, 72, .7)"
        />
      </template>
      <v-toolbar-title>
        <nuxt-link :to="localePath({ path: 'my-reports' })" class="text-decoration-none white--text">
          {{ $t('my_reports') }}
        </nuxt-link>
      </v-toolbar-title>
      <template #extension>
        <p class="body-2 font-weight-light">Load a saved report or build your own!</p>
      </template>
    </v-app-bar>
    <v-card tile outlined>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-subheader>{{ $t('load_a_saved_report') }}</v-subheader>
            <v-select
              v-model="selected_report"
              :items="saved_reports"
              :label="$t('pick_a_report')"
              :menu-props="{ bottom: true, offsetY: true }"
              max-width="auto"
              outlined
              dense
              clearable
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </span>
</template>
<script>
export default {
  data: () => ({
    saved_reports: [],
    selected_report: undefined
  }),
  watch: {
    // change the query parameter when selected_report changes
    async selected_report () {
      if (this.$route.query.reportId !== this.selected_report) {
        await this.$router.replace({ query: { reportId: this.selected_report } })
      }
    }
  },
  async mounted () {
    await this.getSavedReports()
    if (this.$route.query && this.$route.query.reportId) {
      this.selected_report = this.$route.query.reportId
    }
  },
  methods: {
    async getSavedReports () {
      await console.log('Fetching Saved Reports')
      // TODO...
      this.saved_reports = [
        { header: `${this.$i18n.t('your_saved_reports')} (mocked)` },
        'ABC123',
        'QWERTY666'
      ]
    }
  }
}
</script>
