<template>
  <div>
    <vs-alert title="Error en la descarga" v-if="getData.codigo !== 10">
      Error al tratar de realizar la consulta al SII
      <br>
    </vs-alert>
    <div v-else>
      <span>SI EXISTE EL DOC</span>
    </div>
  </div>
</template>

<script>
import modalStore from "@/store/modals/acciones";

export default {
  name: "modalConsultarEstadoSii",
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
  },
  mounted() {
    console.log("CONSULTAR ESTADO SII: ", this.getData);
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
