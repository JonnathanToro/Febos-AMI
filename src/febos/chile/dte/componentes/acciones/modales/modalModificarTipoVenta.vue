<template>
  <div>
    <div class="mt-5">
      <div>
        <h3></h3>
        <br />
        <label for>Tipo de Venta</label>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <v-select v-model="tipo" :options="tipo_de_venta" />
          </div>
        </div>
      </div>
      <br />
    </div>
<!--    <br />-->
<!--    <div class="margin-bot">-->
<!--        <vs-alert title="Alerta" class="mensaje" :active="respuesta" color="success">-->
<!--          Modificación realizada correctamente-->
<!--          <br>-->
<!--        </vs-alert>-->
<!--        <vs-alert title="Alerta"  :active="respuesta == false" color="danger">-->
<!--          Error al realizar la operación, reintente o contacte a soporte-->
<!--          <br>-->
<!--        </vs-alert>-->
<!--    </div>-->
    <div align="right">
      <div style="text-align: right">
        <vs-button color="primary" type="filled" v-on:click="modificarTipoVenta()">Modificar</vs-button>
<!--        <vs-button color="primary" type="border" v-on:click="cerrarVentana">No, me arrepenti</vs-button>-->
      </div>
    </div>
  </div>
</template>

<script>
import modalStore from "@/store/modals/acciones";
import vSelect from "vue-select";
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";


export default {
  name: "modalModificarTipoVenta",
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  mounted() {
    //this.tipo = parseInt(this.getData.tpoTraVenta);
    this.tipo_de_venta.forEach(element => {
      if(element.code == parseInt(this.getData.tpoTraVenta)){
        this.tipo = element;
      }
    });
    this.datos.febosId = this.getData.febosId;
    this.datos.tipoTransaccionVenta = ""+this.tipo.code+"";
  },
  data() {
    return {
      tipo_de_venta:[
        { code: 0, label: "Activo fijo" },
        { code: 1, label: "Bien raíz" },
        { code: 2, label: "Del giro" },
        //{ code: 3, label: "Iva uso común" },
        //{ code: 4, label: "No incluir" },
        //{ code: 5, label: "Sin derecho" },
        //{ code: 6, label: "Supermercado" },
      ],
      tipo: null,
      datos: {
        febosId: null,
        tipoTransaccionVenta: null,
        tipoTransaccionCompra: 0
      },
      respuesta: null
    };
  },
  methods: {
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
    },
    modificarTipoVenta() {
      this.$vs.loading({ color: "#000000", text: "Espera un momento por favor" });
      this.datos.febosId = this.getData.febosId;
      this.datos.tipoTransaccionVenta = this.tipo.code;

      clienteFebosAPI.put("/documentos/datos/transaccioncompraventa", this.datos).then((response) => {
        this.$vs.loading.close();
        if(response.data.codigo == 10) {
          this.updateDTEs();
          this.$vs.notify({
            color: 'success', title: 'Modificar Tipo Venta', text: 'Tipo de venta actualizada'
          });
          this.cerrarVentana();
        }else{
          this.$vs.notify({
            color: "danger", title: "Modificar Tipo Venta", text: response.data.mensaje + "<br/><b>Seguimiento: </b>" + response.data.seguimientoId, time: 10000
          });
        }
      }).catch(() => {
        this.$vs.notify({
          color: "danger", title: "Modificar Tipo Venta", text: "No fue posible modificar el tipo de compra", time: 10000
        });
        this.$vs.loading.close();
      });
    },
    updateDTEs()  {
      var data = JSON.parse(
        localStorage.getItem(
          `${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`
        )
      );
      data.Dtes.documentos.forEach(element => {
        if (element.febosId == this.datos.febosId) {
          element.tpoTraVenta = this.datos.tipoTransaccionVenta;
        }
      });
      localStorage.setItem(`${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`, JSON.stringify(data));
    }
  },
  components: {
    "v-select": vSelect,
  },
};
</script>

<style>
.con-vs-popup .vs-popup {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  z-index: 100;
  width: 35%;
  margin: 10px;
  max-width: calc(100% - 30px);
  max-height: calc(100% - 30px);
  border-radius: 6px;
  -webkit-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  -webkit-animation: rebound 0.3s;
  animation: rebound 0.3s;
}
.vs-input--input {
  color: inherit;
  position: relative;
  padding: 0.4rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  width: 100%;
}
.is-label-placeholder {
  width: 100%;
}
[dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
  padding: -0.25rem 2rem;
  margin: 10px;
}
</style>
