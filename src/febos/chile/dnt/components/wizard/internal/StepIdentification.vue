<template>
  <form data-vv-scope="step-1">
    <div class="row mb-3">
      <div class="col-md-6">
        <list-document-types
          class="w-100"
          :disabled="step.documentNumber !== ''"
          autocomplete
          label="Tipo Documento"
          name="documentType"
          v-model="step.documentType"
          :danger="errors.has('step-1.documentType')"
          :danger-text="errors.first('step-1.documentType')"
          v-validate="'required'"
          ref="documentTypes"
        />
      </div>
      <div class="col-md-6">
        <list-documents
          class="w-100"
          :disabled="step.documentNumber !== ''"
          autocomplete
          label="Documento"
          name="document"
          v-model="step.document"
          :parent-value="step.documentType"
          ref="documents"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <vs-select
          class="w-100"
          autocomplete
          label="Formato Documento"
          name="formatDocument"
          v-model="step.formatDocument"
        >
          <vs-select-item
            :value="0"
            text="Papel"
          />
          <vs-select-item
            :value="1"
            text="Electrónico"
          />
        </vs-select>
      </div>
      <div class="col-md-6 text-center mt-3">
        <vs-button
          v-if="!step.documentNumber"
          :disabled="!step.document"
          @click="getNumeration()"
        >
          reservar folio
        </vs-button>
        <vs-button
          v-if="step.documentNumber"
          :disabled="!step.document"
          @click="freeNumeration()"
        >
          liberar folio
        </vs-button>
        <div>
        <span class="span-text-loading" v-if="loadingNumeration">
          Buscando folio por favor espera
        </span>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <vs-input
          class="w-100"
          disabled
          label="Nº Documento"
          name="documentNumber"
          v-model="step.documentNumber"
        />
      </div>
      <div class="col-md-6">
        <label>Fecha Documento</label>
        <datepicker
          class="w-100"
          name="issueDate"
          :language="es"
          :disabled-dates="disabledDates"
          v-model="step.issueDate"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <label for="matter">Materia (Mínimo 2 palabras, máximo 5000 caracteres)</label>
        <vs-textarea
          type="text"
          id="matter"
          label="Materia (Mínimo 2 palabras, máximo 5000 caracteres)"
          name="matter"
          width="100%"
          v-validate="'required|min:3'"
          height="100px"
          maxlength="5000"
          class="mb-0"
          v-model="step.matter"
        />
        <div v-if="errors.first('step-1.matter')"
             class="con-text-validation span-text-validation-danger
         vs-input--text-validation-span v-enter-to"
             style="height: 32px;">
        <span class="span-text-validation">
          {{errors.first('step-1.matter')}}
        </span>
        </div>
      </div>
    </div>
    <div class="row mb-3 mt-2">
      <div class="col-12">
        <label for="tags">Etiquetas / Referencias del Documento</label>
        <vue-tags-input
          id="tags"
          class="w-100 b-radius "
          v-model="tag"
          :tags="step.tags"
          name="tags"
          @tags-changed="newTags => step.tags = newTags"
          placeholder="Agregar"
          :separators="[',']"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="row">
          <div class="col-md-2">
            <label>Documento Privado</label>
          </div>
          <div class="col-md-1">
            <vs-radio
              vs-name="isPrivate"
              :vs-value="1"
              v-model="step.isPrivate"
            >
              Si
            </vs-radio>
          </div>
          <div class="col-md-1">
            <vs-radio
              vs-name="isPrivate"
              :vs-value="0"
              v-model="step.isPrivate"
            >
              No
            </vs-radio>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>

import VueTagsInput from '@johmun/vue-tags-input'; // docs: http://www.vue-tags-input.com/#/api/props
import Datepicker from 'vuejs-datepicker';
import { es } from 'vuejs-datepicker/dist/locale';
import { mapActions, mapGetters } from 'vuex';

import WizardStep from '@/febos/chile/dnt/mixins/WizardStep';
import ListDocumentTypes from '@/febos/chile/lists/components/ListDocumentTypes';
import ListDocuments from '@/febos/chile/lists/components/ListDocuments';

export default {
  mixins: [WizardStep],
  components: {
    VueTagsInput,
    ListDocumentTypes,
    ListDocuments,
    Datepicker
  },
  data() {
    return {
      es,
      tag: '',
      disabledDates: {
        from: new Date()
      },
      step: {
        documentType: '',
        document: '',
        documentNumber: '',
        issueDate: '',
        formatDocument: 0,
        matter: '',
        tags: [],
        isPrivate: 0,
        ...this.draft
      }
    };
  },
  watch: {
    numerationFile(newValue) {
      this.step.documentNumber = newValue;
    },
    'step.documentType': function () {
      this.step.documentNumber = '';
    }
  },
  computed: {
    ...mapGetters('Dnts', [
      'numerationFile',
      'loadingNumeration',
      'numerationFebosId'
    ]),
  },
  methods: {
    ...mapActions('Dnts', [
      'searchNumeration',
      'releaseNumeration'
    ]),
    freeNumeration() {
      this.releaseNumeration(this.numerationFebosId);
      this.step.documentNumber = '';
    },
    getNumeration() {
      const documentId = this.$refs.documents.getOption().id;
      this.searchNumeration(documentId);
    },
    async isValid() {
      return this.validateForm('step-1');
    },
    getStepData() {
      const documentName = this.step.document
        ? {
          documentName: this.$refs.documents.getOption().label
        }
        : {};

      const documentTypeName = this.step.documentType
        ? {
          documentTypeName: this.$refs.documentTypes.getOption().label
        }
        : {};

      return {
        ...this.step,
        ...documentTypeName,
        ...documentName
      };
    }
  }
};

</script>
<style>
.ti-input {
  border-radius: 5px;
}
.span-text-loading {
  color: #671e85;
}
</style>
