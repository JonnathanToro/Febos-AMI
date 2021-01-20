<template>
  <div>
    <div v-if="doc.plazo <= 0">
      <span>Vencido</span>
    </div>
    <div v-else>
      {{ doc.plazo }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'CampoEstadoPago',
  props: {
    documento: {
      type: Object,
    },
  },
  mounted() {
    this.doc = this.documento;
    // console.log("DOCUMENTO Plazo: ",this.doc);
  },
  data() {
    return {
      doc: {},
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
