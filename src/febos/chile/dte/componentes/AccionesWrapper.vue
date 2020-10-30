<template>

<div>

  <vs-dropdown color="primary">
    <a class="a-icon" href="#">
      <vs-icon icon="view_list" size="medium" class="acciones"></vs-icon>
    </a>

    <vs-dropdown-menu>
      <component  v-for="accion in acciones"
                  :key="accion" :is="cargarComponenteAccion(accion)"
                  :accion="accion" :documento="documento">
      </component>
    </vs-dropdown-menu>
  </vs-dropdown>

  <vs-popup :title="getTitulo" :active.sync="mostrarModal"
            @keyup.enter.native="mostrarModal = false">
    <component v-if="mostrarModal" :is="getCompomente"></component>
  </vs-popup>

  <!-- Popup de Pantalla Completa -->
  <vs-popup fullscreen :title="getTitulo" :active.sync="mostrarModalFull"
            @keyup.enter.native="mostrarModalFull = false">
    <component v-if="mostrarModalFull" :is="getCompomente"></component>
  </vs-popup>

</div>

</template>

<script>
  //import AccionesListadoFacturaElectronicaMixin from "../mixins/AccionesListadoFacturaElectronicaMixin";
  import modalStore from "../../../../store/modals/acciones";

  export default {
    name: "AccionesWrapper",
    props: {
      acciones: Array,
      documento: Object
    },
    data() {
      return {
        despliegueDeAcciones:[],
        componentes: {},
      }
    },
    computed: {
      mostrarModal: {
        get()     {
          // return modalStore.state.showModal;
          return modalStore.state.showModal && modalStore.state.febosId == this.documento.febosId;
        },
        set()  {
          if (modalStore.state.showModal)   { modalStore.commit("ocultarBitacora"); }
                                      else  { modalStore.commit("mostrarBitacora"); }
        }
      },
      mostrarModalFull: {
        get()     {
          // return modalStore.state.showModalFull;
          return modalStore.state.showModalFull && modalStore.state.febosId == this.documento.febosId;
        },
        set()  {
          if (modalStore.state.showModalFull)   { modalStore.commit("ocultarBitacoraFull"); }
                                          else  { modalStore.commit("mostrarBitacoraFull"); }
        }
      },
      getTitulo:  {
        get()     { return modalStore.state.tituloModal; }
      },
      getCompomente:  {
        get()     { return modalStore.state.componente;   }
      }
    },
    mounted() {
      // console.log(this.acciones);
    },
    methods: {
      cargarComponenteAccion(accion){
        if (!this.componentes[accion]) {
           this.componentes[accion] = () => import(`@/febos/chile/dte/componentes/acciones/Accion${accion}.vue`);
        }
        return this.componentes[accion];

      },

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
