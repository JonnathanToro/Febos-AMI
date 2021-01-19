<template>
  <form data-vv-scope="step-1">
    <div class="row mb-3">
      <div class="col-md-6">
        <list-document-types
          class="w-100"
          autocomplete
          label="Tipo Documento"
          name="codigo_tipo_documento"
          v-model="step.codigo_tipo_documento"
          :danger="errors.has('step-1.codigo_tipo_documento')"
          :danger-text="errors.first('step-1.codigo_tipo_documento')"
          v-validate="'required'"
        />
      </div>
      <div class="col-md-6">
        <list-documents
          class="w-100"
          autocomplete
          label="Documento"
          name="codigo_documento"
          v-model="step.codigo_documento"
          :parent-value="step.codigo_tipo_documento"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <vs-input
          class="w-100"
          label="Nº Documento"
          name="numero_documento"
          :danger="errors.has('step-1.numero_documento')"
          :danger-text="errors.first('step-1.numero_documento')"
          v-validate="'required|email'"
          v-model="step.numero_documento"
        />
      </div>
      <div class="col-md-6">
        <label>Fecha Documento</label>
        <datepicker
          class="w-100"
          name="fecha_documento"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-textarea
          label="Materia (Mínimo 2 palabras, máximo 5000 caracteres)"
          name="texto_materia"
          width="100%"
          height="100px"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-select
          class="w-100"
          label="Etiquetas / Referencias del Documento"
          name="texto_etiquetas"
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
            <vs-radio vs-name="es_privado" vs-value="si">Si</vs-radio>
          </div>
          <div class="col-md-1">
            <vs-radio vs-name="es_privado" vs-value="no">No</vs-radio>
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
        codigo_tipo_documento: '',
        codigo_documento: '',
        numero_documento: ''
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
