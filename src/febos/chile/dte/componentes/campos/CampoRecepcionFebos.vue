<template>
  <div style="width: 102px;">
      <div v-if="doc.fechaRecepcion !== null">
        <span>{{ doc.fechaRecepcion | moment("DD-MM-YYYY hh:mm") }}</span>
      </div>
      <div v-else>
        <span>Sin información</span>
      </div>
  </div>
</template>

<script>
//import moment from 'moment';

  export default {
    name: "CampoRecepcionFebos",
    props: {
      documento: {
        type: Object,
      },
    },
    mounted() {
      this.doc = this.documento;
      //this.doc.fechaRecepcion = moment(this.doc.fechaRecepcion).format('DD-MM-YYYY');
      console.log("DOCUMENTO Recepcion febos: ",this.doc);
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
