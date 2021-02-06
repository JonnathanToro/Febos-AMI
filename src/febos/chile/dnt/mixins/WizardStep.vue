<script>

export default {
  props: {
    mapper: {
      type: Function
    },
    draft: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      step: {}
    };
  },
  watch: {
    draft(newValue) {
      this.step = {
        ...this.step,
        ...newValue
      };
    }
  },
  methods: {
    async validateForm(scope) {
      const result = await this.$validator.validateAll(scope);
      return !!result;
    },
    getStepData() {
      console.log('getStepData', this.step);
      return this.step;
    }
  }
};

</script>
