<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template functional>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
    <p>
      <!--<span class="letras-escritorio"><b>E S C R I T O R I O</b></span><span class="letras-digital">DIGITAL</span>
      <span> es un servicio de </span>
      <a href="https://www.febos.cl" target="_blank" rel="nofollow" style="color:#323f48"><B>Febos.</B></a>-->
      Este es un servicio de <strong>Febos AMI SpA</strong>
    </p>
    <span class="md:flex hidden items-center">
      <span>Fabricado con amor</span>
      <feather-icon icon="HeartIcon" svgClasses="stroke-current text-danger w-6 h-6" class="ml-2"/>
      <span class="ml-3">  Ambiente de <strong>{{ props.ambiente.replace('cion','ción') }}</strong> <span style="font-size:70%">v.{{ props.version }}</span></span>
    </span>

  </footer>
</template>

<script>
  // prueba
  export default {
    name: "the-footer",
    props: {
      classes: {
        type: String,
      },
      ambiente: {
        type: String,
      },
      version: {
        type: String,
      }
    }
  }
</script>
<style>
  .letras-escritorio{
    color: #323f48;
    font-size:85%;
  }
  .letras-digital{
    color: #662483;
    margin-left:10px;
    font-size:85%;
  }
</style>
