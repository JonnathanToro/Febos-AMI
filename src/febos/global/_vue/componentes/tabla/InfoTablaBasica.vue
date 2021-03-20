<template>
  <div>
    Estas viendo los registros del {{ inicio }} al {{ fin }} de un total de {{ registrosTotales }}.
  </div>
</template>
<script>
export default {
  name: 'InfoTablaBasica',
  props: {
    pagina: Number,
    itemsPorPagina: Number,
    itemsDeEstaPagina: Number,
    registrosTotales: Number
  },
  computed: {
    inicio() {
      return 1 + (this.pagina - 1) * this.itemsPorPagina;
    },
    fin() {
      return (this.pagina - 1) * this.itemsPorPagina + this.itemsDeEstaPagina;
    }

  }
};
</script>
