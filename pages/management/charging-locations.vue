<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ $t('ev_charging_locations') }}</v-card-title>
          <v-divider />
          <v-card-text class="responsive-embed">
            <iframe
              :src="src"
              allow="geolocation"
              frameborder="0"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'ChargingLocations',
  data: () => ({

  }),
  computed: {
    src () {
      return '//map.openchargemap.io/?mode=embedded'
    }
  }
}
</script>
<style lang="scss">
.charging-locations::before {
  content: "";
  display: block;
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/ev2.png);
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.3;
}
.responsive-embed {
  position: relative;
  height: 0;
  margin-bottom: 1rem;
  padding-bottom: 60%;
  overflow: hidden;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
