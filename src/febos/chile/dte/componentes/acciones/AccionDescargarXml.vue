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
  name: "AccionDescargarXml",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "picture_as_pdf",
      nombre: "Descargar XML",
      permiso: "DTE15"
    };
  },
  methods: {
    ejecutarAccion() {
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" })
      const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalDescargarXml.vue`);
      clienteFebosAPI.get("/documentos/" + this.documento.febosId + "?dominioPortal=portal.febos.cl&febosId="+ this.documento.febosId +"&incrustar=no&regenerar=no&tipoImagen=0&xml=si&xmlFirmado=si").then((response) => {

        if(response.data.xmlLink) {
          window.open(response.data.xmlLink);
        }else{
          modalStore.commit("setTitulo", "Descargar XML");
          modalStore.commit("mostrarBitacora", modalComponente);
          modalStore.commit("setData", response.data);
        }
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
