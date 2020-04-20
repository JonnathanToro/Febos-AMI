export default {
  _buscarPermiso: state => (codigoPermiso) => state.permisos.find((permiso) => permiso.codigo === codigoPermiso),
  tienePermiso: (state,getters) => (codigoPermiso) => {
    return getters._buscarPermiso(codigoPermiso).length === 1
  },
  usuarioActual: state => {
    return state;
  },
  sesionEstaActiva: () =>  {
    let ahora=new Date().getTime();
    let storage=JSON.parse(localStorage.getItem(`${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`));
    if(storage.usuario.vencimiento) {
      return ahora < storage.usuario.vencimiento;
    }else return false;
  },
  tokenDeUsuario: state  =>  {
    return state.token;
  }
}
