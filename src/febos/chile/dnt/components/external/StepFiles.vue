<template>
  <form data-vv-scope="step-3">
    <div class="row mb-3">
      <div class="col-12">
        <h4>Adjuntar Documento</h4>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-9">
        <vs-input
          class="w-100"
          label="Documento Principal (Si piensa firmar electrónicamente no debe ser escaneado)"
          name="documentoPrincipal"
          v-validate="'required'"
          :danger="errors.has('step-3.documentoPrincipal')"
          :danger-text="errors.first('step-3.documentoPrincipal')"
          readonly
          v-model="mainFile.name"
        />
      </div>
      <div class="col-md-3 d-flex align-items-end">
        <UploadFile
          permission="*"
          text="Seleccionar"
          v-model="mainFile"
          upload-to="ed"
          button-class="btn-block"
          container-class="w-100"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-9">
        <vs-input
          class="w-100"
          label="Archivo Adjunto"
          name="nombre_documento_adjunto"
          readonly
        />
      </div>
      <div class="col-md-3 d-flex align-items-end">
        <vs-button class="btn-block" color="primary">
          Seleccionar
        </vs-button>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-divider />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <h4>Documentos Relacionados</h4>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <vs-select
          class="w-100"
          autocomplete
          label="Relacionado con"
          name="codigo_tipo_relacion_documento"
        >

        </vs-select>
      </div>
      <div class="col-md-6">
        <vs-input
          class="w-100"
          label="Nº Documento"
          name="numero_documento"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-table
          multiple
          v-model="relatedDocuments"
          no-data-text="No tienes documentos relacionados"
          :data="selectedRelatedDocuments"
        >
          <template slot="thead">
            <vs-th>Relacionado con</vs-th>
            <vs-th>Nº Documento</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
              <vs-td :data="data[indextr].destino">
                {{data[indextr].codigo_tipo_relacion_documento}}
              </vs-td>
              <vs-td :data="data[indextr].lista_destino">
                {{data[indextr].numero_documento}}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>
  </form>
</template>

<script>

import UploadFile from '@/febos/global/_vue/componentes/UploadFile';

export default {
  components: {
    UploadFile
  },
  data() {
    return {
      mainFile: {},
      relatedDocuments: [],
      selectedRelatedDocuments: [],
      documentoPrincipal: ''
    };
  },
  methods: {
    isValid() {
      return true;
    }
  }
};

</script>
