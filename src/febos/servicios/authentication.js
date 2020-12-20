import { getters } from '../global/usuario/store/moduloUsuarioStore';
import store from '../../store/store';

export const hasPermission = (route) => {
  if (route.meta.permiso) {
    return getters.hasPermission(store.state.Usuario)(route.meta.permiso);
  }

  return true;
};

export const isLogged = () => getters.isSessionAlive(store.state.Usuario);
