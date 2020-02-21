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
            {{ stepOneHeader }}
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-list color="transparent" class="font-roboto-condensed" shaped>
              <v-list-item-group v-model="report_type">
                <v-list-item v-for="(item, key) in report_types" :key="key" active-class="primary--text text--accent-4">
                  <v-list-item-avatar>
                    <v-icon v-text="item.icon" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-stepper-content>
          <!-- Step 2: Choose Columns -->
          <v-stepper-step :complete="step > 2" step="2" class="font-roboto">
            {{ stepTwoHeader }}
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-list class="font-roboto-condensed" color="transparent" dense shaped subheader>
              <v-list-item-group v-model="columns_selected" multiple class="row">
                <v-col v-for="(group, name, g) in columns" :key="g" cols="12" md="6">
                  <v-subheader v-text="$t(name)" class="font-roboto" />
                  <template v-for="(item, i) in group">
                    <v-list-item :key="`${item.key}-${i}`" :value="item.key" active-class="primary--text text--accent-4">
                      <template v-slot:default="{ active, toggle }">
                        <v-list-item-content>
                          {{ $t(item.key) }}
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-checkbox
                            :input-value="active"
                            :true-value="item.key"
                            @click="toggle"
                          />
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-col>
              </v-list-item-group>
            </v-list>
          </v-stepper-content>
          <!-- Step 3: Scope (Dates and Centers) -->
          <v-stepper-step :complete="step > 3" step="3" class="font-roboto">
            {{ stepThreeHeader }}
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-subheader v-text="$t('filters')" />
            <v-row>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="start_menu"
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
                      prepend-icon="mdi-calendar"
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
                    <v-btn v-text="$t('cancel')" @click="start_menu = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.start_menu.save(start)" text />
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="end_menu"
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
                      prepend-icon="mdi-calendar"
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
                    <v-btn v-text="$t('cancel')" @click="end_menu = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.end_menu.save(end)" text />
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-subheader v-text="$t('centers')" />
            <v-row>
              <v-treeview
                :items="center_hierarchy"
                item-key="center_code"
                item-text="center_name"
                selected-color="primary"
                selectable
                class="px-2"
              />
            </v-row>
          </v-stepper-content>
          <!-- Step 4: Saving -->
          <v-stepper-step :complete="step > 4" step="4" class="font-roboto">
            {{ stepFourHeader }}
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="report_title"
                  :counter="40"
                  :label="$t('report_title')"
                  clearable
                  dense
                  hint="Provide a descriptive title to save this report as"
                  outlined
                  autocomplete="off"
                />
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="auto_send"
                  :label="$t('auto_send')"
                />
              </v-col>
              <v-col cols="12">
                <v-radio-group
                  v-model="schedule"
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
                  v-model="email_recipients"
                  :label="$t('email_recipients')"
                  chips
                  clearable
                  multiple
                  prepend-icon="mdi-email-plus"
                >
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
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-btn @click="startOver" color="error">
        Restart
      </v-btn>
      <v-spacer />
      <v-btn @click="prevStep" class="mx-2" text>
        {{ $t('previous_step') }}
      </v-btn>
      <v-btn @click="nextStep" color="primary">
        {{ $t('next_step') }}
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line
import groupBy from 'lodash.groupby'
export default {
  name: 'MyReports',
  data: vm => ({
    start_menu: false,
    end_menu: false,
    step: 1,
    // Model
    report_type: null,
    columns_selected: [],
    start: vm.$moment().subtract(1, 'years').format('YYYY-MM-DD'),
    end: vm.$moment().format('YYYY-MM-DD'),
    report_title: '',
    auto_send: false,
    schedule: 'weekly',
    email_recipients: []
  }),
  computed: {
    center_hierarchy () {
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
    flattenedColumns () {
      return [
        {
          key: 'vehicle_number',
          group: 'vehicle_information',
          selected: false
        },
        {
          key: 'center_code',
          group: 'vehicle_information',
          selected: true
        },
        {
          key: 'last_name',
          group: 'driver_information',
          selected: true
        },
        {
          key: 'first_name',
          group: 'driver_information',
          selected: true
        },
        {
          key: 'months_in_service',
          group: 'billing_information',
          selected: true
        },
        {
          key: 'rental_amount',
          group: 'billing_information',
          selected: true
        },
        {
          key: 'purchase_amount',
          group: 'fuel_information',
          selected: true
        },
        {
          key: 'purchase_quantity',
          group: 'fuel_information',
          selected: true
        },
        {
          key: 'purchase_date',
          group: 'fuel_information',
          selected: true
        }
      ]
    },
    columns () {
      // split into multiple arrays by group property
      const grouped = groupBy(this.flattenedColumns, 'group')
      // console.dir(grouped)
      return grouped
    },
    report_types () {
      return [
        { title: 'vehicle', icon: 'mdi-car' },
        { title: 'billing', icon: 'mdi-receipt' },
        { title: 'fuel', icon: 'mdi-gas-station' },
        { title: 'maintenance', icon: 'mdi-tools' },
        { title: 'expenses', icon: 'mdi-cash-usd' },
        { title: 'claims', icon: 'mdi-car-parking-lights' },
        { title: 'violations', icon: 'mdi-shield-car' }
      ]
    },
    stepOneHeader () {
      if (this.report_type == null) {
        return this.$i18n.t('report_type')
      } else {
        return `${this.$i18n.t('report_type')}: ${this.$i18n.t(this.report_types[this.report_type].title)}`
      }
    },
    stepTwoHeader () {
      const columnCount = this.columns_selected.length
      if (this.step < 2) {
        return this.$i18n.t('select_columns')
      } else {
        return this.$i18n.tc('columns_selected', columnCount)
      }
    },
    stepThreeHeader () {
      if (this.step < 4) {
        return this.$i18n.t('select_scope')
      } else {
        return `${this.$i18n.t('start_date')}: ${this.$moment(this.start).format('L')} ${this.$i18n.t('end_date')}: ${this.$moment(this.end).format('L')}`
      }
    },
    stepFourHeader () {
      return this.$i18n.t('saving_and_scheduling')
    }
  },
  watch: {
    columns_selected () {
      console.log('Columns Changed: ' + this.columns_selected.join(', '))
    }
  },
  mounted () {
    this.columns_selected = this.getCheckedColumns()
  },
  methods: {
    getCheckedColumns () {
      return Object.values(this.columns).map(x => x.filter(y => y.selected === true)).flat().map(z => z.key)
    },
    nextStep () {
      if (this.step < 4) { this.step++ } else { this.step = 1 }
    },
    prevStep () {
      if (this.step > 1) { this.step-- } else { this.step = 4 }
    },
    removeEmail (item) {
      this.email_recipients.splice(this.email_recipients.indexOf(item), 1)
      this.email_recipients = [...this.email_recipients]
    },
    startOver () {
      this.step = 1
      this.report_type = null
      this.columns_selected = this.getCheckedColumns()
      this.start = this.$moment().subtract(1, 'years').format('YYYY-MM-DD')
      this.end = this.$moment().format('YYYY-MM-DD')
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
