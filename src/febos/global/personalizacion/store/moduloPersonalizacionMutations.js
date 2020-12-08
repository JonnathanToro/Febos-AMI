export default {
  SET_PERSONALIZACION(state, payload) {
    state.colores = payload.colores;
    state.menu = payload.menu;
    state.ingreso = payload.ingreso;
    state.general = payload.general;
  }
};
