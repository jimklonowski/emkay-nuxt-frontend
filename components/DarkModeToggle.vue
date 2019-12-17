<template>
  <v-btn :title="$t('dark_mode')" @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark" icon>
    <v-icon>{{ $vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-brightness-7' }}</v-icon>
  </v-btn>
</template>
