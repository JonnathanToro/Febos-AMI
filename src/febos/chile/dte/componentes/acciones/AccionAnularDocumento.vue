<template>
    <vs-dropdown-item
      class="menu-accion"
      v-if="desplegar()"
      v-on:click.native="ejecutarAccion"
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
  name: "AccionAnularGuia",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "cancel_presentation",
      nombre: "Anular Documento",
      permiso: "DTE41"
    };
  },
  mounted() {
    console.log("TIPO DOCUMENTO: ", this.documento.tipoDocumento);
  },
  methods: {
    ejecutarAccion(){
        console.log("EJECUTANDO ANULAR DOCUMENTO ",this.documento);
        const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalAnularDocumento.vue`);
          //clienteFebosAPI.put("/documentos/datos/" + this.documento.febosId + "/estado=10").then((response) => {
          modalStore.commit("setTitulo", "Anular Documento");
          modalStore.commit("mostrarBitacora", modalComponente);
          modalStore.commit("setData", this.documento);
          //console.log(response);

        //}).catch(() => {
        //})

      },
      desplegar(){
        return this.esAccionAplicable() && this._tienePermiso(this.permiso);
      },
      esAccionAplicable(){
        return true;
      }
  }


};
</script>

<style scoped>
.menu-accion {
  vertical-align: middle;
  width: 50% ;
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
