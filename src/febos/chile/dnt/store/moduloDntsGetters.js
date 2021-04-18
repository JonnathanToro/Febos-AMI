import Vue from 'vue';

export default {
  // TODO: test return the same reference and not a copy.
  files: (state) => Object.values(state.list || {}),
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
  // TODO: this is the same object.
  pagination: (state) => state.pagination,
  timelineFile: (state) => state.timeline,
  activities: (state) => state.activities
    .sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion)),
  activitiesHistory: (state) => state.activitiesHistory,
  references: (state) => state.references,
  selectedFile: (state) => state.selectedFile
};
