export default {
  SET_LISTADO_DNT(state, payload) {
    state.dnts = {};
    state.dnts = (payload.documentos || [])
      .reduce((index, option) => ({
        ...index,
        [option.febosId]: option
      }), {});
    state.paginaActual = Number.parseInt(payload.paginaActual, 10);
    state.paginasTotales = payload.totalPaginas;
    state.registrosEncontrados = payload.totalElementos;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_DETAIL_FILE(state, payload) {
    state.details = payload;
  },
  ACT_PAGINA(state, payload) {
    state.paginaActual = payload;
  },
  SET_SUCCESS_MENSAJE(state, payload) {
    state.successAccion = payload;
  },
  SET_ERROR_MENSAJE(state, payload) {
    state.error = payload;
  },
  CLOSE_MODAL(state, payload) {
    state.showModal = payload;
  }
};
