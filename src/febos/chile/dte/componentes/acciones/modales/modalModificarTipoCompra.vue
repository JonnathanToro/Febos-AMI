<template>
  <div>
    <div class="mt-5">
      <div>
        <h3></h3>
        <br />
        <label>Tipo de Compra</label>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-select v-model="tipo" :options="codigos_iva" @change="cargarSegundoSelect"/>
          </div>
        </div>
        <div style="height:60px">
          <div v-if="tipo !== null">
              <div v-if="tipo.code == 1">
                <label>Codigo IVA e Impuestos</label>
                  <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                      <vs-select v-model="datos.tipoTransaccionCompraCodIva" :options="code1" />
                    </div>
                  </div>
              </div>
              <div v-if="tipo.code == 2">
                <label>Codigo IVA e Impuestos</label>
                  <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                      <vs-select v-model="datos.tipoTransaccionCompraCodIva" :options="code2" />
                    </div>
                  </div>
              </div>
              <div v-if="tipo.code == 3">
                <label>Codigo IVA e Impuestos</label>
                  <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                      <vs-select v-model="datos.tipoTransaccionCompraCodIva" :options="code3" />
                    </div>
                  </div>
              </div>
              <div v-if="tipo.code == 4">
                <label>Codigo IVA e Impuestos</label>
                  <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                      <vs-select v-model="datos.tipoTransaccionCompraCodIva" :options="code4" />
                    </div>
                  </div>
              </div>
              <div v-if="tipo.code == 5">
                <label>Codigo IVA e Impuestos</label>
                  <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                      <vs-select v-model="datos.tipoTransaccionCompraCodIva" :options="code5" />
                    </div>
                  </div>
              </div>
              <div v-if="tipo.code == 6">
                <label>Codigo IVA e Impuestos</label>
                  <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                      <vs-select v-model="datos.tipoTransaccionCompraCodIva" :options="code6" />
                    </div>
                  </div>
              </div>
              <div v-if="tipo.code == 7">
                <label>Codigo IVA e Impuestos</label>
                  <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                      <vs-select v-model="datos.tipoTransaccionCompraCodIva" :options="code7" />
                    </div>
                  </div>
              </div>
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
  name: "modalModificarTipoCompra",
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  mounted() {
    console.log("DATA MODIFICAR TIPO COMPRA", this.getData);
    this.tipo = null;

    this.datos.febosId = this.getData.febosId;
    //this.datos.tipoTransaccionCompra = ""+this.tipo.code+"";
    this.codigos_iva.forEach(element => {
      if(element.code == parseInt(this.getData.tpoTranCompra)){
        this.tipo = element;
      }
    });



  },
  data() {
    return {
      codigos_iva: [
        {
          code: 1,
          label: 'Del Giro',
        },
        {
          code: 2,
          label: 'Supermercados',
        },
        {
          code: 3,
          label: 'Bien Raíz',
        },
        {
          code: 4,
          label: 'Activo Fijo',
        },
        {
          code: 5,
          label: 'IVA Uso Común',
        },
        {
          code: 6,
          label: 'Sin derecho',
        },
        {
          code: 7,
          label: 'No Inculir',
        }
      ],
      code1: [{ code: 1, label: '1. Del giro' }],
      code2: [{ code: 1, label: '1. Del giro' }, { code: 2, label: '2. Uso Común' }],
      code3: [{ code: 1, label: '1. Del giro' }, { code: 2, label: '2. Uso Común' }],
      code4: [{ code: 1, label: '1. Del giro' }, { code: 2, label: 'Uso Común' }],
      code5: [{ code: 2, label: '2. Uso Común' }],
      code6: [
        {
          code: 1,
          label: '1. Compras destinadas a IVA a generar operaciones no gravados o exentas'
        },
        {
          code: 2,
          label: '2. Facturas de proveedores registradas   fuera de plazo'
        },
        {
          code: 3,
          label: '3. Gastos rechazados'
        },
        {
          code: 4,
          label: '4. Entregas gratuitas recibidas'
        },
        {
          code: 9,
          label: '9. Otros'
        }
      ],
      code7: [{ code: 9, label: '9. Otros' }],
      tipo: null,
      datos: {
        febosId: null,
        tipoTransaccionVenta: 0,
        tipoTransaccionCompra: null,
        tipoTransaccionCompraCodIva: null
      },
      respuesta: null,
      temp: null
    };
  },
  methods: {
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
      //this.confirmaCierre();
      // this.alertaCierre();
    },
    saberTipocompraYCodigo() {

    },
    cargarSegundoSelect() {
      console.log("tipo 1er select: ",this.tipo);
    },
    async modificarTipoVenta() {
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" });

      //adjuntar objeto
      this.datos.febosId = this.getData.febosId;
      this.datos.tipoTransaccionCompra = this.tipo.code;
      console.log(this.datos.tipoTransaccionCompraCodIva.code);
      this.temp = this.datos.tipoTransaccionCompraCodIva;
      this.datos.tipoTransaccionCompraCodIva = this.datos.tipoTransaccionCompraCodIva.code;

      await clienteFebosAPI.put("/documentos/datos/transaccioncompraventa", this.datos).then((response) => {
        console.log(response.data);
        if(response.data.codigo == 10) {
          this.respuesta = true;
          this.datos.tipoTransaccionCompraCodIva = this.temp;
          this.$vs.loading.close();
        }else{
          this.respuesta = false;
          this.datos.tipoTransaccionCompraCodIva = this.temp;
          this.$vs.loading.close();
        }
        this.$vs.loading.close();
      }).catch(() => {
        this.respuesta = false;
        this.datos.tipoTransaccionCompraCodIva = this.temp;
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
