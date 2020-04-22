

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
    if(!state.autenticacion){
      state.autenticacion={};
    }
    state.autenticacion.token=payload.token;
  },
  SET_TOKEN(state,payload){
    state.token=payload.token;
  },
  SET_ULTIMO_REQUEST(state,payload){
    state.ultimoUso=payload.ultimoRequest;
  },
  SET_VENCIMIENTO_SESION(state,payload){
    state.vencimiento=payload.vencimiento;
  },
  SET_PERMISOS(state,payload){
    let permisos=[];
    payload.permisos.forEach(function(item,index){
      permisos.push(item.codigo);
    });
    state.permisos=permisos;
  }
}
