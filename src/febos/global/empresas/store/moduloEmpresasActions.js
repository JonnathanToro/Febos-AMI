import {
  ioCompanyList,
  ioCompanyGroups,
  getUsersByGroup
} from '@/febos/servicios/api/empresas.api';
import { getUsers } from '@/febos/servicios/api/usuarios.api';

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
    try {
      commit('SET_LOADING', true);
      const response = await getUsers(payload);
      commit('SET_USERS_COMPANY', response.data);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async getGroupsCompany({ commit }, payload) {
    const response = await ioCompanyGroups(payload);
    commit('SET_GROUPS_COMPANY', response.data.grupos);
  },
  async getUsersGroup({ commit, rootState }, groupId) {
    try {
      commit('SET_LOADING', true);
      const response = await getUsersByGroup({
        empresaId: rootState.Empresas.empresa.id,
        pagina: 1,
        filas: 10,
        groupId
      });
      commit('SET_USERS_GROUP', response.data);
    } finally {
      commit('SET_LOADING', false);
    }
  }
};
