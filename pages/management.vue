<template>
  <v-container>
    <v-row>
      <h1 class="display-3">
        {{ $t('management.menu_title') }}
      </h1>
    </v-row>
    <v-row>
      <nuxt-child />
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth']
}
</script>
