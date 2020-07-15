<template>
  <div id="permisos-item" class="card">
    <div><strong>{{ permiso.nombre }}</strong></div>
    <div class="descripcion">{{ permiso.descripcion }}</div>
  </div>
</template>
<script>
  export default {
    name: 'PermisosItem',
    props:{
      permiso:{
        type: Object,
        required: true,
      }
    },
    data() {
      return {}
    },
  }

</script>
<style scoped>
  .card {
    padding-left: 25px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: solid 1px #ccc;
    background-color:white;
    box-shadow: inset 0px 11px 8px -10px #eff2f7;
  }
  .descripcion {
    font-size: 80%;
  }

</style>
