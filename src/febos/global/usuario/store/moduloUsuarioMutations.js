
export default {
  SET_USUARIO (state, payload) {
    state.id=payload.usuario.id;
    state.nombre=payload.usuario.nombre;
    state.iut=payload.usuario.iut;
    state.correo=payload.usuario.correo;
    state.alias=payload.usuario.alias;
    state.avatar=payload.usuario.avatar;
    state.cambiarClave=payload.usuario.cambiarClave;
    state.estado=payload.usuario.estado;
    state.token=payload.token;
  }
}
