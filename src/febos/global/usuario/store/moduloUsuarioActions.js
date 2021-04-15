import {
  ioUserLogin,
  ioUserHeartbeat,
  isUserUpdate,
  ioGetAuthCode,
  updatePassword,
  ioUpdateUser,
  ioCreateUser,
  ioGetFileCode,
  getSharedFile
} from '@/febos/servicios/api/usuarios.api';
import { ioUserPermissions } from '@/febos/servicios/api/permisos.api';
import store from '@/store/store';

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
    commit('LIMPIAR_SESION');
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
    commit('SET_VENCIMIENTO_SESION', { vencimiento: new Date().getTime() + (14 * minutos) });
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
  async updateUserComppany({ commit }, user) {
    try {
      commit('SET_LOADING', true);
      await ioUpdateUser({
        simular: 'no',
        usuarioId: user.id
      }, user);
      store.commit('Empresas/UPDATE_USER', user);
      store.commit('Modals/CLOSE_MODAL');
      commit('SET_SUCCESS_MESSAGE', true);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async ioGetFileCodeVerification({ commit }, identification) {
    try {
      commit('SET_SHARED_FILE', {});
      commit('SET_LOADING', true);
      const response = await ioGetFileCode(identification);
      commit('SET_VERIFICATION_CODE', response.data.id);
      commit('SET_SUCCESS_MESSAGE', true);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async verifySharedFile({ commit }, payload) {
    try {
      commit('SET_SHARED_FILE', {});
      commit('SET_LOADING', true);
      const response = await getSharedFile(payload);
      commit('SET_SHARED_FILE', response.data);
      commit('SET_LOADING', false);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async createUserCompany({ commit }, user) {
    try {
      commit('SET_LOADING', true);
      await ioCreateUser({
        simular: 'no'
      }, user);
      store.commit('Empresas/ADD_USER', user);
      store.commit('Modals/CLOSE_MODAL');
      commit('SET_SUCCESS_MESSAGE', true);
    } finally {
      commit('SET_LOADING', false);
    }
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
