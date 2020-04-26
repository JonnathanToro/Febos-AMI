<template>
  <h4>You are in home.</h4>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      //VueApexCharts,
    },
    data() {
      return {
        //subscribersGained: {},
        //revenueGenerated: {},
      }
    },
    computed: {
      ...mapGetters("Usuario", {usuarioActual: "usuarioActual"})
    },
    mounted() {

    },
    methods: {
      ...mapActions("Usuario", {login: "ingreso"})
    },
    created() {

    }
  }
</script>

<style lang="scss">
  /*  .chat-card-log {
      height: 400px;

      .chat-sent-msg {
        background-color: #f2f4f7 !important;
      }
    }*/
</style>
