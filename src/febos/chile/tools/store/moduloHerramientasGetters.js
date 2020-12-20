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
  selectedCategory: (state) => state.category
};
