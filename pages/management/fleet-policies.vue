<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card shaped outlined>
          <v-toolbar flat>
            <v-toolbar-title v-text="$t('manage_your_fleet_policies')" class="hidden-sm-and-down" />
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
          </v-toolbar>
          <v-card-text class="px-0">
            todo
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FleetPolicies',
  data: () => ({
    search: ''
  })
}
</script>
