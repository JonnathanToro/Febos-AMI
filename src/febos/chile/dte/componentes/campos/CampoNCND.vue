<template>
  <div>
     <div v-if="doc.tieneNc === 'no' && doc.tieneNd === 'no'">
       No tiene documentos asociados
     </div>
     <div v-else-if="doc.tieneNc === 'no' && doc.tieneNd === 'si'">
       ND
     </div>
     <div v-else-if="doc.tieneNd === 'no' && doc.tieneNc === 'si'">
       NC
     </div>
    <div v-else-if="doc.tieneNd === 'si' && doc.tieneNc === 'si'">
      ND/NC
    </div>
  </div>
</template>

<script>

export default {
  name: 'CampoNCND',
  props: {
    documento: {
      type: Object,
    },
  },
  mounted() {
    this.doc = this.documento;
    // console.log('DOCUMENTO NCND: ', this.doc);
  },
  data() {
    return {
      doc: {}
    };
  }
};
</script>

<style scoped>
  div {
    width:100%;
    text-align: right;
  }
</style>
