<template>
  <div id="filtro-perfil">

    <transition name="deslizar">
      <keep-alive>
        <vs-button id="boton-filtro" @click.stop="active=!active" color="primary" type="filled" class="filtro-perfil-btn" icon-pack="feather"
                   icon="icon-search" v-if="true"></vs-button>
      </keep-alive>
    </transition>

    <vs-sidebar hidden-background position-right v-model="active" click-not-close class="items-no-padding">
      <div class="h-full">
        <div class="customizer-header mt-6 flex items-center justify-between px-6">
          <div>
            <h4>Filtro de búsqueda!</h4>
          </div>
          <feather-icon icon="XIcon" @click.stop="active = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <VuePerfectScrollbar ref="mainSidebarPs" class="scroll-area--customizer pt-4 pb-6" :settings="settings">
          <template>
            <!--<vs-tabs :color="colorx">-->
              <!--<vs-tab @click="colorx = 'success'" vs-label="Filtros">-->
                <!--<div class="con-tab-ejemplo">-->
                  <!--<span>1.</span></div>-->
              <!--</vs-tab>-->

              <!--<vs-tab @click="colorx = 'danger'" vs-label="Mis Filtros Guardados">-->
                <!--<div class="con-tab-ejemplo">-->
                  <!--<span>2</span></div>-->
              <!--</vs-tab>-->
            <!--</vs-tabs>-->
          </template>
        </VuePerfectScrollbar>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';

  export default {
    props: {
      activarBoton: Boolean
    },
    data() {
      return {
        active: false,
        settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
        },
        colorx: 'success',
        saliendo:false

      }
    },
    computed: {
      activar:function(){
        return this.activarBoton && !this.saliendo;
      }
    },
    methods: {},
    created() {
      this.saliendo=false;
    },
    beforeDestroy(){
      this.saliendo=true;
      console.log("Entro a morir",this.activar);
    },
    components: {
      VuePerfectScrollbar,
    }
  }
</script>

<style lang="scss">
  /* EFECTO DESLIZAR */
  .deslizar-enter-active {
    transition: all .2s;
  }

  .deslizar-enter {
    opacity: 0; /*por defecto es 1, al comenzar a entrar, debe partir en 0*/
    transition: all .2s;
    transform: translateX(80px);
  }

  .deslizar-leave-to {
    /*transition: all .2s;*/
    opacity: 0; /*por defecto es 1, esta visible, al terminar de salir, debe quedar en 0*/
    transform: translateX(80px);
  }

  #filtro-perfil {
    .vs-sidebar {
      position: fixed;
      z-index: 52000;
      width: 400px;
      max-width: 90vw;
      @apply shadow-lg;
    }
  }

  .vs-select--options {
    z-index: 52001;
  }

  .filtro-perfil-btn {
    position: fixed;
    top: 50%;
    margin-top: 50px;
    right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    z-index: 50000;
  }

  .scroll-area--customizer {
    height: calc(100% - 5rem);
  }
</style>
