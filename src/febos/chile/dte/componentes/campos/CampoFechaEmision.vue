<template>
  <div>
    {{ documento.fechaEmision }}
  </div>
</template>

<script>

  export default {
    name: "CampoFechaEmision",
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
