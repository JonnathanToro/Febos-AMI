import {
  clDntsList
} from '@/febos/servicios/api/dnt.api';
import {
  clTraysList
} from '@/febos/servicios/api/aprobaciones.api';

export const listDocuments = async ({ commit }, { data }) => {
  try {
    commit('SET_DNT_LIST', []);
    commit('SET_LOADING', true);
    const service = clDntsList;
    const response = await service(data);
    commit('SET_DNT_LIST', response.data);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const listTrays = async ({ commit }, { data }) => {
  try {
    commit('SET_TRAY', []);
    commit('SET_LOADING', true);
    const service = clTraysList;
    const response = await service(data);
    commit('SET_TRAY', response.data.bandejaEntradaList);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};
