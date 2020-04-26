import moduloUsuarios from "../global/usuario/store/moduloUsuarioStore";

const autenticacion = {
  tienePermiso: function (ruta) {
    if (ruta.meta.permiso) {
      return true;
    } else {
      // si la vista no requiere permiso, se deja el paso libre
      return true;
    }
  },
  estaLogueado: function () {
      return moduloUsuarios.getters.sesionEstaActiva();
  }
}

export default autenticacion
