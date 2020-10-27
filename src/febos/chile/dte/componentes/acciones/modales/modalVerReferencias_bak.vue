<template>
<div>
  <div v-if="!conRegistros" style="text-align: center">
    Documento sin referencias
  </div>
  <div v-if="conRegistros">
    <div class="mt-5">
      <vs-tabs alignment="center">
        <!--<vs-tab label="Referencias hacia este documento">-->
          <vs-tab label="Referencias a este documento">
          <div>
            <vs-collapse>
              <vs-collapse-item :open="true">
                <div slot="header" align="center">
                  <h4>Documentos Tributarios Electronicos (DTE)</h4>
                </div>
                <div align="center" v-if="datas.referenciasTipoDte.length > 0">
                  <vs-table :data="datas.referenciasTipoDte">
                    <template slot="thead">
                      <vs-th>Tipo</vs-th>
                      <vs-th>Folio</vs-th>
                      <vs-th>Fecha</vs-th>
                    </template>
                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="data[indextr].tipoDocumentoReferencia">{{ data[indextr].tipoDocumentoReferencia }}</vs-td>

                        <vs-td :data="data[indextr].folioReferencia">{{ data[indextr].folioReferencia }}</vs-td>

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
                  <span align="center">No existen registros asociados</span>
                </div>
              </vs-collapse-item>

              <vs-collapse-item :open="true">
                <div slot="header" align="center">
                  <h4>Documentos No Tributarios (DNT)</h4>
                </div>
                <div v-if="datas.referenciadosTipoDte.length > 0">
                  <vs-table :data="datas.referenciasTipoDnt">
                    <template slot="thead">
                      <vs-th>Tipo</vs-th>
                      <vs-th>Folio</vs-th>
                      <vs-th>Fecha</vs-th>
                    </template>
                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="data[indextr].tipoDocumentoReferencia">{{ data[indextr].tipoDocumentoReferencia }}</vs-td>

                        <vs-td :data="data[indextr].folioReferencia">{{ data[indextr].folioReferencia }}</vs-td>

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
                  <span align="center">No existen registros asociados</span>
                </div>
              </vs-collapse-item>
            </vs-collapse>

          </div>
        </vs-tab>

        <!--<vs-tab label="Referencias a otros documentos">-->
        <vs-tab label="Referencias en este documento">
          <div>
            <vs-collapse>
              <vs-collapse-item :open="true">
                <div slot="header" align="center">
                  <h4>Documentos tributarios electronicos (DTE)</h4>
                </div>
                <div v-if="datas.referenciadosTipoDte.length > 0">
                  <vs-table :data="datas.referenciadosTipoDte">
                    <template slot="thead">
                      <vs-th>Tipo</vs-th>
                      <vs-th>Folio</vs-th>
                      <vs-th>Fecha</vs-th>
                    </template>
                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="data[indextr].tipoDocumentoReferencia">{{ data[indextr].tipoDocumentoReferencia }}</vs-td>

                        <vs-td :data="data[indextr].folioReferencia">{{ data[indextr].folioReferencia }}</vs-td>

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
                  <span align="center">No existen registros asociados</span>
                </div>
              </vs-collapse-item>
            </vs-collapse>

            <vs-collapse>
              <vs-collapse-item :open="true">
                <div slot="header" align="center">
                  <center><h4>Documentos No Tributarios (DNT)</h4></center>
                </div>
                <div v-if="datas.referenciadosTipoDnt.length > 0">
                  <vs-table :data="datas.referenciadosTipoDnt">
                    <template slot="thead">
                      <vs-th>Tipo</vs-th>
                      <vs-th>Folio</vs-th>
                      <vs-th>Fecha</vs-th>
                    </template>
                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="data[indextr].tipoDocumentoReferencia">{{ data[indextr].tipoDocumentoReferencia }}</vs-td>

                        <vs-td :data="data[indextr].folioReferencia">{{ data[indextr].folioReferencia }}</vs-td>

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
                  <span align="center">No existen registros asociados</span>
                </div>
              </vs-collapse-item>
            </vs-collapse>
          </div>
        </vs-tab>
      </vs-tabs>
      <div align="right">
        <vs-button color="primary" type="filled" v-on:click="cancelarCierre">Cerrar</vs-button>
      </div>
    </div>
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
    }
  },
  created() {
    this.datas = this.getData;
  },
  mounted() {

    console.log("DATA COMPLETA: ", this.datas);
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
