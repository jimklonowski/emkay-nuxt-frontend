<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined tile class="report">
          <v-card-title class="pa-0">
            <v-toolbar height="72" tile elevation="1">
              <v-tabs
                v-model="tab"
                grow
                centered
                icons-and-text
              >
                <v-tabs-slider />
                <v-tab>
                  {{ $t('documents') }}
                  <v-icon v-text="'mdi-file-document-box-multiple'" />
                </v-tab>
                <v-tab>
                  {{ $t('notes') }}
                  <v-icon v-text="'mdi-note-multiple'" />
                </v-tab>
              </v-tabs>
            </v-toolbar>
          </v-card-title>
          <v-divider />
          <v-card-text class="pa-0">
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card flat tile>
                  <v-data-table
                    :dense="documents && documents.length !== 0"
                    :headers="documents_headers"
                    :items="documents"
                    :items-per-page="5"
                    :loading="documents_loading"
                    :mobile-breakpoint="0"
                    :sort-by="['date']"
                    :sort-desc="[true]"
                    class="striped"
                  >
                    <template #top>
                      <v-toolbar flat color="transparent">
                        <v-toolbar-title>
                          {{ $t('documents') }}
                        </v-toolbar-title>
                        <v-spacer />
                        <v-dialog v-model="document_dialog" max-width="800px">
                          <template #activator="{ on }">
                            <v-btn v-show="tab === 0" v-on="on" color="primary">
                              <v-icon v-text="'mdi-file-document-box-plus'" class="mr-2" />
                              {{ $t('upload_document') }}
                            </v-btn>
                          </template>
                          <v-card :loading="uploading_document">
                            <ValidationObserver ref="documentForm" v-slot="{ handleSubmit }">
                              <v-form @submit.prevent="handleSubmit(submitDocument)">
                                <v-card-title>
                                  {{ $t('upload_documents') }}
                                </v-card-title>
                                <v-card-text class="pa-0">
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12">
                                        <ValidationProvider v-slot="{ errors, validate }" :name="$t('documents')" rules="required">
                                          <v-file-input
                                            :label="$t('upload_documents')"
                                            :placeholder="$t('select')"
                                            :show-size="1000"
                                            :error-messages="errors"
                                            @change="validate($event)"
                                            accept=".jpg, .jpeg, .bmp, .pdf, .png, .tiff"
                                            color="primary"
                                            counter
                                            chips
                                            multiple
                                            prepend-icon="mdi-paperclip"
                                            outlined
                                          >
                                            <template #selection="{ index, text }">
                                              <v-chip
                                                v-if="index < 2"
                                                color="primary"
                                                dark
                                                label
                                                small
                                              >
                                                {{ text }}
                                              </v-chip>
                                              <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                                                +{{ files.length - 2 }} File(s)
                                              </span>
                                            </template>
                                          </v-file-input>
                                        </ValidationProvider>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-btn
                                    :loading="uploading_document"
                                    block
                                    color="primary"
                                    type="submit"
                                  >
                                    {{ $t('upload') }}
                                  </v-btn>
                                </v-card-actions>
                              </v-form>
                            </ValidationObserver>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                      <v-divider />
                    </template>
                  </v-data-table>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat tile>
                  <v-data-table
                    :dense="notes && notes.length !== 0"
                    :headers="notes_headers"
                    :items="notes"
                    :items-per-page="5"
                    :loading="notes_loading"
                    :mobile-breakpoint="0"
                    :sort-by="['date']"
                    :sort-desc="[true]"
                    class="striped"
                  >
                    <template #top>
                      <v-toolbar flat color="transparent">
                        <v-toolbar-title>
                          {{ $t('notes') }}
                        </v-toolbar-title>
                        <v-spacer />
                        <v-dialog v-model="note_dialog" max-width="800px">
                          <template #activator="{ on }">
                            <v-btn v-show="tab === 1" v-on="on" color="primary">
                              <v-icon v-text="'mdi-note-plus'" class="mr-2" />
                              {{ $t('add_note') }}
                            </v-btn>
                          </template>
                          <v-card :loading="adding_note">
                            <ValidationObserver ref="noteForm" v-slot="{ handleSubmit }">
                              <v-form @submit.prevent="handleSubmit(submitNote)">
                                <v-card-title>
                                  {{ $t('add_note') }}
                                </v-card-title>
                                <v-card-text class="pa-0">
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12">
                                        <ValidationProvider v-slot="{ errors, valid }" :name="$t('note')" rules="required">
                                          <v-textarea
                                            v-model="note_text"
                                            :label="$t('note')"
                                            :error-messages="errors"
                                            :success="valid"
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
                                    :loading="adding_note"
                                    block
                                    color="primary"
                                    type="submit"
                                  >
                                    {{ $t('submit') }}
                                  </v-btn>
                                </v-card-actions>
                              </v-form>
                            </ValidationObserver>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                      <v-divider />
                    </template>
                  </v-data-table>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
          <!-- <v-card-title>
            {{ $t('documents_and_notes') }}
            <v-spacer />

          </v-card-title>
          <v-card-text class="pa-0">
            <v-tabs v-model="tab" grow>
              <v-tabs-slider />
              <v-tab>{{ $t('documents') }}</v-tab>
              <v-tab>{{ $t('notes') }}</v-tab>
            </v-tabs>
            <v-divider />
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card flat tile>
                  <v-data-table
                    :dense="documents && documents.length !== 0"
                    :headers="documents_headers"
                    :items="documents"
                    :items-per-page="5"
                    :loading="documents_loading"
                    :mobile-breakpoint="0"
                    :sort-by="['date']"
                    :sort-desc="[true]"
                    class="striped"
                  />
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat tile>
                  <v-data-table
                    :dense="notes && notes.length !== 0"
                    :headers="notes_headers"
                    :items="notes"
                    :items-per-page="5"
                    :loading="notes_loading"
                    :mobile-breakpoint="0"
                    :sort-by="['date']"
                    :sort-desc="[true]"
                    class="striped"
                  />
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text> -->
          <!-- <v-card-actions /> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { vehicleRoute } from '@/mixins/routing'

export default {
  name: 'DocumentsAndNotes',
  mixins: [vehicleRoute],
  data () {
    return {
      adding_note: false,
      document_dialog: false,
      files: [],
      note_dialog: false,
      note_text: null,
      tab: null,
      uploading_document: false
    }
  },
  computed: {
    ...mapGetters({
      documents: 'vehicle/getDocuments',
      documents_loading: 'vehicle/getDocumentsLoading',
      notes: 'vehicle/getNotes',
      notes_loading: 'vehicle/getNotesLoading'
    }),
    documents_columns () {
      return [
        'date',
        'document_type'
      ]
    },
    documents_headers () {
      return [
        {
          text: this.$i18n.t('date'),
          value: 'date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('document_type'),
          value: 'document_type',
          class: 'report-column'
        }
      ]
    },
    notes_columns () {
      return [
        'date',
        'timestamp',
        'username',
        'note'
      ]
    },
    notes_headers () {
      return [
        {
          text: this.$i18n.t('date'),
          value: 'date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('timestamp'),
          value: 'timestamp',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('username'),
          value: 'username',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('note'),
          value: 'note',
          class: 'report-column'
        }
      ]
    }
  },
  async asyncData ({ $params, query, store, error }) {
    const vehicle = store.getters['vehicle/getVehicleNumber']
    // Fetch Documents and Notes
    await Promise.all([
      store.dispatch('vehicle/fetchDocuments', { vehicle }),
      store.dispatch('vehicle/fetchNotes', { vehicle })
    ])
    return {}
  },
  methods: {
    submitDocument () {
      this.$snotify.info('Document Uploaded', 'TODO')
      this.uploading_document = true
      setTimeout(() => {
        this.uploading_document = false
      }, 1000)
    },
    submitNote () {
      this.$snotify.info('Note Submitted', 'TODO')
      this.adding_note = true
      setTimeout(() => {
        this.adding_note = false
      }, 1000)
    }
  },
  head () {
    const title = `${this.$route.params.vehicle} - ${this.$t('documents_and_notes')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  }
}
</script>
