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
      elevation="1"
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
        <nuxt-link :to="localePath({ path: '/my-reports' })" class="text-decoration-none white--text">
          {{ $t('my_reports') }}
        </nuxt-link>
      </v-toolbar-title>
      <template #extension>
        <div class="body-2 font-weight-light">Load a saved report or build your own!</div>
      </template>
    </v-app-bar>
    <v-card :style="$vuetify.theme.dark ? 'border-bottom: thin solid rgba(255, 255, 255, 0.12)' : 'border-bottom: thin solid rgba(0, 0, 0, .12)'" flat tile>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-subheader class="pl-0 mb-2">{{ $t('load_a_saved_report') }}</v-subheader>
            <v-select
              v-model="selected_report"
              :items="saved_reports"
              :label="$t('pick_a_report')"
              :loading="saved_reports_loading"
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
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    // saved_reports: [],
    // selected_report: undefined
  }),
  computed: {
    // ...mapState('my-reports', ['selected_report']),
    ...mapGetters({
      saved_reports_loading: 'my-reports/getLoading',
      saved_reports: 'my-reports/getSavedReports'
      // selected_report: 'my-reports/getSelectedReport'
    }),
    selected_report: {
      set (reportId) {
        this.$store.commit('my-reports/setSelectedReport', reportId)
      },
      get () {
        return this.$store.state['my-reports'].selected_report
      }
    }
  },
  watch: {
    // change the query parameter when selected_report changes
    async selected_report () {
      if (this.$route.query.reportId !== this.selected_report) {
        await this.$router.replace({ query: { reportId: this.selected_report } })
      }
    }
  },
  async mounted () {
    // fetch saved reports from backend
    await this.$store.dispatch('my-reports/fetchSavedReports')
    if (this.$route.query && this.$route.query.reportId) {
      // this.selected_report = this.$route.query.reportId
      this.$store.commit('my-reports/setSelectedReport', this.$route.query.reportId)
    }
  }
}
</script>
