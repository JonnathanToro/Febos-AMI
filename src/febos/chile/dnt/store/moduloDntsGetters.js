export default {
  dntByFiles: (state) => (
    Object.values(state.dnts || {}).filter((dnt) => dnt.tipo === 'APR')
  ),
  dntByED: (state) => (
    Object.values(state.dnts || {}).filter((dnt) => (dnt.tipo === 'ACRE' || dnt.tipo === 'MEMO'))
  ),
  loading: (state) => state.loading,
  error: (state) => state.error,
  successAccion: (state) => state.successAccion,
  paginacion: (state) => ({
    paginaActual: state.paginaActual,
    paginasTotales: state.paginasTotales,
    registrosPorPagina: state.registrosPorPagina,
    registrosEncontrados: 10
  }),
  paginaActual: (state) => state.paginaActual,
  fileCommentDetails: (state) => (
    (state.details || {}).comentarios || []
  ),
  showModal: (state) => state.showModal
};
