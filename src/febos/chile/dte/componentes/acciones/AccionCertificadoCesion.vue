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
import clienteFebosAPI from "../../../../servicios/clienteFebosAPI";
import modalStore from "../../../../../store/modals/acciones";

export default {
  name: "AccionCertificadoCesion",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "description",
      nombre: "Certificado de Cesión",
      permiso: "SII27"
    };
  },
  methods: {
    ejecutarAccion() {
      console.log("EJECUTANDO DESCARGAR CESION", this.documento);
      this.$vs.loading({ color: "#ff8000", text: "Espera un momento por favor" })
      const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalCertificadoCesion.vue`);
      //cambiar lo de bitacora
      clienteFebosAPI.get("/sii/dte/cesion/consulta").then((response) => {

      if(response.data.imagenLink) {
        window.open(response.data.imagenLink);
      }else{
        modalStore.commit("setTitulo", "Certificado de Cesión");
        modalStore.commit("mostrarBitacora", modalComponente);
        modalStore.commit("setData", response.data);
      }
      this.$vs.loading.close();

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
