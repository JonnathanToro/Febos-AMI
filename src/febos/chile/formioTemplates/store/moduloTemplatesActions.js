import { listOptions, saveOption } from '@/febos/servicios/api/opciones.api';

export default {

  async listTemplates({ commit }) {
    commit('SET_LOADING', true);
    const response = await listOptions({
      grupoOpcion: 'ed.personalizados.plantillas',
      deshabilitado: 'si'
    });
    commit('SET_TEMPLATES', response.data);
    commit('SET_LOADING', false);
    return response.data;
  },

  async saveTemplateFormio({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await saveOption(payload);
    commit('SET_LOADING', false);
    commit('SET_SUCCESS_MESSAGE', true);
    return response.data;
  },

  async toggleEnableTemplate({ commit }, payload) {
    const option = {
      ...payload.option,
      deshabilitado: payload.selected ? 1 : 0
    };

    commit('SET_LOADING', true);
    console.log('SWITCH', option);
    const response = await saveOption(option);
    commit('SET_LOADING', false);
    // commit(`UPDATE_OPTION_${payload.type.toUpperCase()}`, { option });
    commit('SET_SUCCESS_MESSAGE', true);
    return response.data;
  }
};
