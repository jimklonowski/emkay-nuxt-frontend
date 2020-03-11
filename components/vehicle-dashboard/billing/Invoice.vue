<template>
  <v-skeleton-loader :loading="loading" type="table">
    <v-card rounded>
      <v-card-title>{{ $t('invoice') }}</v-card-title>
      <v-card-subtitle>{{ invoiceNumber }}</v-card-subtitle>
      <v-divider />
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :loading="loading"
          :mobile-breakpoint="0"
          :sort-by="['voucher_date']"
          :sort-desc="[true]"
          class="striped"
          dense
        >
          <template #item.voucher_date="{ item }">
            {{ item.voucher_date | date }}
          </template>

          <template #item.bill_date="{ item }">
            {{ item.bill_date | date('YYYY-MM', 'MM/YYYY') }}
          </template>

          <template #item.amount="{ item }">
            {{ item.amount | currency }}
          </template>
        </v-data-table>
      </v-card-text>
      <!-- <v-card-actions /> -->
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  props: {
    invoiceNumber: {
      type: String,
      default: () => null,
      required: true
    },
    vehicleNumber: {
      type: String,
      default: () => null
    }
  },
  data: () => ({
    items: [],
    loading: false
  }),
  computed: {
    columns () {
      return [
        'voucher',
        'voucher_date',
        'bill_date',
        'description',
        'amount'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('voucher_number'),
          value: 'voucher',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('voucher_date'),
          value: 'voucher_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('bill_date'),
          value: 'bill_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('description'),
          value: 'description',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('amount'),
          value: 'amount',
          class: 'report-column'
        }
      ]
    }
  },
  watch: {
    async invoiceNumber () {
      // When invoiceNumber prop changes, fetch the new invoice then scrollToTop
      await this.fetchInvoice()
    }
  },
  async mounted () {
    // Fetch data before mount
    await this.fetchInvoice()
  },
  methods: {
    async fetchInvoice () {
      try {
        this.loading = true
        const invoice = this.invoiceNumber
        const vehicle = this.vehicleNumber
        const { data: { success, message, data } } = await this.$axios.get('/vehicle/invoice', { params: { vehicle, invoice } })
        if (!success) { throw new Error(message) }
        this.items = data
      } catch (error) {
        this.$snotify.error(error.message, this.$i18n.t('error'))
      } finally {
        this.$vuetify.goTo(0)
        this.loading = false
      }
    }
  }
}
</script>
