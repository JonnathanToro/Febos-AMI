export default {
  SET_DOCUMENT_TYPES(state, payload) {
    state.documentTypes.list = payload
      .map((option) => ({
        id: option.opcionId,
        value: option.valor,
        label: option.descripcion
      }));
  },
  SET_DOCUMENT_TYPES_LOADING(state, payload) {
    state.documentTypes.loading = payload;
  },
  SET_DOCUMENTS(state, payload) {
    state.documents.list = payload
      .map((option) => ({
        id: option.opcionId,
        value: option.valor,
        label: option.descripcion
      }));
  },
  SET_DOCUMENTS_LOADING(state, payload) {
    state.documents.loading = payload;
  },
  SET_INSTITUTION_TYPES(state, payload) {
    state.institutionTypes.list = payload
      .map((option) => ({
        id: option.opcionId,
        value: option.valor,
        label: option.descripcion
      }));
  },
  SET_INSTITUTION_TYPES_LOADING(state, payload) {
    state.institutionTypes.loading = payload;
  },
  SET_INSTITUTIONS(state, payload) {
    state.institutions.list = payload
      .map((option) => ({
        id: option.opcionId,
        value: option.valor,
        label: option.descripcion
      }));
  },
  SET_INSTITUTIONS_LOADING(state, payload) {
    state.institutions.loading = payload;
  },
  SET_SUBJECTS(state, payload) {
    state.subjects.type = payload.type;

    switch (payload.type) {
      case 'usuarios': {
        state.subjects.list = payload.list.map((option) => ({
          id: option.id,
          value: option.id,
          label: option.nombre
        }));
        break;
      }
      case 'unidades': {
        state.subjects.list = payload.list.map((option) => ({
          id: option.id,
          value: option.id,
          label: option.nombre
        }));
        break;
      }
      case 'oficinas': {
        state.subjects.list = payload.list.map((option) => ({
          id: option.id,
          value: option.id,
          label: option.nombre
        }));
        break;
      }
      case 'docDigital': {
        // TODO: test form with this case
        state.subjects.list = payload.list.map((option) => ({
          id: option.opcionId,
          value: option.valor,
          label: option.descripcion
        }));
        break;
      }
      case 'ministerios': {
        // TODO: test form with this case
        state.subjects.list = payload.list.map((option) => ({
          id: option.opcionId,
          value: option.valor,
          label: option.descripcion
        }));
        break;
      }
      default: {
        state.subjects.list = [];
        break;
      }
    }
  },
  SET_SUBJECTS_LOADING(state, payload) {
    state.subjects.loading = payload;
  },
  SET_INSTITUTIONS_DOC_DIGITAL_LOADING(state, payload) {
    state.institutionsDocDigital.loading = payload;
  },
  SET_INSTITUTIONS_DOC_DIGITAL(state, payload) {
    state.institutionsDocDigital.list = payload
      .map((option) => ({
        id: option.opcionId,
        value: option.valor,
        label: option.descripcion
      }));
  }
};
