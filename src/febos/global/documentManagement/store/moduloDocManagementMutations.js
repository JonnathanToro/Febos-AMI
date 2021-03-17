export default {
  ADD_ELEMENT_TREE(state, payload) {
    state.myRepository = [
      ...state.myRepository,
      payload
    ];
    state.element = payload;
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
          suscrito: 'no',
          suscriptores: repo.suscriptores
            .filter((subscriber) => subscriber.nombre !== 'Letty Villamizar')
        };
      }
      return repo;
    });
  },
  SUBSCRIBE_TO(state, payload) {
    console.log('SUBSTCIWERW', payload);
    state.myRepository = state.myRepository.map((repo) => {
      if (repo.febosId === payload.element.febosId) {
        return {
          ...repo,
          suscrito: 'si',
          suscriptores: [
            ...repo.suscriptores,
            payload.subNew
          ]
        };
      }
      return repo;
    });
  },
  ADD_COMMENT(state, payload) {
    state.myRepository = state.myRepository.map((repo) => {
      if (repo.febosId === payload.element.febosId) {
        return {
          ...repo,
          comentarios: [
            ...repo.comentarios,
            payload.comment
          ]
        };
      }
      return repo;
    });
    state.element = state.myRepository.find((repo) => {
      if (repo.febosId === payload.element.febosId) {
        return {
          ...repo,
          comentarios: [
            ...repo.comentarios,
            payload.comment
          ]
        };
      }
      return repo;
    });
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_ELEMENT(state, payload) {
    state.element = payload;
  }
};
