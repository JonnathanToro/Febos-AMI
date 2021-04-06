<template>
  <div>
    <vs-switch v-model="valueMutable" v-on:change="changeValue()">
      <span slot="on">Si</span>
      <span slot="off">No</span>
    </vs-switch>
  </div>
</template>

<script>

export default {
  name: 'ConfigInputSwitchYN',
  data() {
    return {
      valueMutable: false
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    }
  },
  mounted() {
    this.valueMutable = this.value === 'Y';
  },
  methods: {
    changeValue() {
      this.$emit('input', this.valueMutable ? 'Y' : 'N');
    }
  }
};
</script>

<style scoped>

</style>
