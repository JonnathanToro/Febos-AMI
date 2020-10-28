<template>
  <div>
    <div v-if="getData.codigo == 10">
      <b>Glosa SII: </b> {{ getData.glosaSii }}
    </div>
    <div style="color: red" v-else>
      No fue posible obtener la información.
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
    if (this.getData.codigo != 10)  {
      this.$vs.notify({
        color: "danger", title: "Estado SII", text: this.getData.mensaje + "<br/><b>Seguimiento: </b>" + this.getData.seguimientoId, fixed: true
      });
    }
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
