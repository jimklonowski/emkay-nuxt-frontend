<template>
  <!-- <v-col :cols="12" :md="showMore ? 12 : 6" :lg="showMore ? 6 : 4"> -->
  <v-card outlined shaped>
    <v-card-subtitle>Monthly Violations</v-card-subtitle>
    <v-card-title v-text="'1'" class="error--text display-2" />
    <v-card-text class="font-italic font-weight-light">
      Received <u>1</u> violation this month, costing <strong>$95.00</strong>
    </v-card-text>
    <v-expand-transition>
      <v-card :loading="loading" v-show="showMore" flat>
        <v-data-table :headers="headers" :items="items" style="min-width:650px;" />
      </v-card>
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
  name: 'ViolationCard',
  data: () => ({
    headers: [
      {
        text: 'Date',
        align: 'left',
        sortable: false,
        value: 'date'
      },
      { text: 'Service Location', value: 'location' },
      { text: 'Maintenance Details', value: 'details' },
      { text: 'In Network?', value: 'network' },
      { text: 'Amount', value: 'amount' }
    ],
    items: [
      { date: '2019-01-01', location: 'Klonowski AUTO', details: 'Tires', network: 'false', amount: '$43.51' }
    ],
    loading: false,
    showMore: false
  })
  // async created () {
  //   try {
  //     const data = await this.$axios.get('/maintenance')
  //     this.items = data
  //   } catch (err) {
  //     debugger
  //     console.log(err)
  //   }
  // }
}
</script>

<style>

</style>
