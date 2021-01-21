export default {
  // TODO: use normalizr
  SET_OPCIONES_CATEGORIES(state, payload) {
    state.herramientas.mantenedores.categorias = (payload.opciones || [])
      .reduce((index, option) => ({
        ...index,
        [option.opcionId]: option
      }), {});
  },
  // TODO: use normalizr
  SET_OPCIONES_DOCUMENTOS(state, payload) {
    state.herramientas.mantenedores.documentos = (payload.opciones || [])
      .reduce((index, option) => ({
        ...index,
        [option.opcionId]: option
      }), {});
  },
  SET_OPCIONES_CATEGORIES_INSTITUTIONS(state, payload) {
    state.herramientas.mantenedores.categoryInstitutions = (payload.opciones || [])
      .reduce((index, option) => ({
        ...index,
        [option.opcionId]: option
      }), {});
  },
  // TODO: use normalizr
  SET_OPCIONES_INSTITUTIONS(state, payload) {
    state.herramientas.mantenedores.institutions = (payload.opciones || [])
      .reduce((index, option) => ({
        ...index,
        [option.opcionId]: option
      }), {});
  },
  SET_OPCIONES_CATEGORIES_SUBJECTS(state, payload) {
    state.herramientas.mantenedores.categorySubjects = (payload.opciones || [])
      .reduce((index, option) => ({
        ...index,
        [option.opcionId]: option
      }), {});
  },
  SET_OPCIONES_SUBJECTS(state, payload) {
    state.herramientas.mantenedores.subjects = (payload.opciones || [])
      .reduce((index, option) => ({
        ...index,
        [option.opcionId]: option
      }), {});
  },
  SET_CATEGORY(state, payload) {
    state.category = payload;
  },
  SET_SUBJECT(state, payload) {
    state.subject = payload;
  },
  SET_INSTITUTION(state, payload) {
    state.institution = payload;
  },
  UPDATE_OPTION_CATEGORY(state, { option }) {
    state.herramientas.mantenedores.categorias[option.opcionId] = option;
  },
  UPDATE_OPTION_DOCUMENT(state, { option }) {
    state.herramientas.mantenedores.documentos[option.opcionId] = option;
  },
  UPDATE_OPTION_INSTITUTION_CATEGORY(state, { option }) {
    state.herramientas.mantenedores.categoryInstitutions[option.opcionId] = option;
  },
  UPDATE_OPTION_INSTITUTION(state, { option }) {
    state.herramientas.mantenedores.institutions[option.opcionId] = option;
  },
  UPDATE_OPTION_SUBJECT_CATEGORY(state, { option }) {
    state.herramientas.mantenedores.categorySubjects[option.opcionId] = option;
  },
  UPDATE_OPTION_SUBJECT(state, { option }) {
    state.herramientas.mantenedores.subjects[option.opcionId] = option;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_SUCCESS_MESSAGE(state, payload) {
    state.successAccion = payload;
  },
  SET_ERROR_MESSAGE(state, payload) {
    state.error = payload;
  }
};
