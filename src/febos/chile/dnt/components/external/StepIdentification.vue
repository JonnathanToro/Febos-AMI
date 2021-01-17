<template>
  <form>
    <div class="row mb-3">
      <div class="col-md-4">
        <vs-select
          class="w-100"
          autocomplete
          label="Tipo Documento"
          name="codigo_tipo_documento"
        >

        </vs-select>
      </div>
      <div class="col-md-4">
        <vs-input
          class="w-100"
          label="Nº Documento"
          name="numero_documento"
          :danger="true"
          danger-text="Error"
        />
      </div>
      <div class="col-md-4">
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

export default {
  components: {
    Datepicker
  },
  methods: {
    isValid() {
      return true;
    }
  }
};

</script>
