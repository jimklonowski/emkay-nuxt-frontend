<template>
  <!-- <v-col :cols="12" :md="showMore ? 12 : 6" :lg="showMore ? 6 : 4"> -->
  <v-card
    outlined
    shaped
  >
    <v-card-subtitle @click="$router.push(localePath({ path: `/vehicle/${$route.params.vehicle}/invoice` }))">
      Invoice History
    </v-card-subtitle>
    <v-card-text class="font-italic font-weight-light">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>asdf</v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>title</v-list-item-title>
            <v-list-item-subtitle>subtitle</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
  name: 'InvoiceCard',
  data: () => ({
    showMore: false,
    headers: [],
    items: []
  })
}
</script>

<style>

</style>
