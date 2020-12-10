import { clDntsList } from '@/febos/servicios/api/dnt.api';

export default {
  async listDocuments({ commit }, payload) {
    commit('SET_CARGANDO', true);
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
  }
};
