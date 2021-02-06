<template>
  <form data-vv-scope="step-1">
    <div class="row mb-3">
      <div class="col-md-6">
        <list-document-types
          class="w-100"
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
        <vs-input
          class="w-100"
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
          v-model="step.issueDate"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-textarea
          type="text"
          label="Materia (Mínimo 2 palabras, máximo 5000 caracteres)"
          name="matter"
          width="100%"
          v-validate="'required|min:3'"
          height="100px"
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
    <div class="row mb-3">
      <div class="col-12">
        <vue-tags-input
          class="w-100 b-radius"
          v-model="tag"
          :tags="step.tags"
          @tags-changed="newTags => step.tags = newTags"
          placeholder="Agregar"
          :separators="[',']"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="row">
          <div class="col-md-4">
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

import Datepicker from 'vuejs-datepicker';
import VueTagsInput from '@johmun/vue-tags-input'; // docs: http://www.vue-tags-input.com/#/api/props

import WizardStep from '@/febos/chile/dnt/mixins/WizardStep';
import ListDocumentTypes from '@/febos/chile/lists/components/ListDocumentTypes';
import ListDocuments from '@/febos/chile/lists/components/ListDocuments';

export default {
  mixins: [WizardStep],
  components: {
    Datepicker,
    VueTagsInput,
    ListDocumentTypes,
    ListDocuments
  },
  data() {
    return {
      tag: '',
      step: {
        documentType: '',
        document: '',
        documentNumber: '',
        issueDate: '',
        matter: '',
        tags: [],
        isPrivate: 0,
        ...this.draft
      }
    };
  },
  methods: {
    async isValid() {
      return this.validateForm('step-1');
    },
    getStepData() {
      console.log('getStepData 1', this.step);
      const documentName = this.step.document
        ? {
          documentName: this.$refs.documents.getOption().label
        }
        : {};

      return {
        ...this.step,
        documentTypeName: this.$refs.documentTypes.getOption().label,
        issueDate: this.$moment(this.issueDate).format('YYYY-MM-DD'),
        ...documentName
      };
    }
  }
};

</script>
<style>
.ti-input {
  border-radius: 6px;
}
</style>
