<template>
  <div id="empresa-item" class="card">
    <div><strong>{{ empresa.razonSocial }}</strong></div>
    <div class="fantasia">{{ empresa.fantasia }}</div>
    <div class="iut">{{ $t('IUT_EMPRESA')}}: {{ formatear(empresa.iut) }}</div>
  </div>
</template>
<script>


  export default {
    name: 'EmpresaItem',
    props:{
      empresa:{
        type: Object,
        required: true,
      }
    },
    data() {
      return {}
    },
    computed: {

    },
    created() {
      //TODO: codigo antes de renderear
    },
    methods: {
      formatear(rut) {
        return (rut);
      }
    },
    mounted() {
      //TODO: codigo despues de renderear
    }
  }

</script>
<style scoped>
  .card{
    padding-left: 25px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: solid 1px #ccc;
    background-color:white;
    box-shadow: inset 0px 11px 8px -10px #eff2f7;
  }
  .fantasia{
    font-size: 80%;
  }
  .iut{
    position:absolute;
    right:10px;
    width:120px;
    margin-top:-15px;
    border-radius: 5px;
    background-color: orangered;
    color: white;
    padding-left: 5px;
    font-size:12px;
    text-align: center;
  }

</style>
