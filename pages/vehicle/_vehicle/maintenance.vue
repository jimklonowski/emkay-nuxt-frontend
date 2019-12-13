<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="display-2 font-weight-thin">
        Maintenance Dashboard
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-btn @click="$router.go(-1)" text>
          Back
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined shaped>
          <v-card-text>
            <v-data-table />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Maintenance'
}
</script>
