import store from '@/store/store';
import router from '@/router';
import { getFile } from '@/febos/servicios/api/dnt.api';

export const addElement = async ({ commit }, payload) => {
  commit('ADD_ELEMENT_TREE', payload);
  store.commit('Modals/CLOSE_MODAL');
};

export const publishElement = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  commit('ENABLE_ELEMENT_TREE', payload);
  setTimeout(() => commit('SET_LOADING', false), 2000);
};

export const disableElement = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  commit('DISABLE_ELEMENT_TREE', payload);
  setTimeout(() => commit('SET_LOADING', false), 2000);
};

export const unSubscribeTo = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  commit('UNSUBSCRIBE_TO', payload);
  setTimeout(() => commit('SET_LOADING', false), 2000);
};

export const subscribeTo = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  console.log('ACTopm', payload);
  commit('SUBSCRIBE_TO', payload);
  setTimeout(() => commit('SET_LOADING', false), 2000);
};

export const goToFlow = async ({ commit }) => {
  commit('SET_LOADING', true);
  const path = '/documentos/flujo/68483ee2201b324e08295632f39fb0458e66';
  await router.push({ path });
  setTimeout(() => commit('SET_LOADING', false), 2000);
};

export const leaveComment = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  commit('ADD_COMMENT', payload);
  setTimeout(() => commit('SET_LOADING', false), 2000);
};

export const downloadFilePDF = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await getFile(payload);
    window.open(response.data.imagenLink, '_blank');
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const setElement = ({ commit }, payload) => {
  commit('SET_ELEMENT', payload);
};
