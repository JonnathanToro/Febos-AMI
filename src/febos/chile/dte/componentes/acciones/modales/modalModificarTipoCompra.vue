<template>
  <div style="width: 100%; min-height: 260px">
    <form data-vv-scope="perfilEmpresa" style="width: 100%; margin-top: 30px;">

      <vs-row>
        <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-w="12">Tipo de Compra</vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-select v-model="selectedCompra" :options="codigos" style="width: 100%;" />
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-w="12" style="margin-top: 10px;">Código IVA e impuestos</vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-select v-model="selectedCodigoIVA" :options="codigoIVA" required style="width: 100%;" />
        </vs-col>
      </vs-row>
      <div>
        <div style="text-align: right; margin-top: 50px;">
          <vs-button color="primary" type="filled" v-on:click="modificarTipoCompra()">Modificar</vs-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import modalStore from "@/store/modals/acciones";
import vSelect from "vue-select";
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";


export default {
  name: "modalModificarTipoCompra",
  components: {
    "vs-select": vSelect,
  },
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
    selectedCompra:  {
      get() {
        const selected = this.codigos.find(elemento => elemento.code == this.compra.tipoTransaccionCompra);
        if (selected === undefined) return null;
        return selected;
      },
      set(val)  {
        this.compra.tipoTransaccionCompraCodIva = null;
        this.compra.tipoTransaccionCompra = val.code;
      }
    },
    selectedCodigoIVA:  {
      get() {
        const selected = this.codigoIVA.find(elemento => elemento.code == this.compra.tipoTransaccionCompraCodIva);
        if (selected === undefined) return null;
        return selected;
      },
      set(val)  {
        this.compra.tipoTransaccionCompraCodIva = val.code;
      }
    },
    codigoIVA: {
      get() {
        console.log(this.compra.tipoTransaccionCompra);
        switch (this.compra.tipoTransaccionCompra) {
          case 1:
            return this.code1;
          case 2:
            return this.code2;
          case 3:
            return this.code3;
          case 4:
            return this.code4;
          case 5:
            return this.code5;
          case 6:
            return this.code6;
          case 7:
            return this.code7;
        }
        return [];
      }
    }
  },
  data: function () {
    return {
      codigos: [
        { code: 1, label: 'Del Giro' },
        { code: 2, label: 'Supermercados' },
        { code: 3, label: 'Bien Raíz' },
        { code: 4, label: 'Activo Fijo' },
        { code: 5, label: 'IVA Uso Común' },
        { code: 6, label: 'Sin derecho' },
        { code: 7, label: 'No Inculir' }
      ],
      code1: [{code: 1, label: '1. Del giro'}],
      code2: [{code: 1, label: '1. Del giro'}, {code: 2, label: '2. Uso Común'}],
      code3: [{code: 1, label: '1. Del giro'}, {code: 2, label: '2. Uso Común'}],
      code4: [{code: 1, label: '1. Del giro'}, {code: 2, label: 'Uso Común'}],
      code5: [{code: 2, label: '2. Uso Común'}],
      code6: [
        { code: 1, label: '1. Compras destinadas a IVA a generar operaciones no gravados o exentas' },
        { code: 2, label: '2. Facturas de proveedores registradas   fuera de plazo' },
        { code: 3, label: '3. Gastos rechazados' },
        { code: 4, label: '4. Entregas gratuitas recibidas' },
        { code: 9, label: '9. Otros' }
      ],
      code7: [{code: 9, label: '9. Otros'}],
      compra: {
        febosId: null,
        tipoTransaccionVenta: 0,
        tipoTransaccionCompra: null,
        tipoTransaccionCompraCodIva: null
      },


    };
  },
  mounted() {
    console.log("DATA MODIFICAR TIPO COMPRA", this.getData);
    this.compra.febosId = this.getData.febosId;
    this.compra.tipoTransaccionCompra = this.getData.tpoTranCompra;
    this.compra.tipoTransaccionCompraCodIva = this.getData.tpoTranCompraCodIva;

  },
  methods: {
    modificarTipoCompra() {
      if (!this.compra.tipoTransaccionCompra || !this.compra.tipoTransaccionCompraCodIva) {
        this.$vs.notify({
          color: 'danger', title: 'Modificar Tipo Compra', text: 'Debe seleccionar tipo y código SII'
        });
        return false;
      }
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" });
      clienteFebosAPI.put("/documentos/datos/transaccioncompraventa", this.compra).then((response) => {
        this.$vs.loading.close();
        if(response.data.codigo == 10) {
          this.updateDTEs();
          this.$vs.notify({
            color: 'success', title: 'Modificar Tipo Compra', text: 'Tipo de compra actualizada'
          });
          this.cerrarVentana();
        }else{
          this.$vs.notify({
            color: "danger", title: "Modificar Tipo Compra", text: response.data.mensaje + "<br/><b>Seguimiento: </b>" + response.data.seguimientoId, fixed: true
          });
        }
        this.$vs.loading.close();
      }).catch(() => {
        this.$vs.notify({
          color: "danger", title: "Modificar Tipo Compra", text: "No fue posible modificar el tipo de compra"
        });
        this.$vs.loading.close();
      });
    },
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
    },
    updateDTEs()  {
      var data = JSON.parse(
        localStorage.getItem(
          `${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`
        )
      );
      data.Dtes.documentos.forEach(element => {
        if (element.febosId == this.compra.febosId) {
          element.tpoTranCompra = this.compra.tipoTransaccionCompra;
          element.tpoTranCompraCodIva = this.compra.tipoTransaccionCompraCodIva;
        }
      });
      localStorage.setItem(`${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`, JSON.stringify(data));
    }
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
