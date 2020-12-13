import {
  ioUserLogin,
  ioUserHeartbeat,
  isUserUpdate
} from '@/febos/servicios/api/usuarios.api';
import { ioUserPermissions } from '@/febos/servicios/api/permisos.api';

export default {
  async signIn({ commit }, payload) {
    console.log('payload', payload);
    try {
      const response = await ioUserLogin(payload.correo, payload.clave);
      if (response.data.codigo !== 10) throw response.data;
      commit('SET_USUARIO', response.data);
      commit('SET_TOKEN', response.data);

      return response.data;
    } catch (error) {
      console.log('ERROR', error, payload);
      return error;
    }
  },
  async heartbeat(payload) {
    await ioUserHeartbeat(payload.id);
  },
  async signOut({ commit }) {
    try {
      commit('LIMPIAR_SESION', {});
      return true;
    } catch (error) {
      console.log('ERROR', error);
      return false;
    }
  },
  async loadPermissions({ commit }, payload) {
    try {
      const response = await ioUserPermissions(payload.iut);
      if (response.data.codigo !== 10) throw response.data;
      commit('SET_PERMISOS', response.data);
      return response.data;
    } catch (error) {
      console.log('ERROR', error);
      return error;
    }
  },
  validateSession({ commit }) {
    const segundo = 1000;
    const minutos = 60 * segundo;
    commit('SET_ULTIMO_REQUEST', { ultimoRequest: new Date().getTime() });
    commit('SET_VENCIMIENTO_SESION', { vencimiento: new Date().getTime() + (14 * minutos) });
  },
  async updateProfile({ commit }, payload) {
    const response = await isUserUpdate(
      payload.id,
      payload.iut,
      payload.nombre,
      payload.alias,
      payload.correo
    );
    if (response.data.codigo !== 10) throw response.data;
    commit('SET_USUARIO', payload);
    return response.data;
  }
};
