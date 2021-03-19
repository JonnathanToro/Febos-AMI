<template>
  <div>
    {{ documento.trackId }}
  </div>
</template>

<script>

export default {
  name: 'CampoTrackId',
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
  div {
    width:100%;
    text-align: right;
  }
</style>
