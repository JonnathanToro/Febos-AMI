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
//import clienteFebosAPI from "../../../../servicios/clienteFebosAPI";
import modalStore from "../../../../../store/modals/acciones";
export default {
  name: "AccionEnviarDte",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "email",
      nombre: "Enviar DTE",
      permiso: "DTE21"
    };
  },
  methods: {
    ejecutarAccion() {
      console.log("EJECUTANDO ENVIARDTE", this.documento);
      const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalEnviarDte.vue`);
      modalStore.commit("setTitulo", "Enviar DTE Documento N°"+this.documento.folio);
      modalStore.commit("mostrarBitacora", modalComponente);
      modalStore.commit("setData", this.documento);
      /*clienteFebosAPI.post("/documentos/" + this.documento.febosId + "/envio").then((response) => {
        modalStore.commit("setTitulo", "Enviar DTE");
        modalStore.commit("mostrarBitacora", modalComponente);
        modalStore.commit("setData", response.data);
        console.log(response);

        }).catch(() => {
        })*/
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
