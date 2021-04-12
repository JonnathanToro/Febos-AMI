import { listOptions, saveOption } from '@/febos/servicios/api/opciones.api';

const successResponse = (response) => response.data.codigo !== 10 || response.data.codigo !== '10';
export default {
  async listCategories({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await listOptions(payload);
    if (payload.grupoOpcion.includes('instituciones')) {
      commit('SET_OPCIONES_CATEGORIES_INSTITUTIONS', response.data);
    } else if (payload.grupoOpcion.includes('destinos')) {
      commit('SET_OPCIONES_CATEGORIES_SUBJECTS', response.data);
    } else if (payload.grupoOpcion.includes('destinos')) {
      commit('SET_OPCIONES_CATEGORIES_SUBJECTS', response.data);
    } else if (payload.grupoOpcion.includes('actividades')) {
      commit('SET_OPCIONES_CATEGORIES_ACTIVITIES', response.data);
    } else {
      commit('SET_OPCIONES_CATEGORIES', response.data);
    }
    commit('SET_LOADING', false);
    return response.data;
  },

  async listDocuments({ commit }, payload) {
    commit('SET_CATEGORY', payload);
    commit('SET_LOADING', true);
    const response = await listOptions({
      // grupoOpcion: 'tipos.documentos.escritorio.digital',
      grupoOpcion: `tipos.documentos-ed.${ payload.valor }.item`,
      deshabilitado: 'si'
    });
    commit('SET_OPCIONES_DOCUMENTOS', response.data);
    commit('SET_LOADING', false);
    return response.data;
  },
  async listSubjects({ commit }, payload) {
    commit('SET_SUBJECT', payload);
    commit('SET_LOADING', true);
    const response = await listOptions({
      grupoOpcion: `tipos.destinos-ed.${ payload.valor }.item`,
      deshabilitado: 'si'
    });
    commit('SET_OPCIONES_SUBJECTS', response.data);
    commit('SET_LOADING', false);
    return response.data;
  },
  async listInstitutions({ commit }, payload) {
    try {
      commit('SET_INSTITUTION', payload);
      commit('SET_LOADING', true);
      const response = await listOptions({
        // grupoOpcion: 'tipos.documentos-ed. ---- .item',
        grupoOpcion: `tipos.instituciones-ed.${ payload.valor }.item`,
        deshabilitado: 'si'
      });
      if (!successResponse(response)) throw response.data;
      commit('SET_OPCIONES_INSTITUTIONS', response.data);
      commit('SET_LOADING', false);
      return response.data;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async listActivities({ commit }, payload) {
    try {
      commit('SET_ACTIVITY', payload);
      commit('SET_LOADING', true);
      console.log('JODER', payload);
      const response = await listOptions({
        // grupoOpcion: 'tipos.documentos-ed. ---- .item',
        grupoOpcion: `tipos.actividades-ed.${ payload.valor }.item`,
        deshabilitado: 'si'
      });
      if (!successResponse(response)) throw response.data;
      commit('SET_OPCIONES_ACTIVITIES', response.data);
      commit('SET_LOADING', false);
      return response.data;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  clearDocuments({ commit }) {
    commit('SET_OPCIONES_DOCUMENTOS', []);
    commit('SET_CATEGORY', {});
  },

  clearSubjects({ commit }) {
    commit('SET_OPCIONES_SUBJECTS', []);
    commit('SET_SUBJECT', {});
  },

  clearInstitutions({ commit }) {
    commit('SET_OPCIONES_INSTITUTIONS', []);
    commit('SET_INSTITUTION', {});
  },
  clearActivities({ commit }) {
    commit('SET_OPCIONES_ACTIVITIES', []);
    commit('SET_ACTIVITY', {});
  },

  async saveOptions({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await saveOption(payload);
    commit('SET_LOADING', false);
    commit('SET_SUCCESS_MESSAGE', true);
    return response.data;
  },

  async toggleEnableOption({ commit }, payload) {
    const option = {
      ...payload.option,
      deshabilitado: payload.selected ? 1 : 0
    };

    try {
      commit('SET_LOADING', true);
      const response = await saveOption(option);
      if (!successResponse(response)) throw response.data;
      commit('SET_LOADING', false);
      commit(`UPDATE_OPTION_${payload.type.toUpperCase()}`, { option });
      commit('SET_SUCCESS_MESSAGE', true);
      return response.data;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async toggleEnableOptionSubject({ commit }, payload) {
    const option = {
      ...payload.option,
      deshabilitado: payload.selected ? 1 : 0
    };

    try {
      commit('SET_LOADING', true);
      const response = await saveOption(option);
      if (!successResponse(response)) throw response.data;
      commit('SET_LOADING', false);
      if (payload.type === 'category') {
        commit('UPDATE_OPTION_SUBJECT_CATEGORY', { option });
      } else {
        commit('UPDATE_OPTION_SUBJECT', { option });
      }
      commit('SET_SUCCESS_MESSAGE', true);
      return response.data;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async toggleEnableOptionInstitution({ commit }, payload) {
    const option = {
      ...payload.option,
      deshabilitado: payload.selected ? 1 : 0
    };

    try {
      commit('SET_LOADING', true);
      const response = await saveOption(option);
      if (!successResponse(response)) throw response.data;
      commit('SET_LOADING', false);
      if (payload.type === 'category') {
        commit('UPDATE_OPTION_INSTITUTION_CATEGORY', { option });
      } else {
        commit('UPDATE_OPTION_INSTITUTION', { option });
      }
      commit('SET_SUCCESS_MESSAGE', true);
      return response.data;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async toggleEnableOptionActivity({ commit }, payload) {
    const option = {
      ...payload.option,
      deshabilitado: payload.selected ? 1 : 0
    };

    try {
      commit('SET_LOADING', true);
      const response = await saveOption(option);
      if (!successResponse(response)) throw response.data;
      commit('SET_LOADING', false);
      if (payload.type === 'category') {
        commit('UPDATE_OPTION_ACTIVITY_CATEGORY', { option });
      } else {
        commit('UPDATE_OPTION_ACTIVITY', { option });
      }
      commit('SET_SUCCESS_MESSAGE', true);
      return response.data;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async clearSelected({ commit }, payload) {
    commit(`SET_${payload.type}`, payload.option);
  }
};
