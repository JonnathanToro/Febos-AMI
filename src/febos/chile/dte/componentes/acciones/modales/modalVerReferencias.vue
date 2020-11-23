<template>
<div>
  <div v-if="!conRegistros" style="text-align: center">
    Documento sin referencias
  </div>
  <div v-if="conRegistros">
    <h4>{{ titulo }}</h4>
    <h5 style="color: #aaaaaa;">{{ subtitulo }}</h5>
    <vs-tabs class="mt-4">
      <vs-tab label="Referencias a este documento">
        <vs-collapse>
          <vs-collapse-item open>
            <div slot="header">
              Documentos Tributarios Electrónicos (DTE)
            </div>
            <div v-if="getData.referenciadosTipoDte.length == 0" style="text-align: center; color: #dddddd">
              Sin documentos que hagan referencia a este documento
            </div>
            <div v-else>
              <vs-row style="border-bottom: 1px solid #555555;">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">Tipo documento</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">Folio</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">Fecha</vs-col>
              </vs-row>
              <vs-row v-for="(col,index) in getData.referenciadosTipoDte" :key="index" class="mt-2 mb-2">
                <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-w="5">{{ col.tipoDocumentoReferencia }}</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                  <a href="#">{{ col.folioReferencia }}</a>
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">{{ col.fechaReferencia }}</vs-col>
              </vs-row>
            </div>
          </vs-collapse-item>
          <vs-collapse-item open>
            <div slot="header">
              Otro tipo de documentos electrónicos
            </div>
            <div v-if="getData.referenciadosTipoDnt.length == 0" style="text-align: center; color: #dddddd">
              Sin documentos que hagan referencia a este documento
            </div>
            <div v-else>
              <vs-row style="border-bottom: 1px solid #555555;">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">Tipo documento</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">Folio</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">Fecha</vs-col>
              </vs-row>
              <vs-row v-for="(col,index) in getData.referenciadosTipoDnt" :key="index" class="mt-2 mb-2">
                <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-w="5">{{ col.tipoDocumentoReferencia }}</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                  <a href="#">{{ col.folioReferencia }}</a>
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">{{ col.fechaReferencia }}</vs-col>
              </vs-row>
            </div>
          </vs-collapse-item>
        </vs-collapse>
      </vs-tab>
      <vs-tab label="Referencias a otros documentos">
        <vs-collapse>
          <vs-collapse-item open>
            <div slot="header">
              Documentos Tributarios Electrónicos (DTE)
            </div>
            <div v-if="getData.referenciasTipoDte.length == 0" style="text-align: center; color: #dddddd">
              No hay referencias a otros documentos
            </div>
            <div v-else>
              <vs-row style="border-bottom: 1px solid #555555;">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">Tipo documento</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">Folio</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">Fecha</vs-col>
              </vs-row>
              <vs-row v-for="(col,index) in getData.referenciasTipoDte" :key="index" class="mt-2 mb-2">
                <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-w="5">{{ col.tipoDocumentoReferencia }}</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                  <a href="#">{{ col.folioReferencia }}</a>
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">{{ col.fechaReferencia }}</vs-col>
              </vs-row>
            </div>
          </vs-collapse-item>
          <vs-collapse-item open>
            <div slot="header">
              Documentos No Tributarios (DNT)
            </div>
            <div v-if="getData.referenciasTipoDnt.length == 0" style="text-align: center; color: #dddddd">
              No hay referencias a otros documentos
            </div>
            <div v-else>
              <vs-row style="border-bottom: 1px solid #555555;">
                <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-w="5">Tipo documento</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">Folio</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">Fecha</vs-col>
              </vs-row>
              <vs-row v-for="(col,index) in getData.referenciasTipoDnt" :key="index" class="mt-2 mb-2">
                <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-w="5">{{ col.tipoDocumentoReferencia }}</vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                  <a href="#">{{ col.folioReferencia }}</a>
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">{{ col.fechaReferencia }}</vs-col>
              </vs-row>
            </div>
          </vs-collapse-item>
        </vs-collapse>
      </vs-tab>
    </vs-tabs>







  </div>
</div>
</template>

<script>
import modalStore from "@/store/modals/acciones";
import vSelect from "vue-select";
import TiposDteMixin from "@/febos/chile/dte/mixins/TiposDteMixin";

export default {
  name: "modalVerReferencias",
  mixins: [ TiposDteMixin ],
  computed: {
    getData: {
      get() {
        return modalStore.state.data.referencias;
      },
    },
    getDocumento: {
      get() {
        return modalStore.state.data.documento;
      }
    },
    conRegistros: {
      get() {
        return (modalStore.state.data.referencias.referenciadosTipoDnt.length > 0 ||
                modalStore.state.data.referencias.referenciadosTipoDte.length > 0 ||
                modalStore.state.data.referencias.referenciasTipoDnt.length > 0 ||
                modalStore.state.data.referencias.referenciasTipoDte.length > 0);
      }
    },
    subtitulo: {
      get() {
        console.log(this.getDocumento);
        return "Emitida a " + this.getDocumento.razonSocialReceptor + ", RUT " + this.getDocumento.rutReceptor;
      }
    },
    titulo: {
      get() {
        return this.traducitTipoDocumentoEnPalabras(this.getDocumento.tipoDocumento) + " Nº " + this.getDocumento.folio;
      }
    },
  },
  created() {
    this.datas = this.getData;
  },
  mounted() {
    console.log(this.getData);
  },
  data() {
    return {
      datas: {}
    };
  },
  methods: {
    cancelarCierre() {
      modalStore.commit("ocultarBitacoraFull");
    },
  },
  components: {
    "v-select": vSelect,
  },
};
</script>

<style>
</style>
