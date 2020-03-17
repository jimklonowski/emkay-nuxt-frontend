<template>
  <v-container>
    <v-row dense no-gutters>
      <v-col cols="12">
        <v-stepper v-model="step" vertical class="pb-0">
          <!-- Step 1: Pick Report Type -->
          <v-stepper-step :complete="step > 1" step="1" class="font-roboto">
            {{ step1Header }}
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-list color="transparent" class="font-roboto-condensed" shaped>
              <v-list-item-group v-model="report_type">
                <v-list-item v-for="(report, r) in report_types" @click="step = 2" :key="`${report.type}-${r}`" :value="report.type" active-class="primary--text text--accent-4">
                  <v-list-item-avatar>
                    <v-icon v-text="report.icon" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t(report.type) }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-stepper-content>

          <!-- Step 2: Pick Columns -->
          <v-stepper-step :complete="step > 2" step="2" class="font-roboto">
            {{ step2Header }}
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-list color="transparent" class="font-roboto-condensed" dense shaped subheader>
              <v-list-item-group v-model="columns" class="row no-gutters" multiple>
                <v-col v-for="(column_group, g) in column_groups" :key="`group-${column_group}-${g}`" cols="12" sm="6" md="4">
                  <v-toolbar
                    color="primary"
                    class="mx-1 font-lato my-2"
                    flat
                    dark
                    dense
                  >
                    <v-toolbar-title>{{ $t(column_group.group) }}</v-toolbar-title>
                  </v-toolbar>
                  <template v-for="(column, c) in column_group.columns">
                    <v-list-item :key="`col-${column}-${c}`" :value="column" active-class="primary--text text--accent-4" class="mx-1">
                      <template #default="{ active }">
                        <v-list-item-content>{{ $t(column) }}</v-list-item-content>
                        <v-list-item-action>
                          <v-checkbox :input-value="active" :true-value="column" />
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-col>
              </v-list-item-group>
            </v-list>
          </v-stepper-content>

          <!-- Step 3: Pick Scope -->
          <v-stepper-step :complete="step > 3" step="3" class="font-roboto">
            {{ step3Header }}
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-subheader v-text="$t('filters')" />
            <v-row>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="start_dialog"
                  :close-on-content-click="false"
                  :return-value.sync="start"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      :value="$moment(start).format('L')"
                      :label="$t('start_date')"
                      v-on="on"
                      prepend-inner-icon="mdi-calendar"
                      outlined
                      dense
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="start"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn v-text="$t('cancel')" @click="start_dialog = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.start_dialog.save(start)" text />
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="end_dialog"
                  :close-on-content-click="false"
                  :return-value.sync="end"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      :value="$moment(end).format('L')"
                      :label="$t('end_date')"
                      v-on="on"
                      prepend-inner-icon="mdi-calendar"
                      outlined
                      dense
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="end"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn v-text="$t('cancel')" @click="end_dialog = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.end_dialog.save(end)" text />
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-subheader v-text="$t('centers')" />
            <v-row>
              <center-picker v-model="centers" :return-value.sync="centers" :return-object="false" />
            </v-row>
          </v-stepper-content>

          <!-- Step 4: The Report -->
          <v-stepper-step :complete="step === 4" step="4" class="font-roboto" complete-icon="mdi-finance">
            {{ step4Header }}
          </v-stepper-step>
          <v-stepper-content step="4" class="ma-0 pa-0">
            <v-card flat>
              <v-divider />
              <v-toolbar color="transparent" flat>
                <v-toolbar-title>{{ report_title }}</v-toolbar-title>
                <v-spacer />
                <v-text-field
                  v-model="search"
                  :label="$t('search')"
                  prepend-inner-icon="mdi-magnify"
                  background-color="transparent"
                  class="mr-1"
                  clearable
                  dense
                  flat
                  hide-details
                  outlined
                  rounded
                  single-line
                  solo
                />
                <v-divider class="mx-4" vertical inset />
                <!-- Save Dialog -->
                <v-dialog v-model="save_dialog" max-width="650" scrollable>
                  <template #activator="{ on }">
                    <v-btn v-on="on" :title="$t('save_configuration')" large icon>
                      <v-icon v-text="'mdi-content-save'" />
                    </v-btn>
                  </template>
                  <ValidationObserver ref="saveReportForm" @submit.prevent v-slot="{ handleSubmit }" tag="form">
                    <v-card :loading="save_loading">
                      <v-card-title>{{ $t('save_report') }}</v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <ValidationProvider v-slot="{ errors }" :name="$t('report_title')" rules="required|max:40">
                                <v-text-field
                                  v-model="report_title"
                                  :counter="40"
                                  :error-messages="errors"
                                  :label="$t('report_title')"
                                  prepend-icon="mdi-content-save-edit"
                                  clearable
                                  dense
                                  outlined
                                  autocomplete="off"
                                />
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12">
                              <v-checkbox v-model="auto_send" :label="$t('auto_send')" />
                            </v-col>
                            <v-col v-show="auto_send" cols="12">
                              <v-radio-group
                                v-model="report_schedule"
                                :label="$t('schedule')"
                                background-color="transparent"
                                color="primary"
                                dense
                                mandatory
                                rounded
                                row
                              >
                                <v-radio :label="$t('daily')" value="daily" />
                                <v-radio :label="$t('weekly')" value="weekly" />
                                <v-radio :label="$t('monthly')" value="monthly" />
                              </v-radio-group>
                            </v-col>
                            <v-col v-show="auto_send" cols="12">
                              <v-combobox
                                v-model="email_recipients"
                                :items="suggested_emails"
                                :label="$t('email_recipients')"
                                :search-input.sync="email_input"
                                @blur="email_input = ''"
                                prepend-inner-icon="mdi-email-plus"
                                clearable
                                dense
                                multiple
                                outlined
                                small-chips
                              >
                                <template #prepend-item>
                                  <v-subheader v-text="$t('select_recipients_or_add')" />
                                  <v-divider />
                                </template>
                                <template #no-data>
                                  <v-list-item>
                                    <v-list-item-action class="align-center">
                                      <v-list-item-action-text>
                                        {{ $t('press') }}
                                      </v-list-item-action-text>
                                      <kbd>{{ $t('enter') }}</kbd>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                      <span>
                                        <v-chip class="mx-2 font-weight-medium">
                                          {{ email_input }}
                                        </v-chip>
                                      </span>
                                    </v-list-item-content>
                                  </v-list-item>
                                </template>
                                <template #selection="{ attrs, item, select, selected }">
                                  <v-chip
                                    v-bind="attrs"
                                    :input-value="selected"
                                    @click="select"
                                    @click:close="removeEmail(item)"
                                    close
                                  >
                                    <strong>{{ item }}</strong>
                                  </v-chip>
                                </template>
                              </v-combobox>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          @click="handleSubmit(saveReport)"
                          v-text="$t('submit')"
                          :loading="save_loading"
                          type="submit"
                          color="primary"
                          block
                          small
                          depressed
                        />
                      </v-card-actions>
                    </v-card>
                  </ValidationObserver>
                </v-dialog>
                <!-- Download as XLS button -->
                <client-only>
                  <download-excel :fields="downloadFields" :data="report_data" :name="exportName">
                    <v-btn :title="`${$t('download')} .xls`" color="primary" large icon>
                      <v-icon v-text="'mdi-cloud-download'" />
                    </v-btn>
                  </download-excel>
                </client-only>
              </v-toolbar>
              <v-divider />
              <!-- Datatable -->
              <v-skeleton-loader :loading="report_loading" type="table">
                <v-data-table
                  :items="report_data"
                  :headers="report_headers"
                  :items-per-page="25"
                  :loading="report_loading"
                  :mobile-breakpoint="0"
                  :search="search"
                  outlined
                  class="striped"
                />
              </v-skeleton-loader>
            </v-card>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-spacer />
      <v-btn v-show="step > 1" @click="step--" text>
        {{ $t('previous_step') }}
      </v-btn>
      <v-btn :disabled="step === 4" @click="step++" color="primary">
        {{ $t('next_step') }}
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import CenterPicker from '@/components/core/CenterPicker'
import { sleep } from '@/utility/helpers'
export default {
  name: 'MyReports',
  components: { CenterPicker },
  mixins: [downloadFields],
  data: vm => ({
    step: 1,
    search: '',
    save_dialog: false,
    start_dialog: false,
    end_dialog: false,
    email_input: '',
    save_loading: false,

    // report model
    auto_send: false,
    centers: [],
    columns: [],
    email_recipients: [],
    report_schedule: 'monthly',
    report_title: '',
    report_type: null,
    start: vm.$moment().subtract(1, 'years').format('YYYY-MM-DD'),
    end: vm.$moment().format('YYYY-MM-DD')
  }),
  computed: {
    ...mapGetters({
      report_types: 'my-reports/getReportTypes',
      column_groups: 'my-reports/getColumnGroups',
      report_data: 'my-reports/getReportData',
      report_loading: 'my-reports/getReportLoading',
      saved_reports: 'my-reports/getSavedReports',
      suggested_emails: 'my-reports/getSuggestedEmails'
    }),
    config () {
      return {
        auto_send: this.auto_send,
        centers: this.centers,
        columns: this.columns,
        email_recipients: this.email_recipients,
        report_schedule: this.report_schedule,
        report_title: this.report_title,
        report_type: this.report_type,
        start: this.start,
        end: this.end
      }
    },
    exportName () {
      const extension = '.xls'
      const acct = this.$auth.user.account
      const title = this.report_title
      const date = this.$moment().format()
      const filename = [acct, title, date].filter(Boolean).join('-').concat(extension).replace(/\s/g, '')
      return filename
    },
    report_headers () {
      return this.columns.map((column, index) => {
        return {
          text: this.$i18n.t(column),
          value: column,
          class: 'report-column',
          divider: index < this.columns.length - 1
        }
      })
    },
    step1Header: vm => (vm.step <= 1) ? vm.$i18n.t('report_type') : `${vm.$i18n.t('report_type')}: ${vm.$i18n.t(vm.report_type)}`,
    step2Header: vm => (vm.step <= 2) ? vm.$i18n.t('report_columns') : `${vm.$i18n.tc('columns_selected', vm.columns.length)}`,
    step3Header: vm => (vm.step <= 3) ? vm.$i18n.t('report_scope') : `${vm.$i18n.t('report_scope')}: ${vm.$moment(vm.start).format('L')} - ${vm.$moment(vm.end).format('L')}`,
    // step4Header: vm => vm.$i18n.t('scheduling'),
    step4Header: vm => vm.$i18n.t('my_report')
  },
  watch: {
    async report_type () {
      console.log(`Report Type: ${this.report_type}`)
      await this.fetchColumnGroups(this.report_type)
    },
    async step () {
      if (this.step === 4) {
        try {
          await this.fetchReportData(this.config)
        } catch (error) {
          debugger
        }
      }
    },
    centers () {
      console.log(`Centers Changed: ${this.centers}`)
    },
    columns () {
      console.log(`Columns Changed: ${this.columns}`)
    }
  },
  async mounted () {
    await this.initialize()
  },
  methods: {
    ...mapActions({
      initialize: 'my-reports/init',
      fetchColumnGroups: 'my-reports/fetchColumnGroups',
      fetchReportData: 'my-reports/fetchReportData'
      // fetchSavedReports: 'my-reports/fetchSavedReports'
    }),
    nextStep () {
      if (this.step < 5) {
        this.step++
      } else {
        this.step = 1
      }
    },
    prevStep () {
      if (this.step > 1) {
        this.step--
      } else {
        this.step = 5
      }
    },
    removeEmail (item) {
      this.email_recipients.splice(this.email_recipients.indexOf(item), 1)
      this.email_recipients = [...this.email_recipients]
    },
    async saveReport () {
      try {
        this.save_loading = true
        await sleep(3000)
        console.log('save!')
      } catch (error) {
        console.log(error)
      } finally {
        this.save_loading = false
      }
    }
  }
}
</script>
