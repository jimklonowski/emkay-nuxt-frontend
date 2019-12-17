<template>
  <v-container>
    <v-row no-gutters>
      <h1 class="display-3">
        {{ $t('ordering') }}
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
