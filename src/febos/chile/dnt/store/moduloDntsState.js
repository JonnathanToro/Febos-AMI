export default {
  loading: false,
  successAction: false,
  error: '',
  showModal: false, // TODO: delete this.
  list: {}, // TODO: <-
  details: {
    comentarios: [],
    cuerpo: '',
    adjuntos: []
  },
  comments: [],
  binnacle: [],
  timeline: [],
  wizardData: {},
  selectedFile: {},
  numerationFile: '',
  numerationFebosId: '',
  loadingNumeration: false,
  activities: [],
  activitiesHistory: [],
  references: [],
  pagination: {
    items: 0,
    pages: 0
  }
};
