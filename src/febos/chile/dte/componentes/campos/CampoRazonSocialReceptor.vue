<template>
    <span>
      {{ documento.razonSocialReceptor }}
    </span>
</template>

<script>
export default {
  name: 'CampoRazonSocialReceptor',
  props: {
    documento: {
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>
