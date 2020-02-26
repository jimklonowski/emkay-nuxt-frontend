<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="font-lato font-weight-regular" style="font-size:2.5rem;">
        {{ $t('my_reports') }}
      </v-col>
      <v-col cols="12">
        <v-stepper v-model="step" vertical>
          <!-- Step 1: Pick Report Type -->
          <v-stepper-step :complete="step > 1" step="1" class="font-roboto">
            {{ step1Header }}
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-container>
              <v-subheader v-text="$t('load_a_saved_report')" class="subtitle-2 pl-1" />
              <v-row>
                <v-col cols="12" md="6" lg="4">
                  <v-select
                    v-model="saved_report"
                    :items="saved_reports"
                    :label="$t('pick_a_report')"
                    :menu-props="{ bottom: true, offsetY: true }"
                    outlined
                    dense
                    clearable
                  />
                </v-col>
              </v-row>
              <v-subheader v-text="$t('or')" />
              <v-subheader v-text="$t('create_a_new_report')" class="subtitle-2 pl-1" />
              <v-row>
                <v-col cols="12">
                  <v-list color="transparent" class="font-roboto-condensed" shaped>
                    <v-list-item-group v-model="config.report_type">
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
                </v-col>
              </v-row>
            </v-container>
          </v-stepper-content>

          <!-- Step 2: Choose Columns -->
          <v-stepper-step :complete="step > 2" step="2" class="font-roboto">
            {{ step2Header }}
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-container>
              <v-list class="font-roboto-condensed" color="transparent" dense shaped subheader>
                <v-list-item-group v-model="config.columns_selected" multiple class="row no-gutters">
                  <v-col v-for="(group, g) in available_column_groups" :key="`group-${group}-${g}`" cols="12" sm="6" md="4">
                    <v-toolbar
                      class="mx-1 font-lato my-2"
                      color="primary"
                      flat
                      dark
                      dense
                    >
                      <v-toolbar-title>
                        {{ $t(group.category) }}
                      </v-toolbar-title>
                    </v-toolbar>
                    <template v-for="(column, c) in group.columns">
                      <v-list-item :key="`col-${column}-${c}`" :value="column" active-class="primary--text text--accent-4" class="mx-1">
                        <template #default="{ active }">
                          <v-list-item-content>
                            {{ $t(column) }}
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-checkbox
                              :input-value="active"
                              :true-value="column"
                            />
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </template>
                  </v-col>
                </v-list-item-group>
              </v-list>
            </v-container>
          </v-stepper-content>

          <!-- Step 3: Date Range and Center Selection -->
          <v-stepper-step :complete="step > 3" step="3" class="font-roboto">
            {{ step3Header }}
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-container>
              <v-subheader v-text="$t('filters')" />
              <v-row>
                <v-col cols="12" sm="6">
                  <v-menu
                    ref="start_menu"
                    :close-on-content-click="false"
                    :return-value.sync="config.start"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template #activator="{ on }">
                      <v-text-field
                        :value="$moment(config.start).format('L')"
                        :label="$t('start_date')"
                        v-on="on"
                        prepend-icon="mdi-calendar"
                        outlined
                        dense
                        readonly
                      />
                    </template>
                    <v-date-picker
                      v-model="config.start"
                      no-title
                      scrollable
                    >
                      <v-spacer />
                      <v-btn v-text="$t('cancel')" @click="start_menu = false" text />
                      <v-btn v-text="$t('ok')" @click="$refs.start_menu.save(config.start)" text />
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    ref="end_menu"
                    :close-on-content-click="false"
                    :return-value.sync="config.end"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template #activator="{ on }">
                      <v-text-field
                        :value="$moment(config.end).format('L')"
                        :label="$t('end_date')"
                        v-on="on"
                        prepend-icon="mdi-calendar"
                        outlined
                        dense
                        readonly
                      />
                    </template>
                    <v-date-picker
                      v-model="config.end"
                      no-title
                      scrollable
                    >
                      <v-spacer />
                      <v-btn v-text="$t('cancel')" @click="end_menu = false" text />
                      <v-btn v-text="$t('ok')" @click="$refs.end_menu.save(config.end)" text />
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-subheader v-text="$t('centers')" />
              <v-row>
                <v-treeview
                  v-model="config.centers_selected"
                  :items="center_hierarchy"
                  item-key="center_code"
                  item-text="center_name"
                  selected-color="primary"
                  selectable
                  class="px-2"
                />
              </v-row>
            </v-container>
          </v-stepper-content>

          <!-- Step 4: Saving and Schedule -->
          <v-stepper-step :complete="step > 4" step="4" class="font-roboto">
            {{ step4Header }}
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="config.report_title"
                    :counter="40"
                    :label="$t('report_title')"
                    prepend-icon="mdi-content-save-edit"
                    clearable
                    outlined
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="config.auto_send"
                    :label="$t('auto_send')"
                  />
                </v-col>
                <v-col cols="12">
                  <v-radio-group
                    v-model="config.report_schedule"
                    v-show="config.auto_send"
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
                <v-col cols="12">
                  <v-combobox
                    v-model="config.email_recipients"
                    v-show="config.auto_send"
                    :items="suggested_emails"
                    :label="$t('email_recipients')"
                    :search-input.sync="email_input"
                    @blur="email_input = ''"
                    prepend-icon="mdi-email-plus"
                    clearable
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
          </v-stepper-content>

          <!-- Step 5: The Report -->
          <v-stepper-step :complete="step > 5" step="5" class="font-roboto">
            {{ $t('my_report') }}
          </v-stepper-step>
          <v-stepper-content step="5" class="ma-0 pa-0">
            <v-container>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-card outlined>
                    <v-toolbar flat color="transparent">
                      <v-toolbar-title>{{ config.report_title }}</v-toolbar-title>
                      <v-spacer />
                      <v-text-field
                        v-model="search"
                        :label="$t('search')"
                        prepent-inner-icon="mdi-magnify"
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
                      <v-divider vertical inset class="mx-4" />
                      <!-- Download as XLS button -->
                      <client-only>
                        <download-excel :fields="downloadFields" :data="items">
                          <v-btn :title="`${$t('save')} .xls`" color="primary" large icon>
                            <v-icon v-text="'mdi-cloud-download'" />
                          </v-btn>
                        </download-excel>
                      </client-only>
                    </v-toolbar>
                    <v-divider />
                    <v-skeleton-loader :loading="loading" type="table">
                      <v-data-table
                        :items="items"
                        :headers="report_headers"
                        :items-per-page="25"
                        :loading="loading"
                        :mobile-breakpoint="0"
                        :search="search"
                        outlined
                        class="striped"
                      />
                    </v-skeleton-loader>
                  </v-card>
                </v-col>
                <!-- <v-col cols="12">
                  <div v-for="(item, name) in config" :key="`config-${name}`">
                    <label>{{ name }}</label>
                    <span>{{ item }}</span>
                  </div>
                </v-col> -->
              </v-row>
            </v-container>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-btn @click="startOver" color="error" depressed>
        Restart
      </v-btn>
      <v-spacer />
      <v-btn @click="prevStep" text>
        {{ $t('previous_step') }}
      </v-btn>
      <v-btn @click="nextStep" color="primary">
        {{ $t('next_step') }}
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'MyReports',
  data: vm => ({
    saved_report: null,
    saved_reports: [],
    available_column_groups: [],
    suggested_emails: [],
    email_input: '',
    items: [],
    loading: false,
    search: '',
    end_menu: false,
    start_menu: false,
    step: 1,

    // Model
    config: {
      auto_send: false,
      report_schedule: 'monthly',
      report_title: null,
      report_type: null,
      centers_selected: [],
      columns_selected: [],
      email_recipients: [],
      start: vm.$moment().subtract(1, 'years').format('YYYY-MM-DD'),
      end: vm.$moment().format('YYYY-MM-DD')
    }
  }),
  computed: {
    downloadFields () {
      return (Object.assign({}, ...this.config.columns_selected.map(column => ({ [this.$i18n.t(column)]: column }))))
    },
    step1Header () {
      return (this.step <= 1)
        ? this.$i18n.t('report_type')
        : `${this.$i18n.t('report_type')}: ${this.$i18n.t(this.config.report_type)}`
    },
    step2Header () {
      return (this.step <= 2)
        ? this.$i18n.t('report_columns')
        : `${this.$i18n.t('report_columns')}: ${this.$i18n.tc('columns_selected', this.config.columns_selected.length)}`
    },
    step3Header () {
      return (this.step <= 3)
        ? this.$i18n.t('scope_of_report')
        : `${this.$i18n.t('scope_of_report')}: ${this.$moment(this.config.start).format('L')} - ${this.$moment(this.config.end).format('L')}, ${this.$i18n.tc('centers_selected', this.config.centers_selected.length)}`
    },
    step4Header () {
      return this.$i18n.t('saving_and_scheduling')
    },
    defaultConfig () {
      return {
        auto_send: false,
        report_schedule: 'monthly',
        report_title: null,
        report_type: null,
        centers_selected: [],
        columns_selected: [],
        email_recipients: [],
        start: this.$moment().subtract(1, 'years').format('YYYY-MM-DD'),
        end: this.$moment().format('YYYY-MM-DD')
      }
    },
    center_hierarchy () {
      // TODO: this will probably be coming from $store.getters['account/getCenterHierarchy'], but here is some test data:
      return [
        {
          center_code: 'A01',
          center_name: 'Emkay Inc',
          children: [
            {
              center_code: '001',
              center_name: 'Executive',
              children: []
            },
            {
              center_code: 'B01',
              center_name: 'Sales',
              children: [
                {
                  center_code: '002',
                  center_name: 'Sales',
                  children: []
                },
                {
                  center_code: '003',
                  center_name: 'Account Managers',
                  children: []
                },
                {
                  center_code: '004',
                  center_name: 'Short Term & Unassigned Demos',
                  children: []
                },
                {
                  center_code: '005',
                  center_name: 'Sales/Canada',
                  children: []
                },
                {
                  center_code: '006',
                  center_name: 'Board of Directors',
                  children: []
                }
              ]
            }
          ]
        },
        {
          center_code: 'A02',
          center_name: 'Jessica Tepas',
          children: []
        },
        {
          center_code: 'A03',
          center_name: 'Dan Corbett',
          children: [
            {
              center_code: 'B03',
              center_name: 'Dan Corbett',
              children: [
                {
                  center_code: '008',
                  center_name: 'Dan Corbett',
                  children: []
                }
              ]
            }
          ]
        },
        {
          center_code: 'A04',
          center_name: 'Greg Depace',
          children: [
            {
              center_code: 'B04',
              center_name: 'Greg Depace',
              children: [
                {
                  center_code: '009',
                  center_name: 'Greg Depace',
                  children: []
                }
              ]
            }
          ]
        },
        {
          center_code: 'A05',
          center_name: 'Chris Tepas',
          children: [
            {
              center_code: '010',
              center_name: 'Chris Tepas',
              children: []
            },
            {
              center_code: 'B05',
              center_name: 'Chris Tepas',
              children: []
            }
          ]
        },
        {
          center_code: 'B02',
          center_name: 'Jessica Tepas',
          children: [
            {
              center_code: '007',
              center_name: 'Jessica Tepas',
              children: []
            }
          ]
        }
      ]
    },
    report_headers () {
      return this.config.columns_selected.map((column, index) => {
        return {
          text: this.$i18n.t(column),
          value: column,
          class: 'report-column',
          divider: index < this.config.columns_selected.length - 1
        }
      })
    },
    report_types () {
      return [
        { type: 'vehicle', icon: 'mdi-car' },
        { type: 'billing', icon: 'mdi-receipt' },
        { type: 'fuel', icon: 'mdi-gas-station' },
        { type: 'maintenance', icon: 'mdi-tools' },
        { type: 'expenses', icon: 'mdi-cash-usd' },
        { type: 'claims', icon: 'mdi-car-parking-lights' },
        { type: 'violations', icon: 'mdi-shield-car' }
      ]
    }
  },
  watch: {
    async 'config.report_type' () {
      console.log(`Report Type Changed: ${this.config.report_type}`)
      // Fetch available columns for this report type
      await this.getAvailableColumnGroups(this.config.report_type)
      // Clear selected columns since we have gone back a step and changed report types
      // this.config.columns_selected = []
    },
    'config.centers_selected' () {
      console.log(`Centers Changed: ${this.config.centers_selected}`)
    },
    'config.columns_selected' () {
      console.log(`Columns Changed: ${this.config.columns_selected}`)
    },
    'config.email_recipients' () {
      console.log(`Email Recipients Changed: ${this.config.email_recipients}`)
    },
    async step () {
      if (this.step === 5) {
        await console.log('Last Step, make it count')
        try {
          await this.fetchMyReport()
        } catch (error) {
          console.error(error.message)
        } finally {
          // testing
          this.items = [{ vehicle_number: 'ABC123' }, { vehicle_number: 'QWERTY2' }]
        }
      }
    },
    async saved_report () {
      if (!this.saved_report) {
        this.startOver()
      } else {
        // if we're just refreshing the page, don't navigate to the same url
        if (this.$route.query.reportId !== this.saved_report) {
          this.$router.replace({ query: { reportId: this.saved_report } })
        }
        await this.loadModel(this.saved_report)
        this.step = 5
      }
    }
  },
  async mounted () {
    await console.log('Entered My Reports')

    await this.getSavedReports()

    // if reportId is a query parameter, load the requested report config
    if (this.$route.query && this.$route.query.reportId) {
      await this.loadModel(this.$route.query.reportId)
    }
    // TODO: load email suggestions from account settings or other
    // this.suggested_emails = await this.$axios.get('/account/preferred-emails')
    this.getSuggestedEmails()
  },
  methods: {
    getSuggestedEmails () {
      // const data = await this.$axios.get('...')
      this.suggested_emails = [
        'agriffith@emkay.com',
        'jklonowski@emkay.com',
        'jim@jimklonowski.com'
      ]
    },
    async getSavedReports () {
      await console.log('Fetching saved reports...')
      // TODO: write endpoint
      // this.saved_reports = await this.$axios.get('/reports/my-reports')
      this.saved_reports = [
        { header: this.$i18n.t('your_saved_reports') },
        { header: 'these are fake...' },
        'ABC123',
        'QWERTY666'
      ]
    },
    async fetchMyReport () {
      this.loading = true
      try {
        const data = await this.$axios.post('/reports/my-report', this.config)
        console.log(data)
      } catch (error) {
        console.error(error.message)
      } finally {
        await setTimeout(() => { this.loading = false }, 2000)
      }
    },
    async loadModel (id) {
      if (typeof id === 'undefined') {
        this.config = { ...this.config, ...this.defaultConfig }
      } else {
        // copy empty config into model
        // let config = this.defaultConfig
        // Request Saved Report Config
        const { data: { savedConfig, success, message } } = await this.$axios.get('/reports/my-reports-saved-config', { params: { id } })
        if (!success) { this.$snotify.error(message, this.$i18n.t('error')) }
        // copy loaded config into model
        this.config = { ...this.config, ...savedConfig }
        this.saved_report = id
      }
    },
    async getAvailableColumnGroups (type) {
      const { data: { groups, success, message } } = await this.$axios.get('/reports/my-reports-columns', { params: { type } })
      if (!success) { this.$snotify.error(message, this.$i18n.t('error')) }
      this.available_column_groups = groups
    },
    nextStep () {
      if (this.step < 5) { this.step++ } else { this.step = 1 }
    },
    prevStep () {
      if (this.step > 1) { this.step-- } else { this.step = 5 }
    },
    removeEmail (item) {
      this.config.email_recipients.splice(this.config.email_recipients.indexOf(item), 1)
      this.config.email_recipients = [...this.config.email_recipients]
    },
    // async savedReportChanged () {
    //   debugger
    //   // If we cleared the saved-report dropdown, then clear the current model
    //   if (this.saved_report === undefined) {
    //     this.startOver()
    //   } else {
    //     debugger
    //     await this.loadModel(this.saved_report)
    //     this.$router.push({ query: { reportId: this.saved_report } })
    //   }
    // },
    startOver () {
      // Start Over button pressed, restore blank default configuration and remove reportId from query param
      this.step = 1
      this.available_column_groups = []
      this.suggested_emails = []
      this.email_input = ''
      this.items = []
      this.loading = false
      this.search = ''
      this.end_menu = false
      this.start_menu = false
      this.saved_report = null
      this.config = { ...this.config, ...this.defaultConfig }
      this.getSuggestedEmails()
      if (this.$route.query && this.$route.query.reportId) {
        this.$router.push({ query: { reportId: undefined } })
      }
    }
  },
  head () {
    const title = this.$t('my_reports')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
