export default {
  SET_MENU(state,payload){
    state.menus=[
      ...state.inicio,
      ...payload
    ]
  },
  SET_MODULO_ACTUAL(state,payload){
    state.moduloActual=payload;
  }
}
