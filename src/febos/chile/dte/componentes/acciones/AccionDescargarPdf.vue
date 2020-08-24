<template>
  <vs-dropdown-item class="menu-accion"  v-if="desplegar()" v-on:click.native="ejecutarAccion()">
    <div class="icono">
      <vs-icon :icon="icono" size="small"></vs-icon>
    </div>
    <div class="accion">
      {{ nombre}}
    </div>
  </vs-dropdown-item>
</template>

<script>
  import PermisoAccionMixin from "../../mixins/PermisoAccionMixin";

  export default {
    name: "AccionDescargarPdf",
    mixins: [PermisoAccionMixin],
    props: {
      documento: {
        type: Object,
      },
    },
    data() {
      return {
        icono: 'picture_as_pdf',
        nombre: 'Descargar PDF',
        permiso: 'WB001'
      }
    },
    methods:{
      ejecutarAccion(){
        console.log("EJECUTANDO DESCARGARPDF",this.documento);
      },
      desplegar(){
        return this.esAccionAplicable() && this._tienePermiso(this.permiso);
      },
      esAccionAplicable(){
        return true;
      }
    }
  }
</script>

<style scoped>
  .menu-accion{
    vertical-align: middle;
    width: 250px!important;
  }
  .icono, .accion{
    vertical-align: top;
    display: inline-flex;
  }
  .menu-accion .icono{
    margin-right: 5px;
  }
</style>
