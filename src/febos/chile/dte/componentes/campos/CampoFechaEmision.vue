<template>
  <div>
    {{ documento.fechaEmision | moment("DD-MM-YYYY") }}
  </div>
</template>

<script>

export default {
  name: 'CampoFechaEmision',
  props: {
    documento: {
      type: Object,
    },
  }
};
</script>

<style scoped>
  div {
    width:100%;
    text-align: right;
  }
</style>
