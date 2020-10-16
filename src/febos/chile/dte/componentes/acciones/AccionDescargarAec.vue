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
  name: "AccionDescargarAec",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "get_app",
      nombre: "Descargar AEC",
      permiso: "DTE01"
    };
  },
  methods: {
    ejecutarAccion() {
      console.log("EJECUTANDO DESCARGAR AEC", this.documento);
      modalStore.commit("mostrarLoading");
      const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalDescargarAec.vue`);
      //cambiar lo de bitacora
      clienteFebosAPI.get("/sii/dte/cesion/" + this.documento.febosId + "/&incrustar=no").then((response) => {
      modalStore.commit("setTitulo", " ");
      modalStore.commit("mostrarBitacora", modalComponente);
      modalStore.commit("setData", response.data);
      
      setTimeout(()=> {
        modalStore.commit("ocultarBitacora");
        window.open(response.data.urlArchivoDescargado);
      }, 2000);

      }).catch(() => {
      })

    },
    desplegar() {
      return this.esAccionAplicable() && this._tienePermiso(this.permiso);
    },
    esAccionAplicable() {
      return this.documento.rutCesionario;
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
