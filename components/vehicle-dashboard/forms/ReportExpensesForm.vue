<template>
  <v-card :loading="loading" outlined>
    <v-card-title>{{ $t('report_expenses') }}</v-card-title>
    <v-card-subtitle>{{ vehicleNumber }}</v-card-subtitle>
    <v-divider />
    <v-card-text class="py-0">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-dialog v-model="dialog" max-width="1000">
              <template #activator="{ on }">
                <v-btn v-on="on" color="primary" rounded depressed>
                  {{ $t('add_expense') }}
                </v-btn>
              </template>
              <ValidationObserver ref="expenseRowForm" @submit.prevent v-slot="{ handleSubmit }">
                <v-card>
                  <v-card-title>
                    {{ $t('add_expense') }}
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    <v-container class="pb-0">
                      <v-row dense>
                        <v-col cols="12" sm="6" lg="3">
                          <ValidationProvider v-slot="{ errors }" :name="$t('category')" rules="required">
                            <v-select
                              v-model="item.category"
                              :error-messages="errors"
                              :items="categories"
                              :label="$t('category')"
                              dense
                              outlined
                              rounded
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" lg="3">
                          <v-text-field
                            v-model="item.description"
                            :label="$t('description')"
                            dense
                            outlined
                            rounded
                          />
                        </v-col>
                        <v-col cols="12" sm="6" lg="3">
                          <v-text-field
                            v-model="item.quantity"
                            :label="$t('quantity')"
                            dense
                            outlined
                            rounded
                          />
                        </v-col>
                        <v-col cols="12" sm="6" lg="3">
                          <v-text-field
                            v-model="item.amount"
                            :label="$t('amount')"
                            prefix="$"
                            dense
                            outlined
                            rounded
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-divider />
                  <v-card-actions>
                    <v-spacer />
                    <v-btn @click="handleSubmit(addExpense)" color="primary" depressed>
                      {{ $t('add_expense') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </ValidationObserver>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <ValidationObserver ref="reportExpensesForm" @submit.prevent v-slot="{ handleSubmit, invalid }" tag="form">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-simple-table class="striped">
                <template #default>
                  <thead>
                    <tr>
                      <th>{{ $t('category') }}</th>
                      <th>{{ $t('description') }}</th>
                      <th>{{ $t('quantity') }}</th>
                      <th>{{ $t('amount') }}</th>
                      <th>{{ $t('action') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="expenses.length === 0">
                      <tr>
                        <td colspan="5" class="text--disabled">
                          No expenses added
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr v-for="(expense, e) in expenses" :key="`row-${e}`">
                        <td>{{ $t(expense.category) }}</td>
                        <td>{{ expense.description || '--' }}</td>
                        <td>{{ expense.quantity || '--' }}</td>
                        <td>{{ expense.amount | currency }}</td>
                        <td>
                          <v-btn @click="removeExpense(e)" icon>
                            <v-icon v-text="'mdi-close'" color="error" />
                          </v-btn>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-subheader>Enter Mileage and Expenses</v-subheader>
          <v-row dense>
            <v-col cols="6" lg="4">
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
                      dense
                      outlined
                      readonly
                      rounded
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
            <v-col cols="6" lg="4">
              <ValidationProvider v-slot="{ errors }" :name="$t('odometer_reading')" rules="required">
                <v-text-field
                  v-model="odometer_reading"
                  :label="$t('odometer_reading')"
                  :error-messages="errors"
                  type="number"
                  dense
                  outlined
                  rounded
                />
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="handleSubmit(submitExpenses)"
          :disabled="expenses.length === 0 || invalid"
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
    removeExpense (index) {
      this.expenses.splice(index, 1)
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
