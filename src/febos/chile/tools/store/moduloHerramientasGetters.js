export default {
  mantenedorCategorias: (state) => {
    const categories = state.herramientas.mantenedores.categorias || {};
    return Object.values(categories);
  },
  mantenedorDocumentos: (state) => {
    const documents = state.herramientas.mantenedores.documentos || {};
    return Object.values(documents);
  },
  loading: (state) => state.loading,
  selectedCategory: (state) => state.category,
  selectedInstitution: (state) => state.institution,
  categoryInstitutions: (state) => {
    const categories = state.herramientas.mantenedores.categoryInstitutions || {};
    return Object.values(categories);
  },
  mantenedorInstitutions: (state) => {
    const institutions = state.herramientas.mantenedores.institutions || {};
    return Object.values(institutions);
  },
  selectedSubject: (state) => state.subject,
  categorySubjects: (state) => {
    const categories = state.herramientas.mantenedores.categorySubjects || {};
    return Object.values(categories);
  },
  mantenedorSubjects: (state) => {
    const subjects = state.herramientas.mantenedores.subjects || {};
    return Object.values(subjects);
  },
  selectedActivity: (state) => state.activity,
  categoryActivities: (state) => {
    const categories = state.herramientas.mantenedores.categoryActivities || {};
    return Object.values(categories);
  },
  activityStates: (state) => {
    const states = state.herramientas.mantenedores.activityStates || {};
    return Object.values(states);
  },
};
