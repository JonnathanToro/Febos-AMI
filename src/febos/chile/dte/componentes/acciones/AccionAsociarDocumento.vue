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
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";


export default {
  name: "AccionAsociarDocumento",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "class",
      nombre: "Asociar Documento",
      permiso: "DTE26"
    };
  },
  methods: {
    ejecutarAccion() {
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" })
      console.log("EJECUTANDO ASOCIAR DOCUMENTO", this.documento);
      clienteFebosAPI.get('/documentos/dnt').then((response) => {
        console.log("RESPUESTA DOC DNT: ",response);
        const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalAsociarDocumento.vue`);
        modalStore.commit("setTitulo", "Asociar Documento");
        modalStore.commit("mostrarBitacoraFull", modalComponente);
        this.documento.datas = response.data;
        modalStore.commit("setData", this.documento);
        this.$vs.loading.close();
      });
      this.$vs.loading.close();
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
