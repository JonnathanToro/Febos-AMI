import {
  ioCompanyList,
  ioCompanyGroups
} from '@/febos/servicios/api/empresas.api';
import { getUsers } from '@/febos/servicios/api/usuarios.api';
import { ioListConfigurations, ioSaveConfiguration } from '@/febos/servicios/api/herramientas.api';

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
  // TODO: change name to update
  selectCompany({ commit }, payload) {
    commit('SET_EMPRESA', payload);
  },
  async getUsersCompany({ commit }, payload) {
    const response = await getUsers(payload);
    commit('SET_USERS_COMPANY', response.data.usuarios);
  },
  async getGroupsCompany({ commit }, payload) {
    const response = await ioCompanyGroups(payload);
    commit('SET_GROUPS_COMPANY', response.data.grupos);
  },
  async loadConfigurations({ commit }, payload = {}) {
    commit('SET_LOAD_CONFIGURATIONS', true);
    try {
      const response = await ioListConfigurations(payload);
      commit('SET_CONFIGURATIONS', response.data.configuraciones);
    } finally {
      commit('SET_LOAD_CONFIGURATIONS', false);
    }
  },
  async saveConfiguration({ commit }, requestParams = { params: {}, body: {} }) {
    commit('SET_SAVING_CONFIGURATIONS', true);
    try {
      return await ioSaveConfiguration(requestParams.params, requestParams.body);
    } finally {
      commit('SET_SAVING_CONFIGURATIONS', false);
    }
  }
};
