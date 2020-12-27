export default {
  dntByFiles: (state) => (
    Object.values(state.dnts || {}).filter((dnt) => dnt.tipo === 'APR')
  ),
  dntByDocDigital: (state) => (
    Object.values(state.dnts || {}).filter((dnt) => dnt.tipo === 'DDD')
  ),
  loading: (state) => state.loading,
  paginacion: (state) => ({
    paginaActual: state.paginaActual,
    paginasTotales: state.paginasTotales,
    registrosPorPagina: state.registrosPorPagina,
    registrosEncontrados: 10
  }),
  paginaActual: (state) => state.paginaActual,
  detailsDnt: (state) => state.details
};
