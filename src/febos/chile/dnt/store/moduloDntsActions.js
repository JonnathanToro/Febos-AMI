import { clDntsList, clDntDetails } from '@/febos/servicios/api/dnt.api';

export default {
  async listDocuments({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await clDntsList(payload);
    commit('SET_LISTADO_DNT', response.data);
    commit('SET_LOADING', false);
    return response.data;
  },
  async detailDnt({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await clDntDetails(payload);
    commit('SET_DETAIL_DNT', response.data);
    commit('SET_LOADING', false);
    return response.data;
  },
  actualizarPagina({ commit }, payload) {
    commit('ACT_PAGINA_BANDEJA', payload);
  },
};
