<template>
  <!-- <v-col :cols="12" :md="showMore ? 12 : 6" :lg="showMore ? 6 : 4"> -->
  <!-- <v-col cols="auto"> -->
  <v-card outlined shaped>
    <v-card-subtitle @click="$router.push(localePath({ path: `/vehicle/${$route.params.vehicle}/fuel` }))">
      Monthly Fuel Spending
    </v-card-subtitle>
    <v-card-title v-text="'$231.47'" class="display-2" />
    <v-card-text class="font-italic font-weight-light">
      This has
      <v-chip class="caption mx-2 px-2" x-small label color="success">
        decreased
      </v-chip>
      by 23% since last month.
    </v-card-text>
    <v-expand-transition>
      <v-data-table v-show="showMore" :headers="headers" :items="items" />
    </v-expand-transition>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="showMore = !showMore" icon>
        <v-icon>{{ showMore ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  <!-- </v-col> -->
</template>

<script>
export default {
  name: 'FuelCard',
  props: {
    showMore: {
      type: Boolean
    }
  },
  data: () => ({
    headers: [
      {
        text: 'Date',
        align: 'left',
        sortable: false,
        value: 'date'
      },
      { text: 'Location', value: 'location' },
      { text: 'Fuel Type', value: 'type' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Amount', value: 'amount' }
    ],
    items: [
      { date: '2019-01-01', location: 'BP Plainfield', type: 'Premium', quantity: '12', amount: '$23.51' },
      { date: '2019-01-02', location: 'BP Plainfield', type: 'Premium', quantity: '9', amount: '$16.12' },
      { date: '2019-01-03', location: 'BP Plainfield', type: 'Regular', quantity: '16', amount: '$30.50' },
      { date: '2019-01-04', location: 'BP Plainfield', type: 'Premium', quantity: '20', amount: '$43.51' },
      { date: '2019-01-05', location: 'BP Plainfield', type: 'Diesel', quantity: '22', amount: '$45.69' }
    ],
    loading: false
  })
}
</script>

<style></style>
