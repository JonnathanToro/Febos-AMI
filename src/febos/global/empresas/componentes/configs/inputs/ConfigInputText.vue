<template>
  <b-form-input v-model="valueMutable" v-on:input="$emit('input', $event)"/>
</template>
<script>
export default {
  name: 'ConfigInputText',
  data() {
    return {
      valueMutable: ''
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    }
  },
  mounted() {
    this.valueMutable = this.value;
  }
};
</script>

<style scoped>

</style>
