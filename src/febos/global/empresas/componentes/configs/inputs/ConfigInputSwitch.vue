<template>
  <div>
    <vs-switch v-model="valueMutable" v-on:change="changeValue()">
      <span slot="on">{{ config.label_true }}</span>
      <span slot="off">{{ config.label_false }}</span>
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
    },
    config: {
      type: Object,
      required: false,
      default() {
        return {
          option_true: 'Y',
          option_false: 'N',
          label_true: 'Si',
          label_false: 'No'
        };
      }
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
