<template>
  <div>
    {{ documento.fechaRecepcionSii }}
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
