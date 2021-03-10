import store from '@/store/store';

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
