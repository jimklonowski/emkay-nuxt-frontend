<template>
  <!-- <v-col :cols="12" :lg="showMore ? 12 : 6"> -->
  <v-card outlined shaped>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar @click.stop="" tile size="32" class="d-flex flex-column" style="cursor:pointer;">
          <v-icon>mdi-car-info</v-icon>
          <p class="ma-0 overline">
            Edit
          </p>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="body-1">
            <span class="font-weight-bold">{{ $route.params.vehicle }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              2012 Jeep Compass
            </p>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              Black
            </p>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>Vehicle #</v-list-item-action-text>
          <v-chip pill outlined x-small>
            {{ $route.params.vehicle }}
          </v-chip>
          <v-chip pill outlined x-small>
            1122334
          </v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-card-title>

    <v-divider />

    <v-card-text>
      <v-row no-gutters>
        <v-col cols="6" sm="6">
          <v-list class="text-left">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-car-key</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ $route.params.vehicle }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Vehicle Number
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-car-key</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  1122334
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Client Vehicle Number
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bus-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  Sport Utility - Medium
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Vehicle Classification
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="6" sm="6">
          <v-list class="text-left">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-label</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  98765010203B00IL
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  VIN
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-card-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  BS-1234
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Billing Sort
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  Executive - 001
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Center
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn text small>
        <v-icon small class="mr-1">
          mdi-pencil
        </v-icon>
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
  <!-- </v-col> -->
</template>

<script>
export default {
  data: () => ({
    showMore: false
  })
}
</script>

<style>

</style>
