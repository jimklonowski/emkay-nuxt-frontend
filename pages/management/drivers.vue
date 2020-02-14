<template>
  <v-card outlined>
    <v-card-title class="font-lato">
      {{ $t('manage_your_drivers') }}
      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        clearable
        dense
        flat
        hide-details
        outlined
        rounded
        single-line
        solo
      />
    </v-card-title>
    <v-card-text class="pa-0">
      <v-data-table
        :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
        :headers="headers"
        :items="items"
        :items-per-page="25"
        :loading="loading"
        :mobile-break-point="0"
        :search="search"
        :sort-by="['vehicle_number']"
        :sort-desc="[false]"
        class="striped"
        dense
      >
        <!-- Configure Top Section -->
        <template #top>
          <v-toolbar flat>
            <v-spacer />
            <!-- Edit/Create Dialog -->
            <v-dialog v-model="dialog" max-width="800px" persistent>
              <template #activator="{ on }">
                <v-btn v-on="on" color="primary" class="mb-2">
                  <v-icon v-text="'mdi-account-plus'" class="mr-2" />
                  {{ $t('add_driver') }}
                </v-btn>
              </template>
              <v-card :loading="editLoading">
                <ValidationObserver ref="driverForm" v-slot="{ handleSubmit }">
                  <v-form @submit.prevent="handleSubmit(submitDriverEdit)">
                    <v-card-title v-text="formTitle" />
                    <v-card-subtitle v-text="editedItem.driver_id" />
                    <v-card-text>
                      <v-container>
                        <v-subheader v-text="$t('driver')" class="px-0" />
                        <v-row>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_last_name')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_last_name"
                                :label="$t('driver_last_name')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_first_name')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_first_name"
                                :label="$t('driver_first_name')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" md="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_address_1')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_address_1"
                                :label="$t('driver_address_1')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" md="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_address_2')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_address_2"
                                :label="$t('driver_address_2')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" md="5">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_city')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_city"
                                :label="$t('driver_city')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" md="3">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_state_province')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_state_province"
                                :label="$t('driver_state_province')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" md="4">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_postal_code')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_postal_code"
                                :label="$t('driver_postal_code')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_county')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_county"
                                :label="$t('driver_county')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_email_address')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_email_address"
                                :label="$t('driver_email_address')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_phone')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_phone"
                                :label="$t('driver_phone')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_mobile')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_mobile"
                                :label="$t('driver_mobile')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-subheader v-text="$t('driver_labels')" class="px-0" />
                        <v-row>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_misc_1')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_misc_1"
                                :label="$t('driver_misc_1')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_misc_2')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_misc_2"
                                :label="$t('driver_misc_2')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_misc_3')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_misc_3"
                                :label="$t('driver_misc_3')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors, valid }" :name="$t('driver_misc_4')" rules="required">
                              <v-text-field
                                v-model="editedItem.driver_misc_4"
                                :label="$t('driver_misc_4')"
                                :error-messages="errors"
                                :success="valid"
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        @click="close"
                        color="error lighten-1"
                        tabindex="-1"
                        text
                      >
                        {{ $t('cancel') }}
                      </v-btn>
                      <v-btn
                        @click="save"
                        type="submit"
                        color="primary"
                        text
                      >
                        {{ $t('save') }}
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </ValidationObserver>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <!-- Configure the #no-data message (no data from server) -->
        <template #no-data>
          <div class="text-left">
            {{ $t('no_data_found', { 'message': error }) }}
          </div>
        </template>

        <!-- Configure the #no-results message (no rows in filtered search) -->
        <template #no-results>
          <div class="text-left">
            {{ $t('no_search_results', { 'query': search }) }}
          </div>
        </template>

        <!-- Customize rendering of individual columns -->
        <template #item.actions="{ item }">
          <v-icon
            @click.stop="editDriver(item)"
            v-text="'mdi-account-edit'"
            class="mr-2 px-2"
          />
        </template>

        <template #item.vehicle_number="{ item }">
          <nuxt-link :title="$t(`to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" class="text-decoration-none" nuxt />
        </template>

        <template #item.driver_phone="{ item }">
          <v-btn
            v-show="item.driver_phone"
            @click="dialTo(item.driver_phone)"
            text
            small
            tile
          >
            <v-icon v-text="'mdi-phone'" class="mr-2" />
            {{ item.driver_phone | phone }}
          </v-btn>
        </template>

        <template #item.driver_mobile="{ item }">
          <v-btn
            v-show="item.driver_mobile"
            @click="dialTo(item.driver_mobile)"
            text
            small
            tile
          >
            <v-icon v-text="'mdi-cellphone-iphone'" class="mr-2" />
            {{ item.driver_mobile | phone }}
          </v-btn>
        </template>

        <template #item.driver_email_address="{ item }">
          <v-btn
            v-show="item.driver_email_address"
            @click="emailTo(item.driver_email_address)"
            text
            small
            tile
          >
            <v-icon v-text="'mdi-email-edit'" class="mr-2" />
            {{ item.driver_email_address }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- <v-card-actions /> -->
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { dialTo, emailTo } from '@/utility/helpers'
export default {
  name: 'ManageYourDrivers',
  computed: {
    ...mapGetters({
      items: 'drivers/getDrivers',
      error: 'drivers/getError',
      loading: 'drivers/getLoading'
    }),
    columns () {
      return [
        'actions',
        'vehicle_number',
        'driver_last_name',
        'driver_first_name',
        'driver_address_1',
        'driver_address_2',
        'driver_city',
        'driver_state_province',
        'driver_postal_code',
        'driver_county',
        'driver_phone',
        'driver_mobile',
        'driver_email_address',
        'driver_employee_id',
        'driver_misc_1',
        'driver_misc_2',
        'driver_misc_3',
        'driver_misc_4'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('actions'),
          value: 'actions',
          class: 'report-column',
          align: 'center',
          divider: true
        },
        {
          text: this.$i18n.t('vehicle_number'),
          value: 'vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_last_name'),
          value: 'driver_last_name',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('driver_first_name'),
          value: 'driver_first_name',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('driver_address_1'),
          value: 'driver_address_1',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('driver_address_2'),
          value: 'driver_address_2',
          class: 'report-column',
          width: 200,
          divider: true
        },
        {
          text: this.$i18n.t('driver_city'),
          value: 'driver_city',
          class: 'report-column',
          width: 150,
          divider: true
        },
        {
          text: this.$i18n.t('driver_state_province'),
          value: 'driver_state_province',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_postal_code'),
          value: 'driver_postal_code',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_county'),
          value: 'driver_county',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_phone'),
          value: 'driver_phone',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_mobile'),
          value: 'driver_mobile',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_email_address'),
          value: 'driver_email_address',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_employee_id'),
          value: 'driver_employee_id',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_misc_1'),
          value: 'driver_misc_1',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_misc_2'),
          value: 'driver_misc_2',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_misc_3'),
          value: 'driver_misc_3',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_misc_4'),
          value: 'driver_misc_4',
          class: 'report-column',
          divider: true
        }
      ]
    },
    formTitle () {
      return this.editedIndex === -1 ? this.$i18n.t('add_driver') : this.$i18n.t('edit_driver')
    }
  },
  async asyncData ({ store }) {
    let search, editLoading
    const dialog = false
    const editedIndex = -1
    // create an object to use as model for ADD NEW DRIVER form
    const defaultItem = {
      driver_id: '',
      driver_last_name: '',
      driver_first_name: '',
      driver_address_1: '',
      driver_address_2: '',
      driver_city: '',
      driver_state_province: '',
      driver_postal_code: '',
      driver_county: '',
      driver_phone: '',
      driver_mobile: '',
      driver_email_address: '',
      driver_employee_id: '',
      driver_misc_1: '',
      driver_misc_2: '',
      driver_misc_3: '',
      driver_misc_4: '',
      vehicle_number: ''
    }
    // shallow clone this object to use as the model for EDIT form
    const editedItem = { ...defaultItem }

    const filters = {
      command: 'FLEET',
      subcommand: 'DRIVERS',
      customer: 'EM102',
      json: 'Y'
    }
    // Fetch drivers
    await store.dispatch('drivers/fetchDrivers', filters)
    return {
      defaultItem,
      dialog,
      editedIndex,
      editedItem,
      editLoading,
      search
    }
  },
  methods: {
    dialTo,
    emailTo,
    close () {
      this.dialog = false
      // not sure if this setTimeout is required, copied from vuetify CRUD datatable example
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$refs.driverForm.reset()
      }, 300)
    },
    save () {
      try {
        this.editLoading = true
        if (this.editedIndex > -1) {
          // Editing existing driver details...
          debugger
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          // Saving new driver...
          debugger
          this.items.push(this.editedItem)
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.editLoading = false
        this.close()
      }
    },
    editDriver (item) {
      // if editing, set the editIndex to that of the item we clicked
      this.editedIndex = this.items.indexOf(item)
      // load the selected item's data into the editedItem object before opening dialog
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    }
    // async submitDriverEdit () {
    //   this.editLoading = true
    //   try {
    //     // get the driver id
    //     const id = this.editedItem.driver_id
    //     await this.$axios.post('/fleet/drivers/edit', { id, item: this.editedItem })
    //   } catch (error) {
    //     console.error(error)
    //   } finally {
    //     this.editLoading = false
    //   }
    // },
    // deleteDriver (item) {
    //   this.$snotify.info('TODO', 'delete')
    // }
  },
  head () {
    const title = this.$t('manage_your_drivers')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
