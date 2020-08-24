<template>
  <vs-dropdown color="primary">
    <a class="a-icon" href="#">
      <vs-icon icon="view_list" size="medium" class="acciones"></vs-icon>
    </a>

    <vs-dropdown-menu>
      <component v-for="accion in acciones" :key="accion" :is="cargarComponenteAccion(accion)" :documento="documento">

      </component>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
  //import AccionesListadoFacturaElectronicaMixin from "../mixins/AccionesListadoFacturaElectronicaMixin";

  export default {
    name: "AccionesWrapper",
    props: {
      acciones: Array,
      documento: Object
    },
    data() {
      return {
        despliegueDeAcciones:[],
        componentes: {}
      }
    },
    computed: {},
    created() {

    },
    methods: {
      cargarComponenteAccion(accion){
        if (!this.componentes[accion]) {
          this.componentes[accion] = () => import(`@/febos/chile/dte/componentes/acciones/Accion${accion}.vue`);
        }
        return this.componentes[accion];
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
