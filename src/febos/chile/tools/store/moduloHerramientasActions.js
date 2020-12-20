import { listOptions, saveOption } from '@/febos/servicios/api/opciones.api';

const successResponse = (response) => response.data.codigo !== 10 || response.data.codigo !== '10';
export default {
  async listCategories({ commit }) {
    commit('SET_LOADING', true);
    const response = await listOptions({
      // grupoOpcion: 'tipos.documentos.escritorio.digital',
      grupoOpcion: 'proyecto.subtitulos',
      deshabilitado: 'si'
    });
    commit('SET_OPCIONES_CATEGORIES', response.data);
    commit('SET_LOADING', false);
    return response.data;
  },

  async listDocuments({ commit }, payload) {
    commit('SET_CATEGORY', payload);
    commit('SET_LOADING', true);
    const response = await listOptions({
      // grupoOpcion: 'tipos.documentos.escritorio.digital',
      grupoOpcion: `proyecto.subtitulos.${ payload.valor }.item`,
      deshabilitado: 'si'
    });
    commit('SET_OPCIONES_DOCUMENTOS', response.data);
    commit('SET_LOADING', false);
    return response.data;
  },

  clearDocuments({ commit }) {
    commit('SET_OPCIONES_DOCUMENTOS', []);
    commit('SET_CATEGORY', {});
  },

  async saveOptions({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await saveOption(payload);
    commit('SET_LOADING', false);
    commit('SET_SUCCESS_MESSAGE', true);
    return response.data;
  },

  async toggleEnableOption({ commit }, payload) {
    const option = {
      ...payload.option,
      deshabilitado: payload.selected ? 1 : 0
    };

    try {
      commit('SET_LOADING', true);
      const response = await saveOption(option);
      if (!successResponse(response)) throw response.data;
      commit('SET_LOADING', false);
      commit(`UPDATE_OPTION_${payload.type.toUpperCase()}`, { option });
      commit('SET_SUCCESS_MESSAGE', true);
      return response.data;
    } catch (error) {
      commit('SET_LOADING', false);
      commit('SET_ERROR_MESSAGE', error.mensaje);
      return error;
    }
  }
};
