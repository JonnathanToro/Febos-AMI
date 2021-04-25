import { getSheetsConfig, saveSheetsConfig } from '@/febos/servicios/api/dnt.api';
import { listOptions } from '@/febos/servicios/api/opciones.api';

export default {
  async fetchAllDocuments({ commit }) {
    const response = await listOptions({
      grupoOpcion: 'tipos.documentos-ed',
      deshabilitado: 'no',
      agrupar: 'si'
    });

    commit('SET_ALL_DOCUMENTS', response.data.opciones);
  },
  async getDocConfigSheet({ commit }, payload) {
    try {
      commit('SET_CONFIG_SHEET', {});
      // commit('SET_LOADING', true);
      const response = await getSheetsConfig(payload);
      commit('SET_CONFIG_SHEET', response.data);
      return response;
    } finally {
      // commit('SET_LOADING', false);
    }
  },
  async saveDocConfigSheet({ commit }, config) {
    console.log('ACTION', config);
    try {
      commit('SET_CONFIG_SHEET', {});
      // commit('SET_LOADING', true);
      const response = await saveSheetsConfig({ id: config.id }, config.config);
      commit('SET_CONFIG_SHEET', config);
      this.$refs.sheetsConfig.close();
      return response;
    } finally {
      // commit('SET_LOADING', false);
    }
  },
  updateConfig({ commit }, configDoc) {
    commit('UPDATE_CONFIG_DOC', configDoc);
  }
};
