<template>
  <v-container class="welcome" fill-height>
    <v-row justify="center">
      <v-col cols="auto">
        <h1 v-text="$t('welcome_to_emkay')" class="display-3 font-weight-thin" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  middleware: ['check-auth'],
  head () {
    const title = this.$t('home')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
<style>
.welcome::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/road.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  opacity: 0.3;
}
</style>
