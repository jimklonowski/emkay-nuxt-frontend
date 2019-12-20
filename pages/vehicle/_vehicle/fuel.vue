<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="display-2 font-weight-thin">
        Fuel Dashboard
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-btn @click="$router.go(-1)" text>
          Back
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined shaped>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="rows"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Fuel',
  data (context) {
    return {
      end_menu: false,
      start_menu: false,
      search: ''
    }
  },
  computed: {
    dataLoading: vm => vm.$store.getters['vehicle/getFuelLoading'],
    rows: vm => vm.$store.getters['vehicle/getFuelHistory'],
    columns () {
      return [
        'bill_date',
        'amount'
      ]
    },
    headers () {
      return this.columns.map((column, index) => {
        return {
          text: this.$i18n.t(column),
          value: column,
          class: 'report-column'
        }
      })
    }
  },
  async asyncData ({ $moment, query, store, error }) {
    const report_length = 90
    const start_date = query.start_date || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end_date = query.end_date || $moment().format('YYYY-MM-DD')

    const filters = {
      command: 'FUEL',
      subcommand: 'JSONDETAIL',
      customer: 'EM102',
      start_date,
      end_date
    }
    await store.dispatch('vehicle/fetchFuelHistory', filters)

    return { start_date, end_date, report_length }
  }
}
</script>
