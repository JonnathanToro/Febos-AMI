export default {
  SET_DNT_LIST(state, payload) {
    // TODO: test clean the list state before.
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
  UPDATE_CANCELED_DNT(state, payload) {
    state.list[payload.febosId].estado = '8';
  },
  UPDATE_PROCESSED_DNT(state, payload) {
    state.list[payload.febosId].estado = '9';
  },
  UPDATE_ASIGNED_FILE(state, febosId) {
    state.list[febosId].enGrupo = 'NO';
  },
  UPDATE_SENT_FILE(state, febosId) {
    const { [febosId]: ignored, ...cleanStateDnt } = state.list;
    state.list = cleanStateDnt;
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
  },
  SET_TIMELINE(state, payload) {
    state.timeline = payload;
  },
  SET_ACTIVITIES_FILE(state, payload) {
    state.activities = payload;
  },
  SET_ACTIVITIES_TIMELINE_FILE(state, payload) {
    state.activitiesHistory = payload;
  },
  SET_REFERENCES_DNT(state, payload) {
    state.references = payload.referenciadosTipoDnt
      .concat(payload.referenciadosTipoDte, payload.referenciasTipoDnt, payload.referenciasTipoDte);
  },
  CLEAR_REFERENCES(state) {
    state.references = [];
  },
  SET_SELECTED_FILE(state, payload) {
    state.selectedFile = payload;
  },
  SET_LOADING_NUMERATION(state, payload) {
    state.loadingNumeration = payload;
  },
  SET_NUMERATION_DNT(state, payload) {
    state.numerationFile = payload;
  }
};
