<template>
  <div>
    <div class="mt-5">
      <div>
        <h3></h3>
        <br />
        <label for>Tipo de Compra</label>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-select :value="tipo" :options="codigos_iva" @input="cargarSegundoSelect()">
              <!--<vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in codigos_iva" />-->
            </vs-select>
          </div>
        </div>
      </div>
      <br />
    </div>
    <br />
    <div class="margin-bot">
        <vs-alert title="Alerta" class="mensaje" :active="respuesta" color="success">
          Modificación realizada correctamente
          <br>
        </vs-alert>
        <vs-alert title="Alerta"  :active="respuesta == false" color="danger">
          Error al realizar la operación, reintente o contacte a soporte
          <br>
        </vs-alert>
    </div>
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
    this.tipo = null;

    this.datos.febosId = this.getData.febosId;
    //this.datos.tipoTransaccionCompra = ""+this.tipo.code+"";
  },
  data() {
    return {
      codigos_iva: [
        {
          value: 1,
          label: 'Del Giro',
          cod_iva: [{ value: 1, label: '1. Del giro' }]
        },
        {
          value: 2,
          label: 'Supermercados',
          cod_iva: [{ value: 1, label: '1. Del giro' }, { value: 2, label: '2. Uso Común' }]
        },
        {
          value: 3,
          label: 'Bien Raíz',
          cod_iva: [{ value: 1, label: '1. Del giro' }, { value: 2, label: '2. Uso Común' }]
        },
        {
          value: 4,
          label: 'Activo Fijo',
          cod_iva: [{ value: 1, label: '1. Del giro' }, { valor: 2, label: 'Uso Común' }]
        },
        {
          value: 5,
          label: 'IVA Uso Común',
          cod_iva: [{ value: 2, label: '2. Uso Común' }]
        },
        {
          value: 6,
          label: 'Sin derecho',
          cod_iva: [
            {
              value: 1,
              label: '1. Compras destinadas a IVA a generar operaciones no gravados o exentas'
            },
            {
              value: 2,
              label: '2. Facturas de proveedores registradas   fuera de plazo'
            },
            {
              value: 3,
              label: '3. Gastos rechazados'
            },
            {
              value: 4,
              label: '4. Entregas gratuitas recibidas'
            },
            {
              value: 9,
              label: '9. Otros'
            }
          ]
        },
        {
          value: 7,
          label: 'No Inculir',
          cod_iva: [{ value: 9, label: '9. Otros' }]
        }
      ],
      tipo: null,
      datos: {
        febosId: null,
        tipoTransaccionVenta: 0,
        tipoTransaccionCompra: null,
        tipoTransaccionCompraCodIva: null
      },
      respuesta: null
    };
  },
  methods: {
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
      //this.confirmaCierre();
      // this.alertaCierre();
    },
    cargarSegundoSelect(value) {
      console.log("tipo 1er select: ",value);
    },
    modificarTipoVenta() {
      this.$vs.loading({ color: "#ff8000", text: "Espera un momento por favor" });

      //adjuntar objeto
      this.datos.febosId = this.getData.febosId;
      this.datos.tipoTransaccionVenta = this.tipo.code;
          //tipoTransaccionCompra: 0

      clienteFebosAPI.put("/documentos/datos/transaccioncompraventa", this.datos).then((response) => {
        console.log(response.data);
        if(response.data.codigo == 10) {
          this.respuesta = true;
          this.$vs.loading.close();
        }else{
          this.respuesta = false;
          this.$vs.loading.close();
        }
        this.$vs.loading.close();
      }).catch(() => {
        this.respuesta = false;
        this.$vs.loading.close();
      });
    }
  },
  components: {
    "vs-select": vSelect,
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
