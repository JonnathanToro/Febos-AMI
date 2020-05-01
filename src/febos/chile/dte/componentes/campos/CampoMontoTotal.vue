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
    },
    data() {
      return {}
    },
    computed: {},
    created() {

    },
    methods: {},
    mounted() {

    }
  }
</script>

<style scoped>
  div {
    width:100%;
    text-align: right;
  }
</style>
