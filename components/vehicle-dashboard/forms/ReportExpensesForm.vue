<template>
  <v-card :loading="loading" outlined>
    <v-card-title>{{ $t('report_expenses') }}</v-card-title>
    <v-card-subtitle>{{ vehicleNumber }}</v-card-subtitle>
    <v-divider />
    <v-card-text class="py-0">
      <v-container>
        <v-row>
          <v-col cols="12" lg="6">
            <ValidationObserver ref="expenseRowForm" @submit.prevent v-slot="{ handleSubmit: handleSubmitExpense }">
              <v-card flat>
                <v-card-title>Add expenses as needed and then submit.</v-card-title>
                <v-card-text class="pa-0">
                  <v-container>
                    <v-row dense>
                      <v-col cols="12">
                        <ValidationProvider v-slot="{ errors }" :name="$t('category')" rules="required">
                          <v-select
                            v-model="item.category"
                            :error-messages="errors"
                            :items="categories"
                            :label="$t('category')"
                            outlined
                            dense
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="item.description"
                          :label="$t('description')"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="item.quantity"
                          :label="$t('quantity')"
                          type="number"
                          autocomplete="off"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col cols="6">
                        <ValidationProvider v-slot="{ errors }" :name="$t('amount')" rules="required">
                          <v-text-field
                            v-model="item.amount"
                            :error-messages="errors"
                            :label="$t('amount')"
                            type="number"
                            prefix="$ "
                            autocomplete="off"
                            outlined
                            dense
                          />
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="handleSubmitExpense(addExpense)" color="primary" block outlined>
                    {{ $t('add_expense') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </ValidationObserver>
          </v-col>
          <v-col cols="12" lg="6">
            <slot name="details" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider class="py-4" />
    <ValidationObserver ref="reportExpensesForm" @submit.prevent v-slot="{ handleSubmit, invalid }" tag="form">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :hide-default-footer="true"
                :items="expenses"
                :items-per-page="10"
                :mobile-breakpoint="0"
              >
                <template #no-data>
                  <div class="text-left">
                    {{ $t('no_expenses_added') }}
                  </div>
                </template>
                <template #item.category="{ item }">
                  {{ $t(item.category) }}
                </template>
                <template #item.description="{ item }">
                  {{ item.description || '--' }}
                </template>
                <template #item.quantity="{ item }">
                  {{ item.quantity || '--' }}
                </template>
                <template #item.amount="{ item }">
                  {{ item.amount | currency }}
                </template>
                <template #item.action="{ item }">
                  <v-btn @click="removeExpense(item)" icon>
                    <v-icon v-text="'mdi-close'" color="error" />
                  </v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-divider v-show="hasExpenses" class="py-4" />
          <v-row v-show="hasExpenses">
            <v-col cols="6">
              <v-dialog
                ref="expense_date_dialog"
                v-model="expense_date_dialog"
                :return-value.sync="expense_date"
                @keydown.esc="expense_date_dialog = false"
                persistent
                width="290px"
              >
                <template #activator="{ on }">
                  <ValidationProvider v-slot="{ errors }" :name="$t('expense_date')" rules="required">
                    <v-text-field
                      :value="$moment(expense_date).format('L')"
                      :label="$t('expense_date')"
                      :error-messages="errors"
                      v-on="on"
                      prepend-inner-icon="mdi-calendar"
                      outlined
                      readonly
                      dense
                    />
                  </ValidationProvider>
                </template>
                <v-date-picker
                  v-model="expense_date"
                  :locale="$moment.locale()"
                  color="primary"
                  header-color="primary"
                  scrollable
                >
                  <v-spacer />
                  <v-btn v-text="$t('cancel')" @click="expense_date_dialog = false" text />
                  <v-btn v-text="$t('ok')" @click="$refs.expense_date_dialog.save(expense_date)" text />
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="6">
              <ValidationProvider v-slot="{ errors }" :name="$t('odometer_reading')" rules="required">
                <v-text-field
                  v-model="odometer_reading"
                  :label="$t('odometer_reading')"
                  :error-messages="errors"
                  autocomplete="off"
                  type="number"
                  outlined
                  dense
                />
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="handleSubmit(submitExpenses)"
          :disabled="!hasExpenses || invalid"
          :loading="loading"
          type="submit"
          color="primary"
          block
          depressed
        >
          {{ $t('submit') }}
        </v-btn>
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { SnotifyPosition } from 'vue-snotify'
import { sleep } from '@/utility/helpers'
export default {
  props: {
    vehicleNumber: {
      type: String,
      required: true
    }
  },
  data: vm => ({
    expense_date_dialog: false,
    dialog: false,
    loading: false,
    // item model
    item: {
      ...vm.defaultItem
    },
    // model
    expense_date: vm.$moment().format('YYYY-MM-DD'),
    odometer_reading: null,
    expenses: []
  }),
  computed: {
    defaultItem () {
      return {
        category: '',
        description: '',
        quantity: '',
        amount: ''
      }
    },
    categories () {
      return [
        { text: this.$i18n.t('accident_and_subrogation'), value: 'accident_and_subrogation' },
        { text: this.$i18n.t('depreciation'), value: 'depreciation' },
        { text: this.$i18n.t('gas_expense'), value: 'gas_expense' },
        { text: this.$i18n.t('insurance_deduction'), value: 'insurance_deduction' },
        { text: this.$i18n.t('insurance_liability'), value: 'insurance_liability' },
        { text: this.$i18n.t('insurance_physical'), value: 'insurance_physical' },
        { text: this.$i18n.t('license_and_title'), value: 'license_and_title' },
        { text: this.$i18n.t('license_tax'), value: 'license_tax' },
        { text: this.$i18n.t('maintenance_expense'), value: 'maintenance_expense' },
        { text: this.$i18n.t('oil_change_expense'), value: 'oil_change_expense' },
        { text: this.$i18n.t('parking_toll_storage'), value: 'parking_toll_storage' },
        { text: this.$i18n.t('personal_credit'), value: 'personal_credit' },
        { text: this.$i18n.t('tax_expense'), value: 'tax_expense' },
        { text: this.$i18n.t('tire_expense'), value: 'tire_expense' },
        { text: this.$i18n.t('violation_fedex_misc'), value: 'violation_fedex_misc' }
      ]
    },
    hasExpenses: vm => vm.expenses.length > 0,
    headers () {
      return [
        {
          text: this.$i18n.t('category'),
          value: 'category',
          class: 'report-column',
          width: '25%'
        },
        {
          text: this.$i18n.t('description'),
          value: 'description',
          class: 'report-column',
          width: '25%'
        },
        {
          text: this.$i18n.t('quantity'),
          value: 'quantity',
          class: 'report-column',
          width: '16%'
        },
        {
          text: this.$i18n.t('amount'),
          value: 'amount',
          class: 'report-column',
          width: '25%'
        },
        {
          text: this.$i18n.t('action'),
          value: 'action',
          class: 'report-column',
          width: '9%'
        }
      ]
    }
  },
  watch: {
    expenses () {
      console.log(`Expenses:`)
      console.dir(this.expenses)
    }
  },
  methods: {
    addExpense () {
      // const newItem = { ...expense }
      this.expenses.push({ ...this.item })
      this.item = { ...this.defaultItem }
      this.$refs.expenseRowForm.reset()
      this.dialog = false
    },
    removeExpense (item) {
      this.expenses.splice(this.expenses.indexOf(item), 1)
    },
    async submitExpenses () {
      try {
        this.loading = true
        await sleep(3000)
        const model = {
          vehicle: this.vehicleNumber,
          expense_date: this.expense_date,
          odometer_reading: this.odometer_reading,
          expenses: this.expenses
        }
        console.dir(model)
        await this.$axios.post('/vehicle/report-expenses', model)
      } catch (error) {
        this.$snotify.error('saving error', this.$i18n.t('error'), { position: SnotifyPosition.centerBottom })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
