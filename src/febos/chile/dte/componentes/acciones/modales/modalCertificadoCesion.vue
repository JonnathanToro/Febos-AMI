<template>
  <div>
  <!--
      <div class="fill-row-loading">
        <h4>Descargando Certificado de Cesion</h4>
        <div
          :class="{'activeLoading':activeLoading}"
          v-for="type in types"
          :id="[`loading-${type}`]"
          class="vs-con-loading__container loading-example"
          v-bind:key="type"
        ></div>
      </div>
  -->
  <vs-alert title="Error en la descarga" :active="true" color="danger">
    {{ getData.tipo }}
  </vs-alert>
  </div>
</template>

<script>
import modalStore from '@/store/modals/acciones';

export default {
  name: 'modalDescargarCertificadoCesion',
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  data() {
    return {

    };
  }
};
</script>

<style lang="scss">
.vs-con-loading__container .con-vs-loading {
  width: 100%;
  height: 100%;
  min-height: 60px;
  top: 50%;
  left: 50%;
}
.fill-row-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  .loading-example {
    width: 60%;
    float: left;
    height: 100px;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.05);
    margin: 0px;
    h4 {
      z-index: 40000;
      position: center;
      text-align: center;
      padding: 11px;
    }
    &.activeLoading {
      opacity: 0 !important;
      transform: scale(0.5);
    }
  }
}
.con-vs-popup .vs-popup {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  z-index: 100;
  width: 30%;
  margin: 10px;

}
</style>
