<template>
  <div class="container-verificador">
    <div class="vx-logo cursor-pointer text-center m-top">
      <img v-bind:src="logoFull" style="width:190px"/>
    </div>
    <div class="caja-pdf">
      <pdf :src="this.url"></pdf>
      <div class="descarga">
        <vs-icon icon="description" size="small" color="white"></vs-icon>
        <a :href="this.url" target="_blank">Descargar Documento</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import pdf from 'vue-pdf';

export default {
  components: { pdf },
  mixins: [],
  watch: {},
  computed: {
    ...mapState('VerificarQr', {
      dnt: (state) => state.infoQr.dnt,
      url: (state) => state.infoQr.url,
      privado: (state) => state.infoQr.privado
    }),
    ...mapState('Personalizacion', {
      logoFull: (state) => state.menu.logo
    })
  },
  methods: {
    ...mapActions('VerificarQr', {
      verificarQr: 'verificarQr'
    })
  },
  mounted() {
    this.verificarQr({
      febosId: this.$route.params.febosId
    });
  }
};
</script>

<style lang="css" scoped>
  .container-verificador {
    width: 60%;
    background: white;
    margin: 0 auto 40px auto;
  }

  .caja-pdf {
   margin-bottom: 40px;
  }

  .m-top {
    margin-top: 30px;
  }
  .descarga {
    background: rgb(255, 41, 97);
    margin: 20px auto 20px auto;
    padding: 10px;
    border-radius: 4px;
    width: fit-content;
  }
  a {
    color: white;
  }
</style>
