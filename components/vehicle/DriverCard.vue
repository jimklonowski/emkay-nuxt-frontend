<template>
  <v-card outlined shaped>
    <v-card-title class="pa-0">
      <v-list-item>
        <v-list-item-avatar @click.stop="editDriver" tile size="32" class="d-flex flex-column" style="cursor:pointer;">
          <v-icon>mdi-account-edit</v-icon>
          <p class="ma-0 overline">
            {{ $t('common.edit') }}
          </p>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="body-1">
            <span class="font-weight-bold">{{ driver.first_name }}</span>
            <span class="font-weight-light">{{ driver.last_name }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              {{ driver.license_number }}
            </p>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="caption">
            <p class="mb-0">
              {{ driver.license_state_province }}
            </p>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>{{ $t('driver.driver_#') }}</v-list-item-action-text>
          <v-chip :title="$t('driver.driver_number')" pill outlined x-small>
            {{ driver.driver_number }}
          </v-chip>
          <!-- <v-chip pill outlined x-small>
            {{ 'asdf' }}
          </v-chip> -->
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
                  {{ driver.address_1 }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ driver.address_2 }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="caption">
                  {{ cityStateZip }}
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
                  {{ driver.employee_id }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('driver.employee_id') }}
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
                  {{ driver.selector_level }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('driver.selector_level') }}
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
                  {{ driver.phone }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('address.phone') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="dialTo(123)">
              <v-list-item-icon>
                <v-icon>mdi-cellphone-basic</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ driver.cell }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('address.cell') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="emailTo('a@b.com')">
              <v-list-item-icon>
                <v-icon>mdi-email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                  {{ driver.email }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{ $t('address.email') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <!-- <v-spacer />
      <v-btn text small>
        <v-icon small class="mr-1">
          mdi-pencil
        </v-icon>
        Edit
      </v-btn> -->
    </v-card-actions>
  </v-card>
  <!-- </v-col> -->
</template>

<script>
import { dialTo, emailTo } from '@/utility/helpers'
export default {
  props: {
    driver: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({

  }),
  computed: {
    cityStateZip () {
      return `${this.driver.city}, ${this.driver.state_province} ${this.driver.postal_code}`
    }
  },
  methods: {
    dialTo,
    emailTo,
    editDriver () {
      this.$router.push({ path: `${this.$route.fullPath}/edit-driver` })
    }
  }
}
</script>

<style>

</style>
