export default {
  SET_LISTADO_DTE(state, payload) {
    state.documentos = [];
    state.documentos = payload.documentos;
    state.paginaActual = payload.pagina;
    state.paginasTotales = payload.paginas;
    state.registrosEncontrados = payload.encontrados;
  },
  SET_CARGANDO(state, payload) {
    state.cargando = payload;
  },
  SET_DOCUMENTO_ACTUAL(state, payload) {
    state.documentoActual = payload;
  },
  SET_LIMPIAR_LISTADO(state) {
    state.documentos = [];
    state.paginaActual = 1;
    state.paginasTotales = 1;
  },
  SET_ISSUE(state, payload) {
    state.emision = payload;
  }
};
