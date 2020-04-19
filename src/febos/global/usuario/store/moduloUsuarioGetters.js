export default {
  _buscarPermiso: (state) => (codigoPermiso) => state.permisos.find((permiso) => permiso.codigo === codigoPermiso),
  tienePermiso: (state,getters) => (codigoPermiso) => {
    return getters._buscarPermiso(codigoPermiso).length === 1
  },
  usuarioActual: (state) => {
    return state;
  }
}
