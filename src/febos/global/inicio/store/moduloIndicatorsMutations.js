export default {
  SET_INDICATORS_LOADING(state, payload) {
    state.indicators.loading = payload;
  },
  SET_INDICATORS(state, payload) {
    state.indicators.types = payload;
  }
};
