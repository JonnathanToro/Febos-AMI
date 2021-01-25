export default {
  OPEN_MODAL(state, payload) {
    state.modalName = payload;
  },
  CLOSE_MODAL(state) {
    state.modalName = '';
  },
};
