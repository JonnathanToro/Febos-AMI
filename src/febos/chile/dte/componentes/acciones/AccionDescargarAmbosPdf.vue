<template>
  <vs-dropdown-item class="menu-accion" v-if="desplegar()" v-on:click.native="ejecutarAccion()">
    <div class="icono">
      <vs-icon :icon="icono" size="small"></vs-icon>
    </div>
    <div class="accion">{{ nombre }}</div>
  </vs-dropdown-item>
</template>

<script>
import PermisoAccionMixin from "../../mixins/PermisoAccionMixin";
import clienteFebosAPI from "../../../../servicios/clienteFebosAPI";
import modalStore from "../../../../../store/modals/acciones";

export default {
  name: "AccionDescargarAmbosPdf",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object,
    },
  },
  data() {
    return {
      icono: "picture_as_pdf",
      nombre: "Descargar PDF",
      permiso: "DTE15",
    };
  },
  methods: {
    ejecutarAccion() {
      console.log("EJECUTANDO DESCARGAR PDF", this.documento);
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" })
      const modalComponente = () =>
        import(
          `@/febos/chile/dte/componentes/acciones/modales/modalDescargarPdf.vue`
        );
      //cambiar lo de bitacora
      clienteFebosAPI
        .get(
          "/documentos/" +
            this.documento.febosId +
            "?dominioPortal=portal.febos.cl&febosId=" +
            this.documento.febosId +
            "&imagen=si&incrustar=no&regenerar=no&tipoImagen=0"
        )
        .then((response) => {
          if(response.data.imagenLink) {
            window.open(response.data.imagenLink);
          }else{
            modalStore.commit("setTitulo", "Descargar PDF");
            modalStore.commit("mostrarBitacora", modalComponente);
            modalStore.commit("setData", response.data);
          }
          this.$vs.loading.close();
        })
        .catch(() => {});
    },
    desplegar() {
      return this.esAccionAplicable() && this._tienePermiso(this.permiso);
    },
    esAccionAplicable() {
      return true;
    },
  },
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
