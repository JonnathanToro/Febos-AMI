export const showModals = async ({ commit }, payload) => {
  commit('OPEN_MODAL', payload);
};

export const closeModal = async ({ commit }) => {
  commit('CLOSE_MODAL');
};
