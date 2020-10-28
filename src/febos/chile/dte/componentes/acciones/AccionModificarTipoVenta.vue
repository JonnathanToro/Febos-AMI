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
export default {
  name: "AccionModificarTipoVenta",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "edit",
      nombre: "Modificar Tipo Venta",
      permiso: "DTE28"
    };
  },
  methods: {
    ejecutarAccion() {
      modalStore.commit("mostrarLoading");
      const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalModificarTipoVenta.vue`);
        modalStore.commit("setTitulo", "Modificar Tipo de Venta");
        modalStore.commit("mostrarBitacora", modalComponente);
        modalStore.commit("febosId", this.documento.febosId);
        modalStore.commit("setData", this.documento);
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
