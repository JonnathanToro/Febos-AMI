import { listOptions, saveOption, getOption } from '@/febos/servicios/api/opciones.api';

export default {

  async listTemplates({ commit }, group) {
    commit('SET_LOADING', true);
    const response = await listOptions({
      grupoOpcion: group,
      deshabilitado: 'si'
    });
    commit('SET_TEMPLATES', response.data);
    commit('SET_LOADING', false);
    return response.data;
  },
  async getTemplateById({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await getOption({
      febosId: payload
    });

    const {
      descripcion: name,
      valor: type,
      extra,
      parametroId,
      grupoId,
      // eslint-disable-next-line no-unused-vars
      ...ignored
    } = response.data.opcion;

    const template = {
      name,
      type,
      parametroId,
      grupoId
    };

    if (extra) {
      const {
        descripcion: description,
        schema
      } = JSON.parse(extra);
      template.description = description;
      template.schema = schema;
    }
    commit('SET_SCHEMA', template.schema);
    commit('SET_TEMPLATE', template);
    commit('SET_LOADING', false);
  },
  changeTemplate({ commit }, payload) {
    commit('SET_TEMPLATE', payload);
  },
  changeSchema({ commit }, payload) {
    commit('SET_SCHEMA_CHANGES', payload);
  },
  clearTemplate({ commit }) {
    commit('CLEAR_TEMPLATE');
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
    const response = await saveOption(option);
    commit('SET_LOADING', false);
    // commit(`UPDATE_OPTION_${payload.type.toUpperCase()}`, { option });
    commit('SET_SUCCESS_MESSAGE', true);
    return response.data;
  }
};
