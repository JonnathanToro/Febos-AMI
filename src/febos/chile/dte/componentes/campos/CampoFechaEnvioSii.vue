<template>
  <div>
    <span class="campo-fecha">{{ documento.fechaRecepcionSii | moment("DD-MM-YYYY") }} </span><br/>
    <span class="hora"> a las <strong>{{ documento.fechaRecepcionSii | moment("hh:mm") }}</strong> hrs.</span>
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
  .hora{
    font-size: 80%;
  }
</style>
