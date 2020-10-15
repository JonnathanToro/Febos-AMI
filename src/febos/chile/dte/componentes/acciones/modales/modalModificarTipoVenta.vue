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
    <br />
    <div align="right">
      <div>
        <vs-button color="primary" type="filled" v-on:click="modificarTipoVenta()">Si, Modificalo</vs-button>
        <vs-button color="primary" type="border" v-on:click="cerrarVentana">No, me arrepenti</vs-button>
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
    console.log("DATA MODIFICAR TIPO VENTA", this.getData);
    //this.tipo = parseInt(this.getData.tpoTraVenta);
    this.tipo_de_venta.forEach(element => {
      if(element.code == parseInt(this.getData.tpoTraVenta)){
        this.tipo = element;
      }
    });
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
      datos: Object
    };
  },
  methods: {
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
      //this.confirmaCierre();
      // this.alertaCierre();
    },
    modificarTipoVenta() {
      this.$vs.loading({ color: "#ff8000", text: "Espera un momento por favor" });

      //adjuntar objeto
      this.datos.febosId = this.getData.febosId;
      this.datos.tipoTransaccionVenta = this.tipo;
          //tipoTransaccionCompra: 0

      clienteFebosAPI.put("/documentos/datos/transaccioncompraventa", this.datos).then((response) => {
        console.log(response.data);
        this.$vs.loading.close();
      });
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
