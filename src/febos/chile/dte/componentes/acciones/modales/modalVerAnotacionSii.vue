<template>
  <div>
    <div  v-if="datos == null" class="margen-inferior">
      <h3>Consultar anotaciones en el Sii del documento</h3>
      <h5>Factura afecta electronica</h5>
      <br />
      <br />
      <p>
        Este proceso podría tardar mas de lo esperado, ya que se consulta directamente
        en el servicio de impuestos internos.
      </p>
      <br>
      <p>¿Desea Continuar?</p>
      <br style="width: 100%;">
      <vs-button @click="consultarSii" type="filled" color="primary" style="margin-right: 15px;">Si, adelante</vs-button>
      <vs-button @click="cancelarCierre" type="border" color="primary">No, en otro momento</vs-button>
    </div>

    <!-- TABLA DE RESPUESTA SII -->
      <div v-else>
        <div slot="header" align="center">
          <h4>Anotaciones SII Documento #{{ getData.folio }}</h4>
        </div>
        <div align="center" v-if="datas.referenciasTipoDte.length > 0">
          <vs-table :data="datas.referenciasTipoDte">
            <template slot="thead">
              <vs-th>Estado</vs-th>
              <vs-th>Número</vs-th>
              <vs-th>Nombre</vs-th>
              <vs-th>Fecha Emisión</vs-th>
            </template>
            <template slot-scope="{datos}">
              <vs-tr :key="indextr" v-for="(tr, indextr) in datos">
                <vs-td :data="datos[indextr].estado">
                  <div v-if="datos[indextr].estado == 1">
                    Creado
                  </div>
                  <div v-if="datos[indextr].estado == 2">
                    En Aprobación
                  </div>
                  <div v-if="datos[indextr].estado == 10">
                    Aprobado
                  </div>
                  <div v-if="datos[indextr].estado == 9">
                    Rechazado
                  </div>
                </vs-td>
                <vs-td :data="datos[indextr].numero">
                  {{datos[indextr].numero}}
                </vs-td>
                <vs-td :data="datos[indextr].nombreDescriptivo">
                  {{datos[indextr].nombreDescriptivo}}
                </vs-td>
                <vs-td :data="datos[indextr].fechaEmision">
                  {{datos[indextr].fechaEmision}}
                </vs-td>
              </vs-tr>
              </template>
            </vs-table>
          </div>
          <div v-else>
            <span align="center">No existen registros asociados</span>
          </div>
      </div>

    <!-- ALERTAS DE RESPUESTA SII -->
    <div v-if="error" align="center">
      <vs-alert title="Alerta" class="mensaje" :active="error" color="danger">
        Error al realizar la operación, reintente o contacte a soporte
      </vs-alert>
    </div>
  </div>
</template>

<script>
import modalStore from "@/store/modals/acciones";
import clienteFebosAPI from "../../../../../servicios/clienteFebosAPI";

export default {
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  data() {
    return {
      error: false,
      datos: null
    }
  },
  methods: {
    cancelarCierre() {
      modalStore.commit("ocultarBitacora");
    },
    consultarSii() {
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" });
      clienteFebosAPI.get("/sii/dte/eventos", {febosId: this.getData.febosId}).then((response) => {
        if(response.data !== 10) {
          this.error = true;
          console.log("RESPUESTA NEGATIVA ANOTACIONES: ", response);
          this.$vs.loading.close();
        }else{
          this.error = false;
          this.datos = response.data
          console.log("RESPUESTA POSITIVA ANOTACIONES: ", response);
          this.$vs.loading.close();
        }
      }).catch((err) => {
        console.log("ERROR DE ANOTACIONES: ",err);
      })
    }
  },
};
</script>
<style>
  .margen-inferior {
    margin-bottom: 15px;
  }
</style>
