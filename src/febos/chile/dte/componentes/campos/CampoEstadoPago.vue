<template>
  <div>
     <div v-for="(estado, index) in estados_de_pago" :key="index">
       <div v-if="estado.code == doc.estadoComercial">
         {{ estado.label }}
       </div>
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
    // console.log("DOCUMENTO EstadoPago: ",this.doc);
  },
  data() {
    return {
      doc: {},
      estados_de_pago: [
        { code: 0, label: 'Sin Información' },
        { code: 1, label: 'Contabilizado' },
        { code: 2, label: 'Enviado a Pago' },
        { code: 3, label: 'Pagado' },
        { code: 4, label: 'Cobrado' },
        { code: 5, label: 'Pago no Efectuado' },
        { code: 6, label: 'Documento compensado' },
        { code: 7, label: 'Documento anulado' },
        { code: 8, label: 'En preparación de pago' },
        { code: 9, label: 'En nómina de pago' },
      ],
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
