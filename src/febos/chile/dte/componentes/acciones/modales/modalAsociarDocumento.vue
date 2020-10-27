<template>
  <div align="center">
    <h3>Referencias a este documento</h3>
    <span>{{ traducitTipoDocumentoEnPalabras(getData.tipoDocumento) }} #{{getData.folio}}</span>
    <br>
    <br>
    <br>
    <div align="center" v-if="datas">
    <vs-table>
      <template slot="thead">
        <vs-th>Numero</vs-th>
        <vs-th>Tipo</vs-th>
        <vs-th>Folio</vs-th>
        <vs-th>Fecha</vs-th>
        <vs-th>Observaciones</vs-th>
        <vs-th>Acciones</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].tipoDocumentoReferencia">{{ data[indextr].tipoDocumentoReferencia }}</vs-td>
          <vs-td :data="data[indextr].folioReferencia">{{ data[indextr].folioReferencia }}</vs-td>
          <vs-td :data="data[indextr].tipoDocumentoReferencia">{{ data[indextr].tipoDocumentoReferencia }}</vs-td>
          <vs-td :data="data[indextr].tipoDocumentoReferencia">{{ data[indextr].tipoDocumentoReferencia }}</vs-td>
          <vs-td :data="data[indextr].tipoDocumentoReferencia">{{ data[indextr].tipoDocumentoReferencia }}</vs-td>
          <div v-if="data[indextr].fechaReferencia">
            <vs-td :data="data[indextr].fechaReferencia">{{ data[indextr].fechaReferencia }}</vs-td>
          </div>
          <div v-else>
            <vs-td>No disponible</vs-td>
          </div>
        </vs-tr>
      </template>
    </vs-table>
  </div>
  <div v-else>
    <vs-table noDataText="No existen registros asociados">
      <template slot="thead" >
        <vs-th>Numero</vs-th>
        <vs-th>Tipo</vs-th>
        <vs-th>Folio</vs-th>
        <vs-th>Fecha</vs-th>
        <vs-th>Observaciones</vs-th>
        <vs-th>Acciones</vs-th>
      </template>
        <vs-tr>
          <vs-td></vs-td>
        </vs-tr>
      <template>

      </template>
    </vs-table>

  </div>
  </div>
</template>


<script>
import modalStore from "@/store/modals/acciones";
import vSelect from "vue-select";
import TiposDteMixin from "../../../mixins/TiposDteMixin";

export default {
  name: "modalAsociarDocumento",
  mixins: [TiposDteMixin],
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  data() {
    return {
      datas: null
    };
  },
  mounted() {

  },
  methods: {
    cerrarVentana() {
      modalStore.commit("ocultarBitacoraFull");
    }
  },
  components: {
    "v-select": vSelect,
  },
};
</script>

<style>
.ajuste_dialogo {
  text-align: center;
}
[dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
    padding: -0.25rem 2rem;
    margin: 10px;
}
</style>
