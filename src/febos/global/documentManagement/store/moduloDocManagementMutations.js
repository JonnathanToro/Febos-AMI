export default {
  ADD_ELEMENT_TREE(state, payload) {
    state.myRepository = [
      ...state.myRepository,
      payload
    ];
  },
  ENABLE_ELEMENT_TREE(state, payload) {
    const enable = {
      ...payload,
      estado: '2'
    };
    const foundIndex = state.myRepository.findIndex((repo) => repo.febosId === enable.febosId);
    state.myRepository[foundIndex] = enable;
  },
  DISABLE_ELEMENT_TREE(state, payload) {
    const disable = {
      ...payload,
      estado: '1'
    };
    const foundIndex = state.myRepository.findIndex((repo) => repo.febosId === disable.febosId);
    state.myRepository[foundIndex] = disable;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  }
};
