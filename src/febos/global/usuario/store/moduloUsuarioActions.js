import {
  ioUserLogin,
  ioUserHeartbeat,
  isUserUpdate,
  ioGetAuthCode,
  updatePassword
} from '@/febos/servicios/api/usuarios.api';
import { ioUserPermissions } from '@/febos/servicios/api/permisos.api';

export default {
  async signIn({ commit }, payload) {
    const response = await ioUserLogin(payload.correo, payload.clave);
    commit('SET_USUARIO', response.data);
    commit('SET_TOKEN', response.data);

    return response.data;
  },
  async heartbeat({ getters: { currentUserId }, dispatch }) {
    await ioUserHeartbeat(currentUserId);
    dispatch('validateSession');
  },
  signOut({ commit }) {
    commit('LIMPIAR_SESION', {});
  },
  async loadPermissions({ commit, getters: { currentUser: { iut } } }) {
    const response = await ioUserPermissions(iut);
    commit('SET_PERMISOS', response.data);
    return response.data;
  },
  validateSession({ commit }) {
    const segundo = 1000;
    const minutos = 60 * segundo;
    commit('SET_ULTIMO_REQUEST', { ultimoRequest: new Date().getTime() });
    commit('SET_VENCIMIENTO_SESION', { vencimiento: new Date().getTime() + (50 * minutos) });
  },
  async updateProfile({ commit }, payload) {
    const response = await isUserUpdate(
      payload.id,
      payload.iut,
      payload.nombre,
      payload.alias,
      payload.correo,
      payload.avatar,
    );
    commit('SET_USUARIO', { usuario: payload });
    return response.data;
  },
  async getVerificationCode({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await ioGetAuthCode(payload);
    commit('SET_VERIFICATION_CODE', response.data.febosId);
    commit('SET_LOADING', false);
  },
  async changePassword({ commit }, passwords) {
    try {
      commit('SET_LOADING', true);
      await updatePassword(passwords);
      commit('SET_SUCCESS_MESSAGE', true);
    } finally {
      commit('SET_LOADING', false);
    }
  }
};
