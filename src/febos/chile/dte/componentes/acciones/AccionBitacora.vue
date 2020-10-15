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
  name: "AccionBitacora",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
    data() {
      return {
        icono: 'list',
        nombre: 'Bitácora',
        permiso: 'DTE03',
      };
    },
    mount() {
    },
    methods:{
      ejecutarAccion(){
        this.$vs.loading({ color: "#ff8000", text: "Espera un momento por favor" })
        console.log("EJECUTANDO BITACORA ",this.documento);
        const modalComponente = () => import(`@/febos/chile/dte/componentes/acciones/modales/modalBitacora.vue`);
        clienteFebosAPI.get("/documentos/" + this.documento.febosId + "/bitacora?pagina=1&filas=15").then(async (response) => {

          await clienteFebosAPI
            .get(
                "/documentos/" +
                this.documento.febosId +
                "?dominioPortal=portal.febos.cl&febosId=" +
                this.documento.febosId +
                "&imagen=si&incrustar=no&regenerar=no&tipoImagen=0"
            )
            .then( (response1) => {
              if(response1.data.imagenLink) {
                response.data.imagenLink = response1.data.imagenLink;
              }else{
                response.data.imagenLink = "no";
              }
            });

          modalStore.commit("setTitulo", "Bitácora Documento N°"+this.documento.folio);
          modalStore.commit("mostrarBitacoraFull", modalComponente);
          modalStore.commit("setData", response.data);
          this.$vs.loading.close();
          console.log(response);
        })
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
