export default {
  SET_LISTADO_EMPRESAS (state, payload) {
    state.empresas=payload.empresas;
  },
  SET_EMPRESA(state,payload){
    state.empresa=payload;
  }
}
