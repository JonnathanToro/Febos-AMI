import { listOptions, saveOption } from '@/febos/servicios/api/opciones.api';

const successResponse = (response) => response.data.codigo !== 10 || response.data.codigo !== '10';
export default {
  async listCategories({ commit }) {
    try {
      commit('SET_LOADING', true);
      const response = await listOptions({
        // grupoOpcion: 'tipos.documentos.escritorio.digital',
        grupoOpcion: 'proyecto.subtitulos',
        deshabilitado: 'si'
      });
      if (!successResponse(response)) throw response.data;
      commit('SET_OPCIONES_CATEGORIES', response.data);
      commit('SET_LOADING', false);
      return response.data;
    } catch (error) {
      commit('SET_LOADING', false);
      commit('SET_ERROR_MESSAGE', error.mensaje);
      return error;
    }
  },

  async listDocuments({ commit }, payload) {
    try {
      commit('SET_CATEGORY', payload);
      commit('SET_LOADING', true);
      const response = await listOptions({
        // grupoOpcion: 'tipos.documentos.escritorio.digital',
        grupoOpcion: `proyecto.subtitulos.${ payload.valor }.item`,
        deshabilitado: 'si'
      });
      if (!successResponse(response)) throw response.data;
      commit('SET_OPCIONES_DOCUMENTOS', response.data);
      commit('SET_LOADING', false);
      return response.data;
    } catch (error) {
      commit('SET_LOADING', false);
      commit('SET_ERROR_MESSAGE', error.mensaje);
      return error;
    }
  },

  clearDocuments({ commit }) {
    commit('SET_OPCIONES_DOCUMENTOS', []);
    commit('SET_CATEGORY', {});
  },

  async toggleEnableOption({ commit }, payload) {
    const option = {
      ...payload.option,
      deshabilitado: payload.selected ? 1 : 0
    };

    console.log(option);

    commit(`UPDATE_OPTION_${payload.type.toUpperCase()}`, { option });
  },

  async saveOptions({ commit }, payload) {
    try {
      commit('SET_LOADING', true);
      const response = await saveOption(payload);
      if (!successResponse(response)) throw response.data;
      commit('SET_LOADING', false);
      commit('SET_SUCCESS_MESSAGE', true);
      return response.data;
    } catch (error) {
      commit('SET_LOADING', false);
      commit('SET_ERROR_MESSAGE', error.mensaje);
      return error;
    }
  }
};
