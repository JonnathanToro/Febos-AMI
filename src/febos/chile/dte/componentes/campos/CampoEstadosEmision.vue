<template>
    <div style="width: 72px;">
      <span class="en-linea"><CampoIndicadorEstadoSii :documento="documento"></CampoIndicadorEstadoSii></span>
      <span class="en-linea"><CampoIndicadorEstadoComercial :documento="documento"></CampoIndicadorEstadoComercial></span>
    </div>
</template>

<script>
import CampoIndicadorEstadoSii from './CampoIndicadorEstadoSii';
import CampoIndicadorEstadoComercial from './CampoIndicadorEstadoComercial';

export default {
  name: 'CampoEstadosEmision',
  components: { CampoIndicadorEstadoSii, CampoIndicadorEstadoComercial },
  props: {
    documento: {
      type: Object,
    },
  }
};
</script>

<style scoped>
 .en-linea{
   display: inline-block!important;
   margin-left: 3px!important;
   cursor:pointer;
 }
</style>
