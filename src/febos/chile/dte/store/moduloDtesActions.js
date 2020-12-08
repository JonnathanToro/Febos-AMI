import { clDtesList } from '@/febos/servicios/api/dte.api';

export default {
  async listarDocumentos({ commit }, payload) {
    commit('SET_CARGANDO', true);
    try {
      const response = await clDtesList(payload);
      commit('SET_LISTADO_DTE', response.data);
      commit('SET_CARGANDO', false);
      if (response.data.codigo !== 10) throw response.data;
      return response.data;
    } catch (error) {
      console.log('ERROR', error);
      return error;
    }
  },
  setDocumentoActual({ commit }, payload) {
    commit('SET_DOCUMENTO_ACTUAL', payload);
  },
  // TODO: find better name.
  setIssue({ commit }, payload) {
    commit('SET_ISSUE', payload);
  }
};
