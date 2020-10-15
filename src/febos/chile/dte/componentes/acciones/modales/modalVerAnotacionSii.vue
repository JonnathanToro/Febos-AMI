<template>
  <div class="demo-alignment">
    <h3>Consultar anotaciones en el Sii del documento</h3>
    <h5>Factura afecta electronica</h5>
    <br />
    <br />
    <p>
      Este proceso podría tardar mas de lo esperado, ya que se consulta directamente
      en el servicio de impuestos internos.
    </p>
    <br>
    <p>¿Desea Continuar?</p>
    <vs-button @click="openLoading" type="filled" color="primary">Si, adelante</vs-button>
    <vs-button @click="cancelarCierre" type="border" color="primary">No, en otro momento</vs-button>
  </div>
</template>

<script>
import modalStore from "@/store/modals/acciones";

export default {
  methods: {
    cancelarCierre() {
      modalStore.commit("ocultarBitacora");
    },
    openLoading() {
      this.$vs.loading();
      setTimeout(() => {
        this.$vs.loading.close();
      }, 2000);
    },
  },
};
</script>
