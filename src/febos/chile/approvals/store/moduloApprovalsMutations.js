export default {
  SET_DNT_LIST(state, payload) {
    // TODO: test clean the list state before.
    state.list = (payload.documentos || [])
      .reduce((index, option) => ({
        ...index,
        [option.febosId]: option
      }), {});
    state.pagination = {
      items: Number.parseInt(payload.totalElementos, 10),
      pages: Number.parseInt(payload.totalPaginas, 10)
    };
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_SUCCESS_MESSAGE(state, payload) {
    state.successAction = payload;
  },
  SET_ERROR_MESSAGE(state, payload) {
    state.error = payload;
  },
  CLOSE_MODAL(state, payload) {
    state.showModal = payload;
  },
  SET_TRAY(state, payload) {
    state.trays = (payload || [])
      .reduce((index, option) => ({
        ...index,
        [option.idAprobacion]: option
      }), {});
    state.pagination = {
      items: Number.parseInt(payload.totalElementos, 10),
      pages: Number.parseInt(payload.totalPaginas, 10)
    };
  }
};
