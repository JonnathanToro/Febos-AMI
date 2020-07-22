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
    if(storage && storage.Usuario && storage.Usuario.vencimiento) {
      return ahora < storage.Usuario.vencimiento;
    }else return false;
  },
  tokenDeUsuario: state  =>  {
    return state.token;
  }
}
