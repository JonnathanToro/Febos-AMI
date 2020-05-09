export default {
  SET_LISTADO_DTE (state, payload) {
    state.documentos=payload.documentos;
    state.paginaActual=payload.pagina;
    state.paginasTotales=payload.paginas;
  },
  SET_CARGANDO(state,payload){
    state.cargando=payload;
  },
  SET_DOCUMENTO_ACTUAL(state,payload){
    state.documentoActual=payload;
  }
}
