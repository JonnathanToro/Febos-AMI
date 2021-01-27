import Vue from 'vue';

export default {
  dntByFiles: (state) => (
    Object.values(state.dnts || {}).filter((dnt) => dnt.tipo === 'EXP' || dnt.tipo === 'ACRE' || dnt.tipo === 'MEMO')
  ),
  dntByED: (state) => (
    Object.values(state.dnts || {}).filter((dnt) => (dnt.tipo === 'ACRE' || dnt.tipo === 'MEMO'))
  ),
  dntByDocDigital: (state) => (
    Object.values(state.dnts || {}).filter((dnt) => dnt.tipo === 'DDD')
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
  showModalFile: (state) => state.showModal,
  participants: (state) => state.details,
  detailsDnt: (state) => {
    const jsonBody = JSON.parse(atob((state.details || {}).cuerpo));
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
  },
  detailsFile: (state) => state.details,
  attachmentsFile: (state) => state.attachments,
  commentsEd: (state) => (state.comments || []).map((comment) => {
    // eslint-disable-next-line no-param-reassign
    comment.creado = Vue.moment(comment.fechaCreacion).format('YYYY-MM-DD HH:ss');
    return comment;
  }).reverse(),
  binnacleFile: (state) => {
    const binnacle = state.binnacle.map((info) => {
      const infoBinnacle = {
        from: new Date(Vue.moment(info.fecha).format('YYYY, MM, DD')),
        showDayAndMonth: true,
        description: info.mensaje,
        title: info.usuarioNombre
      };
      return infoBinnacle;
    });
    return binnacle;
  }
};
