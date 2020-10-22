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
  name: "AccionVerReferencias",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "visibility",
      nombre: "Ver Referencias",
      permiso: "DTE44"
    };
  },
  mount() {
  },
  methods: {
    ejecutarAccion() {
      console.log("EJECUTANDO REFERENCIAS", this.documento);
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" })
      const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalVerReferencias.vue`);
      //cambiar lo de bitacora
        clienteFebosAPI.get("/documentos/" + this.documento.febosId + "/referencias").then((response) => {
          modalStore.commit("setTitulo", "Ver Referencias Documento N°"+this.documento.folio);
          modalStore.commit("mostrarBitacoraFull", modalComponente);
          modalStore.commit("setData", response.data);
          this.$vs.loading.close();
          console.log(response);
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
