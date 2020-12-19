<!--
=========================================================================================
    File Name: Error404.vue
    Description: 404 Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================
-->

<template>
  <div
    class="h-screen flex w-full bg-img background-403"
  >
    <!-- eslint-disable max-len -->
    <div
      class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center"
    >
      <img
        src="@/assets/images/pages/404.png"
        alt="graphic-404"
        class="mx-auto mb-4 max-w-full"
      >
      <h1 class="sm:mx-0 mx-4 mb-12 text-5xl d-theme-heading-color info">
        401 - No estás autorizado!
      </h1>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
          <vs-button size="large" to="/">
            Ir al Inicio
          </vs-button>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
          <vs-button size="large" @click="logOut">
            Salir
          </vs-button>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>
<script>

import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('Usuario', ['signOut']),
    logOut() {
      this.signOut().then(() => this.$router.push('/ingreso'));
    },
  }
};

</script>

<style lang="scss">

.background-401 {
  background-image: url('https://s3.amazonaws.com/archivos.febos.io/publico/portales/narvi/Fondo_Keynote_03.jpg');
}

.info {
  color: #ffffff;
  padding: 30px;
  margin-top: 30px;
  text-shadow: 0 0 30px #000000;
}
</style>
