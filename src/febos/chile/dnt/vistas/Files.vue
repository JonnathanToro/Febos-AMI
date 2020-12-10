<template>
  <div>
    hola mundooo
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      holi: ''
    };
  },
  computed: {
    ...mapGetters('Dnts', [
      'loading',
      'dntFiles'
    ]),
  },
  methods: {
    ...mapActions('Dnts', [
      'listDocuments'
    ]),
  },
  mounted() {
    console.log('holii');
    this.listDocuments({
      tipo: 'aprobaciones',
      campos: '*',
      pagina: 1,
      itemsPorPagina: 100,
      // TODO agregar bien los filtros
      filtros: 'tipo:APR'
    });
  }
};
</script>
