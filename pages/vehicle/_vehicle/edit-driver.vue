<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-btn @click="$router.go(-1)" text>
          <v-icon class="mr-2">
            mdi-chevron-left
          </v-icon>
          {{ $t('navigation.back') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1>Edit Driver</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'edit-driver'
}
</script>
