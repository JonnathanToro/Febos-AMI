<template>
  <div align="center">
    <h4>Advertencia</h4>
    <br />
    <p>¿Esta acción no puede deshacerse ... Estas seguro que deseas anular este documento?</p>
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
      <vs-button color="primary" type="filled" @click="anular">Si, Anular</vs-button>
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
      documento: {},
      respuesta: null
    };
  },
  mounted() {
    this.documento = this.getData;
    console.log("DOCUMENTO: ", this.documento);
  },
  methods: {
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
    },

    anular() {
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" })
      console.log("Anular");
      clienteFebosAPI.put("/documentos/datos/" + this.documento.febosId + "/estado=10").then((response) => {
        if(response.data.codigo == 10) {
          this.respuesta = true;
          this.$vs.loading.close();
        }else{
          this.respuesta = false;
          this.$vs.loading.close();
        }
      }).catch(() => {
        this.respuesta = false;
        this.$vs.loading.close();
      })

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
