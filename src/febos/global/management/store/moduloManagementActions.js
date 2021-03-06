import store from '@/store/store';
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
      commit('SET_CONFIG_SHEET', []);
      store.commit('Empresas/SET_LOADING', true);
      const response = await getSheetsConfig(payload);
      commit('SET_CONFIG_SHEET', response.data);
      return response;
    } finally {
      store.commit('Empresas/SET_LOADING', false);
    }
  },
  async saveDocConfigSheet({ commit }, config) {
    commit('SET_CONFIG_SHEET', []);
    const response = await saveSheetsConfig({ id: config.referenciaId }, config);
    commit('SET_SUCCESS_MESSAGE', response.data);
    commit('SET_CONFIG_SHEET', response.data);
    return response;
  },
  updateConfig({ commit }, configDoc) {
    commit('UPDATE_CONFIG_DOC', configDoc);
  }
};
