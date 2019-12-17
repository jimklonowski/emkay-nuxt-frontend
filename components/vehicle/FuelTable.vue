<template>
  <v-card outlined shaped>
    <v-card-title>
      <v-list-item-content two-line>
        <p class="overline text--disabled">
          {{ $tc('past_days', days) }}
        </p>
        <v-list-item-title>
          {{ $t('fuel') }}
        </v-list-item-title>
        <v-list-item-subtitle class="caption">
          <nuxt-link :to="{ path: `${this.$route.fullPath}/fuel` }" class="text-decoration-none">
            {{ $t('more') }}
          </nuxt-link>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('search')"
        clearable
        dense
        flat
        hide-details
        outlined
        prepend-inner-icon="mdi-magnify"
        rounded
        solo
        single-line
      />
    </v-card-title>
    <v-card-text>
      <v-skeleton-loader :loading="!initialized" type="table">
        <v-data-table
          :headers="headers"
          :items="rows"
          :search="search"
          :items-per-page="5"
          :sort-by="['bill_date']"
          :sort-desc="true"
        >
          <template #body="{ items }">
            <tbody>
              <tr v-for="(item, key) in items" :key="key">
                <td>{{ item.bill_date | date }}</td>
                <td>{{ item.card_number }}</td>
                <td>{{ item.fuel_company_name }}</td>
                <td>
                  <v-chip :outlined="$vuetify.theme.dark" v-text="item.product_type" small />
                </td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.unit_price | currency(3,3) }}</td>
                <td>{{ item.amount | currency }}</td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      days: 30,
      initialized: false,
      search: ''
    }
  },
  computed: {
    error: vm => vm.$store.getters['vehicle/getFuelError'],
    loading: vm => vm.$store.getters['vehicle/getFuelLoading'],
    rows: vm => vm.$store.getters['vehicle/getFuelHistory'],
    vehicleNumber: vm => vm.$store.getters['vehicle/getVehicleNumber'],
    columns () {
      return [
        'bill_date',
        'card_number',
        'fuel_company_name',
        'product_type',
        'quantity',
        'unit_price',
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
  async mounted () {
    const vehicle_number = this.vehicleNumber || ''
    const end_date = this.$moment().format('YYYY-MM-DD')
    const start_date = this.$moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    const filters = {
      command: 'FUEL',
      subcommand: 'JSONDETAIL',
      customer: 'EM102',
      vehicle_number,
      start_date,
      end_date
    }
    await this.$store.dispatch('vehicle/fetchFuelHistory', filters)
    this.initialized = true
  }
}
</script>
