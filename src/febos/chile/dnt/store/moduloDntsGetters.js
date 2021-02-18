import Vue from 'vue';

export default {
  files: (state) => (
    Object.values(state.list || {})
  ),
  dntByED: (state) => (
    Object.values(state.list || {}).filter((dnt) => (dnt.tipo === 'ACRE' || dnt.tipo === 'MEMO'))
  ),
  dntByDocDigital: (state) => (
    Object.values(state.list || {}).filter((dnt) => dnt.tipo === 'DDD')
  ),
  loading: (state) => state.loading,
  error: (state) => state.error,
  successAction: (state) => state.successAction,
  fileCommentDetails: (state) => (
    (state.details || {}).comentarios || []
  ),
  showModalFile: (state) => state.showModal,
  participants: (state) => state.details.destinatarios,
  detailsDnt: (state) => {
    const jsonBody = JSON.parse(atob((state.details || {}).cuerpo));
    return {
      document: jsonBody.documento_principal,
      attachedDocuments: jsonBody.documentos_anexos,
      creator: jsonBody.info_creador,
      signs: jsonBody.info_firmas.firmantes[0],
      destinatarios: jsonBody.destinatarios,
      institutions: jsonBody.info_visaciones,
      pdf: state.details.imagenLink
    };
  },
  detailsFile: (state) => state.details,
  attachmentsFile: (state) => state.attachments,
  commentsEd: (state) => (state.comments || []).map((comment) => {
    // eslint-disable-next-line no-param-reassign
    comment.creado = Vue.moment(comment.fechaCreacion).format('YYYY-MM-DD HH:ss');
    return comment;
  }),
  binnacleFile: (state) => state.binnacle,
  wizardData: (state) => state.wizardData,
  pagination: (state) => state.pagination
};
