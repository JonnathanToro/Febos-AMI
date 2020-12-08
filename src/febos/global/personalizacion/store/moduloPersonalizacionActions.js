export default {
  async loadSettings({ commit }, payload) {
    commit('SET_PERSONALIZACION', payload);
  }
};
