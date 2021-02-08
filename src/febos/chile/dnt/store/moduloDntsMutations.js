export default {
  SET_DNT_LIST(state, payload) {
    state.list = (payload.documentos || [])
      .reduce((index, option) => ({
        ...index,
        [option.febosId]: option
      }), {});
    state.pagination = {
      items: Number.parseInt(payload.totalElementos, 10),
      pages: Number.parseInt(payload.totalPaginas, 10)
    };
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_DETAIL_FILE(state, payload) {
    state.details = payload;
  },
  SET_WIZARD_DATA(state, payload) {
    state.wizardData = payload;
  },
  ADD_WIZARD_DATA(state, payload) {
    state.wizardData = {
      ...state.wizardData,
      ...payload
    };
  },
  CLEAR_WIZARD_DATA(state) {
    state.wizardData = {};
  },
  SET_DETAIL_DNT(state, payload) {
    state.details = payload;
  },
  SET_ATTACHMENTS_DNT(state, payload) {
    state.attachments = payload;
  },
  SET_SUCCESS_MESSAGE(state, payload) {
    state.successAction = payload;
  },
  SET_ERROR_MESSAGE(state, payload) {
    state.error = payload;
  },
  CLOSE_MODAL(state, payload) {
    state.showModal = payload;
  },
  SET_COMMENTS(state, payload) {
    state.comments = payload;
  },
  ADD_COMMENT(state, payload) {
    // add comment to array in state
    state.comments = state.comments.concat(payload);
  },
  SET_BINNACLE(state, payload) {
    state.binnacle = payload;
  }
};
