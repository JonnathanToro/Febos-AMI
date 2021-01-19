export default {
  SET_DOCUMENT_TYPES(state, payload) {
    state.documentTypes.list = payload;
  },
  SET_DOCUMENT_TYPES_LOADING(state, payload) {
    state.documentTypes.loading = payload;
  },
  SET_DOCUMENTS(state, payload) {
    state.documents.list = payload;
  },
  SET_DOCUMENTS_LOADING(state, payload) {
    state.documents.loading = payload;
  }
};
