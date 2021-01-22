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
  },
  SET_INSTITUTION_TYPES(state, payload) {
    state.institutionTypes.list = payload;
  },
  SET_INSTITUTION_TYPES_LOADING(state, payload) {
    state.institutionTypes.loading = payload;
  },
  SET_INSTITUTIONS(state, payload) {
    state.institutions.list = payload;
  },
  SET_INSTITUTIONS_LOADING(state, payload) {
    state.institutions.loading = payload;
  },
  SET_SUBJECTS(state, payload) {
    state.subjects.list = payload.list;
    state.subjects.type = payload.type;
  },
  SET_SUBJECTS_LOADING(state, payload) {
    state.subjects.loading = payload;
  },
  SET_INSTITUTIONS_DOC_DIGITAL_LOADING(state, payload) {
    state.institutionsDocDigital.loading = payload;
  },
  SET_INSTITUTIONS_DOC_DIGITAL(state, payload) {
    console.log('list?', payload);
    state.institutionsDocDigital.list = payload;
  }
};
