<template>
  <v-card>
    <v-card-title>{{ $t('authorization_profile_detail') }}</v-card-title>
    <v-card-subtitle>{{ id }}</v-card-subtitle>
    <v-divider />
    <v-card-text class="flex-column">
      <v-list dense>
        <v-list-item class="d-inline-block">
          <v-list-item-title>{{ $t('authorization_profile') }}</v-list-item-title>
          <v-list-item-subtitle>DLY:#3/$300 MTH:$1000</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="d-inline-block">
          <v-list-item-title>{{ $t('id') }}</v-list-item-title>
          <v-list-item-subtitle>{{ id }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="d-inline-block">
          <v-list-item-title>{{ $t('card_type') }}</v-list-item-title>
          <v-list-item-subtitle>VEH1:1</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="d-inline-block">
          <v-list-item-title>{{ $t('restrictions') }}</v-list-item-title>
          <v-list-item-subtitle>ID & ODOMETER, UNRESTRICTED</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="d-inline-block">
          <v-list-item-title>{{ $t('prompt_type') }}</v-list-item-title>
          <v-list-item-subtitle>LAST 4 OF VEHICLE</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-expansion-panels hover multiple tile accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t('centers') }}</v-expansion-panel-header>
          <v-expansion-panel-content>ALL</v-expansion-panel-content>
        </v-expansion-panel>
        <v-divider />
        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t('vehicle_types') }}</v-expansion-panel-header>
          <v-expansion-panel-content>ALL</v-expansion-panel-content>
        </v-expansion-panel>
        <v-divider />
        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t('sorts') }}</v-expansion-panel-header>
          <v-expansion-panel-content>ALL</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-divider />
      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th>Products</th>
              <th>$/Transaction</th>
              <th>Daily $</th>
              <th>Daily Transactions</th>
              <th>$Monthly $</th>
              <th>Monthly Transactions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Fuel</th>
              <td>No Limit</td>
              <td>$300</td>
              <td>3</td>
              <td>$1000</td>
              <td>No Limit</td>
            </tr>
            <tr>
              <th>Car Wash</th>
              <td>No Limit</td>
              <td>No Limit</td>
              <td>3</td>
              <td>$1000</td>
              <td>No Limit</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-divider />
      <span>TODO</span>
    </v-card-text>
    <v-card-actions />
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>
