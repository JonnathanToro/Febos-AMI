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
  name: "AccionEnviarAprobacion",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "call_split",
      nombre: "Enviar a aprobación",
      permiso: "DTE21"
    };
  },
  methods: {
    ejecutarAccion() {
      const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalEnviarAprobacion.vue`);
      modalStore.commit("setTitulo", "Información del flujo");
      modalStore.commit("mostrarBitacora", modalComponente);
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
