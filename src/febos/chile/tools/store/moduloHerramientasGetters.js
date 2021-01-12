export default {
  mantenedorCategorias: (state) => {
    const categories = state.herramientas.mantenedores.categorias || {};
    return Object.values(categories);
  },
  mantenedorDocumentos: (state) => {
    const documents = state.herramientas.mantenedores.documentos || {};
    return Object.values(documents);
  },
  loading: (state) => state.cargando,
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
};
