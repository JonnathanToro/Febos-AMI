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
  detailsDnt: (state) => {
    const jsonBody = JSON.parse(atob(decodeURIComponent(escape(state.details.cuerpo))));
    const details = {
      document: jsonBody.documento_principal,
      attachedDocuments: jsonBody.documentos_anexos,
      creator: jsonBody.info_creador,
      signs: jsonBody.info_firmas.firmantes[0],
      destinatarios: jsonBody.destinatarios,
      institutions: jsonBody.info_visaciones,
      pdf: state.details.imagenLink
    };
    return details;
  }
};
