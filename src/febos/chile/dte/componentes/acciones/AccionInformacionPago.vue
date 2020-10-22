<template>
  <vs-dropdown-item
    class="menu-accion"
    v-if="desplegar()"
    v-on:click.native="ejecutarAccion()"
  >
    <div class="icono">
      <vs-icon :icon="icono" size="small"></vs-icon>
    </div>
    <div class="accion">
      {{ nombre }}
    </div>
  </vs-dropdown-item>
</template>

<script>
import PermisoAccionMixin from "../../mixins/PermisoAccionMixin";
import modalStore from "../../../../../store/modals/acciones";
import clienteFebosAPI from "../../../../servicios/clienteFebosAPI";

export default {
  name: "AccionInformacionPago",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "attach_money",
      nombre: "Información de Pago",
      permiso: "DTE18"
    };
  },
  methods: {
    ejecutarAccion() {
      console.log("EJECUTANDO INFORMACIONPAGO", this.documento);
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" })
      const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalInformacionPago.vue`);
       clienteFebosAPI.get("/documentos/" + this.documento.febosId + "/pagos").then((response) => {
        modalStore.commit("setTitulo", "Información Pago Documento N°"+this.documento.folio);
        modalStore.commit("mostrarBitacora", modalComponente);
        response.data.febosId = this.documento.febosId;
        modalStore.commit("setData", response.data);
        console.log(response);
        this.$vs.loading.close();
        }).catch(() => {
       })
    },
    desplegar() {
      return this.esAccionAplicable() && this._tienePermiso(this.permiso);
    },
    esAccionAplicable() {
      return true;
    }
  }
};
</script>

<style scoped>
.menu-accion {
  vertical-align: middle;
  width: 250px !important;
}
.icono,
.accion {
  vertical-align: top;
  display: inline-flex;
}
.menu-accion .icono {
  margin-right: 5px;
}
</style>
