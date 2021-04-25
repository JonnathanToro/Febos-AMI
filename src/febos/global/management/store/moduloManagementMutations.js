export default {
  SET_CONFIG_SHEET(state, payload) {
    state.configSheet = payload;
  },
  SET_ALL_DOCUMENTS(state, payload) {
    state.allDocuments = payload
      .map((option) => ({
        id: option.opcionId,
        value: option.valor,
        label: option.descripcion,
        groupId: option.grupoId,
        configId: option.opcionId,
        configNombre: option.descripcion,
        initialSheet: '',
        prefix: '',
        renew: '',
        configured: false
      }))
      .reduce((index, option) => ({
        ...index,
        [option.id]: option
      }), {});
  },
  UPDATE_CONFIG_DOC(state, payload) {
    state.allDocuments[payload.id] = payload;
  }
};
