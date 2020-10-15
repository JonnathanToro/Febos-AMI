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
  name: "AccionCopiarDocumento",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "library_add",
      nombre: "Copiar Documento",
      permiso: "DTE09"
    };
  },
  methods: {
      ejecutarAccion(){
        console.log("EJECUTANDO COPIAR DOCUMENTO ",this.documento);
        modalStore.commit("mostrarLoading");
        const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalCopiarDocumento.vue`);
        clienteFebosAPI.get("/documentos/" + this.documento.febosId + "/bitacora?pagina=1&filas=15").then((response) => {
          modalStore.commit("setTitulo", "Copiar Documento");
          modalStore.commit("mostrarBitacora", modalComponente);
          modalStore.commit("setData", response.data);
          console.log(response);

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
