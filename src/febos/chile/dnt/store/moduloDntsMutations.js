export default {
  SET_LISTADO_DNT(state, payload) {
    state.dnts = {};
    state.dnts = (payload.documentos || [])
      .reduce((index, option) => ({
        ...index,
        [option.febosId]: option
      }), {});
    state.paginaActual = payload.pagina;
    state.paginasTotales = payload.paginas;
    state.registrosEncontrados = payload.encontrados;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  }
};
