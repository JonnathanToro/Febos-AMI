<template>
<div>
  <div v-if="!conRegistros" style="text-align: center">
    Documento sin referencias
  </div>
  <div v-if="conRegistros">
    <vs-row>
      <vs-col :key="index" v-for="(col,index) in getData.referenciasTipoDte" vs-tooltip="Referencia documento tributario" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
        <vx-card :title="col.tipoDocumentoReferencia" subtitle="Referencia documento tributario" class="ml-1 mr-1">
          <vs-row>
            <vs-col vs-w="4">Nº</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.folioReferencia }}</vs-col>
            <vs-col vs-w="4">RUT Emisor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.rutEmisor }}</vs-col>
            <vs-col vs-w="4">Emisor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.razonSocialEmisor }}</vs-col>
            <vs-col vs-w="4">RUT Receptor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.rutReceptor }}</vs-col>
            <vs-col vs-w="4">Receptor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.razonSocialReceptor }}</vs-col>
          </vs-row>
        </vx-card>
      </vs-col>
      <vs-col :key="index" v-for="(col,index) in getData.referenciasTipoDnt" vs-tooltip="Referencia documento no tributario" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
        <vx-card :title="col.tipoDocumentoReferencia" subtitle="Referencia documento no tributario" class="ml-1 mr-1">
          <vs-row>
            <vs-col vs-w="4">Nº</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.folioReferencia }}</vs-col>
            <vs-col vs-w="4">RUT Emisor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.rutEmisor }}</vs-col>
            <vs-col vs-w="4">Emisor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.razonSocialEmisor }}</vs-col>
            <vs-col vs-w="4">RUT Receptor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.rutReceptor }}</vs-col>
            <vs-col vs-w="4">Receptor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.razonSocialReceptor }}</vs-col>
          </vs-row>
        </vx-card>
      </vs-col>
      <vs-col :key="index" v-for="(col,index) in getData.referenciadosTipoDte" vs-tooltip="Referenciado documento tributario" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
        <vx-card :title="col.tipoDocumentoReferencia" subtitle="Referenciado documento tributario" class="ml-1 mr-1">
          <vs-row>
            <vs-col vs-w="4">Nº</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.folioReferencia }}</vs-col>
            <vs-col vs-w="4">RUT Emisor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.rutEmisor }}</vs-col>
            <vs-col vs-w="4">Emisor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.razonSocialEmisor }}</vs-col>
            <vs-col vs-w="4">RUT Receptor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.rutReceptor }}</vs-col>
            <vs-col vs-w="4">Receptor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.razonSocialReceptor }}</vs-col>
          </vs-row>
        </vx-card>
      </vs-col>
      <vs-col :key="index" v-for="(col,index) in getData.referenciadosTipoDnt" vs-tooltip="Referenciado documento no tributario" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
        <vx-card :title="col.tipoDocumentoReferencia" subtitle="Referenciado documento no tributario" class="ml-1 mr-1">
          <vs-row>
            <vs-col vs-w="4">Nº</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.folioReferencia }}</vs-col>
            <vs-col vs-w="4">RUT Emisor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.rutEmisor }}</vs-col>
            <vs-col vs-w="4">Emisor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.razonSocialEmisor }}</vs-col>
            <vs-col vs-w="4">RUT Receptor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.rutReceptor }}</vs-col>
            <vs-col vs-w="4">Receptor</vs-col>
            <vs-col vs-w="8" style="font-weight: bolder">{{ col.razonSocialReceptor }}</vs-col>
          </vs-row>
        </vx-card>
      </vs-col>

    </vs-row>
  </div>
</div>
</template>

<script>
import modalStore from "@/store/modals/acciones";
import vSelect from "vue-select";

export default {
  name: "modalVerReferencias",
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
    conRegistros: {
      get() {
        return (modalStore.state.data.referenciadosTipoDnt.length > 0 ||
                modalStore.state.data.referenciadosTipoDte.length > 0 ||
                modalStore.state.data.referenciasTipoDnt.length > 0 ||
                modalStore.state.data.referenciasTipoDte.length > 0);
      }
    },
  },
  created() {
    this.datas = this.getData;
  },
  mounted() {
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
