export default {
  SET_INDICATORS_LOADING(state, payload) {
    state.indicators.loading = payload;
  },
  SET_GLOBAL_INDICATORS(state, payload) {
    state.indicators.global = payload.global || {};
  },
  SET_PERSONAL_INDICATORS(state, payload) {
    state.indicators.personal = payload.personal || {};
  }
};
