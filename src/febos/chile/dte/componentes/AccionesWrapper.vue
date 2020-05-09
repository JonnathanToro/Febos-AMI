<template>
  <vs-dropdown color="primary">
    <a class="a-icon" href="#">
      <vs-icon icon="view_list" size="medium" class="acciones"></vs-icon>
    </a>

    <vs-dropdown-menu>
      <vs-dropdown-item class="menu-accion" v-for="accion in despliegueDeAcciones" :key="accion.accion" v-if="evaluar(documento,accion.accion) && tienePermiso(accion.permiso)">
        <div class="icono">
          <vs-icon :icon="accion.icono" size="small"></vs-icon>
        </div>
        <div class="accion">
          {{ accion.nombre}}
        </div>
      </vs-dropdown-item>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
  import AccionesListadoFacturaElectronicaMixin from "../mixins/AccionesListadoFacturaElectronicaMixin";

  export default {
    name: "AccionesWrapper",
    mixins: [AccionesListadoFacturaElectronicaMixin],
    props: {
      acciones: Array,
      documento: Object
    },
    data() {
      return {
        despliegueDeAcciones:[]
      }
    },
    computed: {},
    created() {
      for(let i=0;i<this.acciones.length;i++){
        this.despliegueDeAcciones.push(this.obtenerAccion(this.acciones[i]));
      }
    },
    methods: {
      evaluar(documento,accion){
        //TODO: diferenciar cuando mostrar una accion o no segun el documento
        if(documento && accion)return true;
        return false;
      },
      tienePermiso(permiso){
        if(permiso)return true;
        else false;
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
