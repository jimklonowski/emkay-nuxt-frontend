<template>
  <v-card outlined shaped>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar @click.stop="" tile size="32" class="d-flex flex-column" style="cursor:pointer;">
          <v-icon>mdi-account-edit</v-icon>
          <p class="ma-0 overline">
            Edit
          </p>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="body-1">
            <span class="font-weight-bold">First Name</span>
            <span class="font-weight-light">Last Name</span>
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              IL 123456IL1234567883242
            </p>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>Driver #</v-list-item-action-text>
          <v-chip pill outlined small>
            {{ $route.params.vehicle }}
          </v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-card-title>

    <v-divider />

    <v-card-text>
      <v-row no-gutters>
        <v-col cols="6" sm="6">
          <v-list class="text-left">
            <!-- address -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  EMKAY, Inc.
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  805 W THORNDALE AVE
                </v-list-item-subtitle>
                <v-list-item-subtitle class="caption">
                  ITASCA, IL 60143
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- employee id -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-card-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  1234567890
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Employee ID
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- selector level -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-badge</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  Executive
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Selector Level
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="6" sm="6">
          <v-list class="text-left">
            <v-list-item @click.stop="dialTo(123)">
              <v-list-item-icon>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  Phone
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Phone
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="dialTo(123)">
              <v-list-item-icon>
                <v-icon>mdi-cellphone-basic</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  Cell Phone
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Cell
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="emailTo('a@b.com')">
              <v-list-item-icon>
                <v-icon>mdi-email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  Email
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Phone
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
import { dialTo, emailTo } from '@/utility/helpers'
export default {
  data: () => ({
    showMore: false

  }),
  methods: {
    dialTo,
    emailTo
  }
}
</script>

<style>

</style>
