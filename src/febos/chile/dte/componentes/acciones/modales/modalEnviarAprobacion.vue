<template>
  <div align="center">

  </div>
</template>


<script>
import modalStore from "@/store/modals/acciones";
import vSelect from "vue-select";

export default {
  name: "modalEnviarAprobacion",
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

  },
  methods: {
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
    }
  },
  components: {
    "v-select": vSelect,
  },
};
</script>

<style>
.ajuste_dialogo {
  text-align: center;
}
[dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
    padding: -0.25rem 2rem;
    margin: 10px;
}
</style>
