import {
  ioCompanyList,
  ioCompanyGroups,
  getUsersByGroup,
  ioCompanyUpdateGroup,
  ioCompanyCreateGroup,
  ioCompanyUpdateUsersGroup
} from '@/febos/servicios/api/empresas.api';
import { getUsers } from '@/febos/servicios/api/usuarios.api';
import { ioListConfigurations, ioSaveConfiguration } from '@/febos/servicios/api/herramientas.api';
import store from '@/store/store';

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
  },
  async getUsersGroup({ commit }, payload) {
    try {
      commit('SET_LOADING', true);
      const response = await getUsersByGroup(payload);
      commit('SET_USERS_GROUP', response.data);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async updateGroup({ commit }, { empresaId, group }) {
    // commit('UPDATE_GROUP', group);

    try {
      commit('SET_LOADING', true);
      const response = await ioCompanyUpdateGroup(empresaId, group);
      commit('UPDATE_GROUP', group);
      store.commit('Modals/CLOSE_MODAL');
      return response.data;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async createGroup({ commit }, { empresaId, group }) {
    try {
      commit('SET_LOADING', true);
      const response = await ioCompanyCreateGroup(empresaId, group);
      commit('ADD_GROUP', response.data.grupo);
      store.commit('Modals/CLOSE_MODAL');
      return response.data;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async setElement({ commit }, payload) {
    commit('SET_ELEMENT', payload);
  },
  async addUserToGroup({ commit }, { empresaId, body }) {
    try {
      commit('SET_LOADING', true);
      const response = await ioCompanyUpdateUsersGroup(empresaId,
        { grupoId: body.grupoId, usuarios: body.usuarios });
      commit('ADD_USER_GROUP', body.user);
      // store.commit('Modals/CLOSE_MODAL');
      return response.data;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async removeUserToGroup({ commit }, { empresaId, body }) {
    try {
      commit('SET_LOADING', true);
      const response = await ioCompanyUpdateUsersGroup(empresaId,
        { grupoId: body.grupoId, usuarios: body.usuarios });
      commit('REMOVE_USER_GROUP', body.user);
      // store.commit('Modals/CLOSE_MODAL');
      return response.data;
    } finally {
      commit('SET_LOADING', false);
    }
  }
};
