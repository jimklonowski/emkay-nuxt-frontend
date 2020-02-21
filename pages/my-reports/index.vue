<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        {{ $t('my_reports') }}
      </v-col>
      <v-col cols="12">
        <v-stepper v-model="step" vertical>
          <!-- Step 1: Pick Report Type -->
          <v-stepper-step :complete="step > 1" step="1">
            {{ stepOneHeader }}
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-list shaped>
              <v-list-item-group v-model="report_type">
                <v-list-item v-for="(item, key) in report_types" :key="key" @click="step = 2">
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
          <v-stepper-step :complete="step > 2" step="2">
            {{ stepTwoHeader }}
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-list dense shaped subheader>
              <v-list-item-group v-model="columns_selected" multiple class="row">
                <v-col v-for="(group, name, g) in columns" :key="g" cols="12" sm="6">
                  <v-subheader v-text="$t(name)" />
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
          <!-- Step 3: Scope -->
          <v-stepper-step :complete="step > 3" step="3">
            {{ stepThreeHeader }}
          </v-stepper-step>
          <v-stepper-content step="3">
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
          </v-stepper-content>
          <v-stepper-step :complete="step > 4" step="4">
            {{ stepFourHeader }}
          </v-stepper-step>
          <v-stepper-content step="4">
            Save your report
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-btn @click="startOver" color="error">
        Restart
      </v-btn>
      <v-spacer />
      <v-btn @click="prevStep" class="mx-2">
        {{ $t('previous_step') }}
      </v-btn>
      <v-btn @click="nextStep">
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
    end: vm.$moment().format('YYYY-MM-DD')
  }),
  computed: {
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
        return `${this.$i18n.t('start_date')}: ${this.$moment(this.start).format('L')}\t${this.$i18n.t('end_date')}: ${this.$moment(this.end).format('L')}`
      }
    },
    stepFourHeader () {
      return this.$i18n.t('save')
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
      this.step++
    },
    prevStep () {
      this.step--
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
