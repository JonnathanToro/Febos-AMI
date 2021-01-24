<script>

export default {
  props: {
    mapper: {
      type: Function
    }
  },
  data() {
    return {
      step: {}
    };
  },
  methods: {
    async validateForm(scope) {
      const result = await this.$validator.validateAll(scope);
      return !!result;
    },
    getStepData() {
      return this.step;
    }
  }
};

</script>
