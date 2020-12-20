export default {
  // TODO: use normalizr
  SET_TEMPLATES(state, payload) {
    let options = payload.opciones;
    options = options.map((template) => {
      // eslint-disable-next-line no-param-reassign
      template.extra = JSON.parse(template.extra);
      return template;
    });
    state.templates = (options || [])
      .reduce((index, option) => ({
        ...index,
        [option.opcionId]: option
      }), {});
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_SUCCESS_MESSAGE(state, payload) {
    state.successAccion = payload;
  },
  SET_ERROR_MESSAGE(state, payload) {
    state.error = payload;
  },
};
