import { ioCompanyList } from '@/febos/servicios/api/empresas.api';

export default {
  async loadCompanies({ commit }, payload) {
    try {
      const response = await ioCompanyList(
        payload.pagina,
        payload.filas,
        payload.busquedaSimple,
        `${process.env.VUE_APP_PORTAL}`,
        window.location.hostname
      );

      if (response.data.codigo !== 10) throw response.data;
      commit('SET_LISTADO_EMPRESAS', response.data);
      return response.data;
    } catch (error) {
      console.log('ERROR', error);
      return error;
    }
  },
  selectCompany({ commit }, payload) {
    commit('SET_EMPRESA', payload);
  }
};
