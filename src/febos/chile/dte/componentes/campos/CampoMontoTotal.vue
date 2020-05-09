<template>
  <div>
    $ {{ formatearMonto(documento.montoTotal) }}
  </div>
</template>

<script>
  import NumerosMixin from "../../../../global/_vue/mixins/NumerosMixin";

  export default {
    name: "CampoMontoTotal",
    mixins: [NumerosMixin],
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
