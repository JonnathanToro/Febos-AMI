<template>
  <vs-dropdown-item
    class="menu-accion"
    v-if="desplegar()"
    v-on:click.native="ejecutarAccion()"
  >
    <div class="icono">
      <vs-icon :icon="localAccion.icono" size="small"></vs-icon>
    </div>
    <div class="accion">
      {{ localAccion.nombre }}
    </div>
  </vs-dropdown-item>
</template>

<script>
import PermisoAccionMixin from "../../mixins/PermisoAccionMixin";
import ConfiguracionAcciones from "./ConfiguracionAcciones";

export default {
  name: "AccionDescargarPdf",
  mixins: [PermisoAccionMixin, ConfiguracionAcciones],
  props: {
    accion: {
      type: String
    },
    documento: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    localAccion: {
      get() {
        return this.acciones.find(acc => acc.accion == this.accion);
      },
      set() {}
    }
  },
  methods: {
    ejecutarAccion() {
      console.log("ejecutar accion ..... externa ..... ");
      this.localAccion.ejecutar();
    },
    desplegar() {
      return (
        this.localAccion.esAplicable &&
        this._tienePermiso(this.localAccion.permiso)
      );
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
