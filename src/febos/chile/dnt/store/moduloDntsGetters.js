export const dntByFiles = (state) => (
  Object.values(state.dnts || {}).filter((dnt) => dnt.tipo === 'APR')
);

export const dntByDocDigital = (state) => (
  Object.values(state.dnts || {}).filter((dnt) => dnt.tipo === 'DDD')
);

export const loading = (state) => state.loading;

export const paginacion = (state) => ({
  paginaActual: state.paginaActual,
  paginasTotales: state.paginasTotales,
  registrosPorPagina: state.registrosPorPagina,
  registrosEncontrados: 10
});

export const paginaActual = (state) => state.paginaActual;

export const detailsDnt = (state) => {
  const jsonBody = JSON.parse(atob(decodeURIComponent(escape(state.details.cuerpo))));
  return {
    document: jsonBody.documento_principal,
    attachedDocuments: jsonBody.documentos_anexos,
    creator: jsonBody.info_creador,
    signs: jsonBody.info_firmas.firmantes[0],
    destinatarios: jsonBody.destinatarios,
    institutions: jsonBody.info_visaciones,
    pdf: state.details.imagenLink
  };
};
