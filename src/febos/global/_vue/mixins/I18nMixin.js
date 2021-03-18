import i18n from '../../../servicios/i18n';

export default {
  methods: {
    t(palabraClave) {
      const valor = i18n[process.env.VUE_APP_CODIGO_PAIS][palabraClave];
      return valor || `{{ ${palabraClave} }}`;
    },
  }
};
