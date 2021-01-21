<template>
  <form data-vv-scope="step-1">
    <div class="row mb-3">
      <div class="col-md-6">
        <list-document-types
          class="w-100"
          autocomplete
          label="Tipo Documento"
          name="tipoDocumentoCategoria"
          v-model="step.tipoDocumentoCategoria"
          :danger="errors.has('step-1.tipoDocumentoCategoria')"
          :danger-text="errors.first('step-1.tipoDocumentoCategoria')"
          v-validate="'required'"
        />
      </div>
      <div class="col-md-6">
        <list-documents
          class="w-100"
          autocomplete
          label="Documento"
          name="tipoDocumento"
          v-model="step.tipoDocumento"
          :parent-value="step.tipoDocumentoCategoria"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <vs-input
          class="w-100"
          label="Nº Documento"
          name="numeroDocumento"
          v-model="step.numeroDocumento"
        />
      </div>
      <div class="col-md-6">
        <label>Fecha Documento</label>
        <datepicker
          class="w-100"
          name="fechaDocumento"
          v-model="step.fechaDocumento"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-textarea
          type="text"
          label="Materia (Mínimo 2 palabras, máximo 5000 caracteres)"
          name="materia"
          width="100%"
          v-validate="'required|min:3'"
          height="100px"
          class="mb-0"
          v-model="step.materia"
        />
        <div v-if="errors.first('step-1.materia')"
          class="con-text-validation span-text-validation-danger
           vs-input--text-validation-span v-enter-to"
          style="height: 32px;">
          <span class="span-text-validation">
            {{errors.first('step-1.materia')}}
          </span>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-select
          class="w-100"
          label="Etiquetas / Referencias del Documento"
          name="etiquetas"
          v-model="step.etiquetas"
          autocomplete
          multiple
        >
        </vs-select>
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
              vs-name="esPrivado"
              vs-value="si"
              v-model="step.esPrivado"
            >
              Si
            </vs-radio>
          </div>
          <div class="col-md-1">
            <vs-radio
              vs-name="esPrivado"
              vs-value="no"
              v-model="step.esPrivado"
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

import WizardStep from '@/febos/chile/dnt/mixins/WizardStep';
import ListDocumentTypes from '@/febos/chile/lists/components/ListDocumentTypes';
import ListDocuments from '@/febos/chile/lists/components/ListDocuments';

export default {
  mixins: [WizardStep],
  components: {
    Datepicker,
    ListDocumentTypes,
    ListDocuments
  },
  data() {
    return {
      step: {
        tipoDocumentoCategoria: '',
        tipoDocumento: '',
        numeroDocumento: '',
        fechaDocumento: '',
        materia: '', // este campo va en un array que se llama observacion,
        // posicion 0
        etiquetas: '',
        esPrivado: 'no'
      }
    };
  },
  methods: {
    async isValid() {
      try {
        await this.validateForm('step-1');
        // TODO: send to store.
        return true;
      } catch (e) {
        return false;
      }
    }
  }
};

</script>
