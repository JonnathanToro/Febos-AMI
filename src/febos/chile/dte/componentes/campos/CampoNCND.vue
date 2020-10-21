<template>
  <div>
     <div v-if="doc.tieneNc && doc.Nd == 'no'">
       No tiene documentos asociados
     </div>
     <div v-else-if="doc.tieneNc !== 'no' && doc.Nd == 'no'">
       {{ doc.tieneNc }}
     </div>
     <div v-else-if="doc.tieneNd !== 'no' && doc.Nc == 'no'">
       {{ doc.tieneNd }}
     </div>
  </div>
</template>

<script>

  export default {
    name: "CampoNCND",
    props: {
      documento: {
        type: Object,
      },
    },
    mounted() {
      this.doc = this.documento;
      console.log("DOCUMENTO NCND: ",this.doc);
    },
    data() {
      return {
        doc: {}
      }
    }
  }
</script>

<style scoped>
  div {
    width:100%;
    text-align: right;
  }
</style>
