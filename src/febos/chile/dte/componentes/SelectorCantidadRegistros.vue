<template>
  <div>
    Ver máximo de a
    <select v-model="valorActual">
      <option v-for="opcion in opciones" v-bind:key="opcion.nombre" :selected="opcion.valor == valorActual" v-bind:value="opcion.valor">
        {{ opcion.valor }}
      </option>
    </select>
    registros por página
  </div>
</template>

<script>

  export default {
    name: 'SelectorCantidadRegistros',
    props: {
      value: {
        type: Number,
        required: false,
        default: 10
      }
    },
    data: () => ({
      opciones: [
        {nombre: "10", valor: 10},
        {nombre: "20", valor: 20},
        {nombre: "50", valor: 50},
        {nombre: "75", valor: 75},
        {nombre: "100", valor: 100}
      ],
      valorActual: 10,
    }),
    watch: {
      valorActual() {
        this.$emit('input', this.valorActual)
        this.$emit('change', this.valorActual)
      }
    },
    mounted() {

    },
    methods: {}
  }
</script>

<style scoped>

</style>
