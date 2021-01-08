import { clDntsList } from '@/febos/servicios/api/dnt.api';
import { fileDetails } from '@/febos/servicios/api/aprobaciones.api';
import { ioDownloadPrivateFile } from '@/febos/servicios/api/herramientas.api';

export default {
  async listDocuments({ commit }, payload) {
    commit('SET_LOADING', true);
    try {
      const response = await clDntsList(payload);
      commit('SET_LISTADO_DNT', response.data);
      commit('SET_LOADING', false);
      if (response.data.codigo !== 10) throw response.data;
      return response.data;
    } catch (error) {
      console.log('ERROR', error);
      return error;
    }
  },
  actualizarPagina({ commit }, payload) {
    commit('ACT_PAGINA', payload);
  },
  async getFileDetails({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await fileDetails(payload);
    commit('SET_DETAIL_FILE', response.data);
    commit('SET_LOADING', false);
  },
  async downloadFilePDF({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await fileDetails(payload);
    window.open(response.data.pdfUrl, '_blank');
    commit('SET_LOADING', false);
    return response.data;
  },
  async downloadPrivateFile({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await ioDownloadPrivateFile(payload);
    window.open(response.data.url, '_blank');
    commit('SET_LOADING', false);
    return response.data;
  }
};
