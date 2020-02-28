<template>
  <v-card :loading="loading">
    <ValidationObserver ref="fuelCardRequestForm" v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(submitFuelCardRequest)">
        <v-toolbar dark color="primary">
          <v-btn @click="$emit('close-dialog')" dark icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-divider vertical inset class="mr-4" />
          <v-toolbar-title>
            {{ $t('fuel_card_request') }}
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-expansion-panels
                :value="0"
                :dark="false"
                accordion
                hover
                tile
              >
                <v-expansion-panel>
                  <v-expansion-panel-header class="text-uppercase" color="primary white--text">
                    {{ $t('card_information') }}
                    <template #actions>
                      <v-icon color="white">
                        mdi-chevron-down
                      </v-icon>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-title>{{ $t('card_number') }}</v-list-item-title>
                            <v-list-item-subtitle>{{ card }}</v-list-item-subtitle>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>{{ $t('issue_date') }}</v-list-item-title>
                            <v-list-item-subtitle>{{ '2020-01-10' | date }}</v-list-item-subtitle>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>{{ $t('expiration_date') }}</v-list-item-title>
                            <v-list-item-subtitle>{{ '2024-01' | date }}</v-list-item-subtitle>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>{{ $t('pin') }}</v-list-item-title>
                            <v-list-item-subtitle>1234</v-list-item-subtitle>
                          </v-list-item>
                        </v-list>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-title>{{ $t('vendor') }}</v-list-item-title>
                            <v-list-item-subtitle>WEX</v-list-item-subtitle>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>{{ $t('status') }}</v-list-item-title>
                            <v-list-item-subtitle>ACTIVE</v-list-item-subtitle>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>{{ $t('restrictions') }}</v-list-item-title>
                            <v-list-item-subtitle>ID & ODOMETER, UNRESTRICTED</v-list-item-subtitle>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>{{ $t('authorization_profile') }}</v-list-item-title>
                            <v-list-item-subtitle>DLY:#3/$300 MTH:$1000</v-list-item-subtitle>
                          </v-list-item>
                        </v-list>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col cols="12">
              <v-alert type="info" outlined dense>
                Card orders will be mailed within 2 business days of receiving and processing your fuel card request.
              </v-alert>
            </v-col>
            <v-subheader v-text="$t('request_type')" />
            <v-col cols="12">
              <v-radio-group v-model="request_type" row dense>
                <v-radio v-for="requestType in fuelCardRequestTypes" :key="requestType.value" :value="requestType.value" :label="requestType.text" />
              </v-radio-group>
            </v-col>
            <v-col v-show="request_type !== 'terminate'" cols="12" md="6">
              <v-row>
                <v-subheader v-text="$t('send_card_to')" />
                <v-col cols="12">
                  <v-text-field :label="$t('recipient')" dense outlined />
                </v-col>
                <v-col cols="12">
                  <v-text-field :label="$t('address_1')" dense outlined />
                </v-col>
                <v-col cols="12">
                  <v-text-field :label="$t('address_2')" dense outlined />
                </v-col>
                <v-col cols="12">
                  <v-text-field :label="$t('city')" dense outlined />
                </v-col>
                <v-col cols="6">
                  <v-text-field :label="$t('state_province')" dense outlined />
                </v-col>
                <v-col cols="6">
                  <v-text-field :label="$t('postal_code')" dense outlined />
                </v-col>
                <v-col cols="12">
                  <v-textarea :label="$t('comments')" dense outlined />
                </v-col>
              </v-row>
            </v-col>
            <v-col v-show="request_type !== 'terminate'" cols="12" md="6">
              <v-subheader v-text="$t('ship_card_using')" />
              <v-list dense shaped three-line>
                <v-list-item-group v-model="shipping_type" color="primary">
                  <v-list-item>
                    <template #default="{ active, toggle }">
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          @click="toggle"
                          true-value="Regular"
                        />
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>Regular Shipping</v-list-item-title>
                        <v-list-item-subtitle>Card will be sent according to the shipping policy on file. If there is no policy on file, cards will be sent USPS First Class Mail.</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <template #default="{ active, toggle }">
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          @click="toggle"
                          true-value="Regular"
                        />
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>Two-Day Shipping</v-list-item-title>
                        <v-list-item-subtitle>By selecting Two-Day Shipping, you acknowledge that an additional fee will be charged to your company's account.</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <template #default="{ active, toggle }">
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          @click="toggle"
                          true-value="Regular"
                        />
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>Overnight Shipping</v-list-item-title>
                        <v-list-item-subtitle>By selecting Overnight Shipping, you acknowledge that an additional fee will be charged to your company's account.</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn type="submit" color="primary">
            Submit
          </v-btn>
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>

<script>
export default {
  props: {
    card: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false,
    // Model
    request_type: null,
    shipping_type: null
  }),
  computed: {
    fuelCardRequestTypes () {
      return [
        {
          text: this.$i18n.t('report_card_lost'),
          value: 'lost'
        },
        {
          text: this.$i18n.t('report_card_stolen'),
          value: 'stolen'
        },
        {
          text: this.$i18n.t('report_card_damaged'),
          value: 'damaged'
        },
        {
          text: this.$i18n.t('terminate_fuel_card'),
          value: 'terminate'
        }
      ]
    }
  },
  methods: {
    async submitFuelCardRequest () {
      debugger
      await console.log('test')
    }
  }
}
</script>
