import moduloUsuarios from '../global/usuario/store/moduloUsuarioStore';
import store from '../../store/store';

export const hasPermission = (route) => {
  if (route.meta.permiso) {
    return true;
  }

  return true;
};

export const isLogged = () => moduloUsuarios.getters.isSessionAlive(store.state.Usuario);
