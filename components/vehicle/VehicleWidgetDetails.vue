<template>
  <v-dialog
    v-model="showMore"
    hide-overlay
    transition="dialog-transition"
    width="500"
  >
    <template #activator="{ on }">
      <v-btn v-on="on" text>
        {{ $t('details') }}
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title v-text="$t('vehicle_details')" />
        <v-spacer />
        <v-btn @click="showMore = false" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-subheader>Cost Center Information</v-subheader>
        <v-simple-table>
          <template #default>
            <tbody>
              <tr>
                <td class="font-weight-regular">
                  {{ $t('level_01') }}
                </td>
                <td>EMKAY Inc</td>
              </tr>
              <tr>
                <td class="font-weight-regular">
                  {{ $t('level_02') }}
                </td>
                <td>Executive</td>
              </tr>
              <tr>
                <td class="font-weight-regular">
                  {{ $t('level_03') }}
                </td>
                <td />
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-divider />
      <v-list three-line subheader>
        <v-subheader>Customization</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="notifications" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
            <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="sound" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sound</v-list-item-title>
            <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="widgets" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Auto-add widgets</v-list-item-title>
            <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'VehicleWidgetDetails',
  data: () => ({
    showMore: false
  })
}
</script>
