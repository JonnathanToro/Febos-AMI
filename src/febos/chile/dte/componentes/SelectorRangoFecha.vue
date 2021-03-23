<template>
  <vs-row>
    <vs-col vs-w="2">
      <strong>Periodo de trabajo:</strong>
    </vs-col>
    <vs-col vs-w="2">
      <vs-input type="date" v-model="desde" class="pickadate pickadate-firstday"/>
    </vs-col>
    <vs-col vs-w="1">
      a
    </vs-col>
    <vs-col vs-w="2">
      <vs-input type="date" v-model="hasta" class="pickadate pickadate-firstday"/>
    </vs-col>
    <br/><br/>
  </vs-row>
</template>

<script>

export default {
  name: 'SelectorRangoFecha',
  props: {
    value: {
      type: String,
      required: false
    }
  },
  data: () => ({
    desde: '',
    hasta: '',
    opciones: [
      { nombre: '10', valor: 10 },
      { nombre: '20', valor: 20 },
      { nombre: '50', valor: 50 },
      { nombre: '75', valor: 75 },
      { nombre: '100', valor: 100 }
    ],
    valorActual: 10,
  }),
  watch: {
    valorActual() {
      this.$emit('input', this.valorActual);
      this.$emit('change', this.valorActual);
    }
  },
  mounted() {

  },
  methods: {}
};
</script>

<style scoped>
  .pickadate{
    width:170px !important;
  }
  .pickadate input{
    height:15px !important;
    width:170px !important;
  }
</style>
