<script>

export default {
  methods: {
    async validateForm(scope) {
      const result = await this.$validator.validateAll(scope);

      if (!result) {
        throw new Error('Formulario invalido');
      }

      return result;
    }
  }
};

</script>
