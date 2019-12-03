<template>
  <v-container>
    <!-- <v-toolbar>
      <v-toolbar-title />
      <v-spacer />
      <v-toolbar-items>
        <reports-mega-menu />
      </v-toolbar-items>
    </v-toolbar> -->
    <v-row>
      <nuxt-child />
    </v-row>
  </v-container>
</template>

<script>
// import ReportsMegaMenu from '@/components/ReportsMegaMenu'
export default {
  name: 'Reporting',
  layout: 'reports',
  middleware: ['auth'],
  components: {
    // ReportsMegaMenu
  }
}
</script>

<style>

</style>
