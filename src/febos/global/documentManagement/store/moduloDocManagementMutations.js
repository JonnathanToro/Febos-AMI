export default {
  ADD_ELEMENT_TREE(state, payload) {
    state.myRepository = [
      ...state.myRepository,
      payload
    ];
  },
  ENABLE_ELEMENT_TREE(state, payload) {
    state.myRepository = state.myRepository.map((repo) => {
      if (repo.febosId === payload.febosId) {
        return {
          ...repo,
          estado: '2'
        };
      }
      return repo;
    });
  },
  DISABLE_ELEMENT_TREE(state, payload) {
    state.myRepository = state.myRepository.map((repo) => {
      if (repo.febosId === payload.febosId) {
        return {
          ...repo,
          estado: '1'
        };
      }
      return repo;
    });
  },
  UNSUBSCRIBE_TO(state, payload) {
    state.myRepository = state.myRepository.map((repo) => {
      if (repo.febosId === payload.febosId) {
        return {
          ...repo,
          suscriptores: repo.suscriptores
            .filter((subscriber) => subscriber.nombre !== 'Letty Villamizar')
        };
      }
      return repo;
    });
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  }
};
