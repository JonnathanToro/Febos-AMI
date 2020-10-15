<template>
  <div align="center">
    <h4>Advertencia</h4>
    <br />
    <p>Esta acción no puede deshacerse ... Estas seguro que deseas anular la guia?</p>
    <br />
    <div align="center">
      <div class="margin-bot">
        <vs-alert title="Alerta" class="mensaje" :active="respuesta" color="success">
          Anulación correcta
        </vs-alert>
        <vs-alert title="Alerta"  :active="respuesta == false" color="danger">
          Error al realizar la operación, reintente o contacte a soporte
        </vs-alert>
      </div>
    </div>
    <div>
      <vs-button color="primary" type="filled" v-on:click="alertaCierre">Si, Anular</vs-button>
      <vs-button color="primary" type="border" v-on:click="cerrarVentana">Me arrepentí</vs-button>
    </div>
  </div>
</template>


<script>
import modalStore from "@/store/modals/acciones";
import vSelect from "vue-select";
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";

export default {
  name: "modalAnularGuia",
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  data() {
    return {
      vista: false,
      modificar: false,
      colorLoading: "#ff8000",
      documento: {},
      respuesta: null
    };
  },
  mounted() {
    this.documento = this.getData;
    console.log("DOCUMENTO: ", this.documento);
  },
  methods: {
    openLoadingColor() {
      this.$vs.loading({ color: this.colorLoading });
      setTimeout(() => {
        this.$vs.loading.close();
      }, 2000);
    },

    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
    },

    alertaCierre() {
      console.log("Anular");
      clienteFebosAPI.put("/documentos/datos/" + this.documento.febosId + "/estado=10").then((response) => {
        if(response.data.codigo == 10) {
          this.respuesta = true;
          setTimeout(() => {
            this.cierrame();
          }, 4000);
        }else{
          this.respuesta = false;
          setTimeout(() => {
            this.respuesta = null;
          }, 5000);
        }
      }).catch(() => {
        this.respuesta = false;
          setTimeout(() => {
            this.respuesta = null;
          }, 5000);
      });
      /*
      this.openLoadingColor();
      modalStore.commit("ocultarBitacora");
      this.$vs.notify({
        color: "primary",
        title: "Se ha realizado,",
        text: "Anulaste la guia",
      });
      */
    },
    cancelarCierre() {
      const modalComponente = () =>
        import(
          `@/febos/chile/dte/componentes/acciones/modales/modalAnularDocumento.vue`
        );
      modalStore.commit("setTitulo", "Información Pago");
      modalStore.commit("mostrarBitacora", modalComponente);
    },
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
