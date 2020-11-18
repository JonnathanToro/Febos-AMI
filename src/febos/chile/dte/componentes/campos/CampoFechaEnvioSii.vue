<template>
  <div>
    {{ documento.fechaRecepcionSii | moment("DD-MM-YYYY hh:mm") }}
  </div>
</template>

<script>

  export default {
    name: "CampoFechaEnvioSii",
    props: {
      documento: {
        type: Object,
      },
    }
  }
</script>

<style scoped>
  div {
    width:100%;
    text-align: right;
  }
</style>
