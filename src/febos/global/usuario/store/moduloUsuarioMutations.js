export default {
  LIMPIAR_SESION(state) {
    // TODO: try to use the initial state
    state.id = undefined;
    state.nombre = undefined;
    state.iut = undefined;
    state.correo = undefined;
    state.alias = undefined;
    state.avatar = undefined;
    state.cambiarClave = undefined;
    state.estado = undefined;
    state.successAction = false;
    state.loading = false;
    state.token = undefined;
    state.vencimiento = undefined;
  },
  SET_USUARIO(state, payload) {
    state.id = payload.usuario.id;
    state.nombre = payload.usuario.nombre;
    state.iut = payload.usuario.iut;
    state.correo = payload.usuario.correo;
    state.alias = payload.usuario.alias;
    state.avatar = payload.usuario.avatar || '';
    state.cambiarClave = payload.usuario.cambiarClave;
    state.estado = payload.usuario.estado;
  },
  SET_TOKEN(state, payload) {
    state.token = payload.token;
  },
  SET_ULTIMO_REQUEST(state, payload) {
    state.ultimoUso = payload.ultimoRequest;
  },
  SET_VENCIMIENTO_SESION(state, payload) {
    state.vencimiento = payload.vencimiento;
  },
  SET_PERMISOS(state, payload) {
    const permisos = [];
    payload.permisos.forEach((item) => {
      permisos.push(item.codigo);
    });
    state.permisos = permisos;
  },
  SET_VERIFICATION_CODE(state, payload) {
    state.verificationCode = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_SUCCESS_MESSAGE(state, payload) {
    state.successAction = payload;
  }
};
