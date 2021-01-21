<template>
  <div style="width: 102px;">
      <div v-if="doc.fechaRecepcionSii !== null">
        <span>{{ doc.fechaRecepcionSii | moment("DD-MM-YYYY hh:mm") }}</span>
      </div>
      <div v-else>
        <span>Sin información</span>
      </div>
  </div>
</template>

<script>
// import moment from 'moment';

export default {
  name: 'CampoRecepcionSii',
  props: {
    documento: {
      type: Object,
    },
  },
  beforeMount() {
    this.doc = this.documento;
  },
  mounted() {

    // this.doc.fechaRecepcionSii = moment(this.doc.fechaRecepcionSii).format('DD-MM-YYYY');
    // console.log("DOCUMENTO Recepcion SII: ",this.documento);
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
