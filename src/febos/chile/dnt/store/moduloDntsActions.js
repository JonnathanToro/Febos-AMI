import router from '@/router';
import store from '@/store/store';
import {
  clDntsList,
  clDntActFileED,
  getFile,
  fileComments,
  sendComment,
  fileBinnacle,
  createDnt,
  updateDnt,
  cancelFile,
  downloadAttachments,
  attachmentsFiles,
  clAsignFile,
  sendFile,
  fileTimeline,
  clReturnFileED,
  // eslint-disable-next-line import/named
  activitiesFile,
  addActivity,
  updateActivity
} from '@/febos/servicios/api/dnt.api';
import { clDntCloudSearchList } from '@/febos/servicios/api/dte.api';
import { sendTicket } from '@/febos/servicios/api/tickets.api';
import { fileDetails, sendToFlowFile } from '@/febos/servicios/api/aprobaciones.api';
import { ioDownloadPrivateFile } from '@/febos/servicios/api/herramientas.api';
import { clGetReferences } from '@/febos/servicios/api/documents.api';
import { getSearchParams } from '@/febos/global/utils/router';

export const listDocuments = async ({ commit }, { data, fromCS = false }) => {
  try {
    commit('SET_DNT_LIST', []);
    commit('SET_LOADING', true);
    const service = fromCS ? clDntCloudSearchList : clDntsList;
    const response = await service(data);
    commit('SET_DNT_LIST', response.data);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const detailDnt = async ({ commit }, payload) => {
  try {
    commit('SET_DETAIL_DNT', {});
    commit('SET_LOADING', true);
    const response = await getFile(payload);
    commit('SET_DETAIL_DNT', response.data);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const getAttachmentsDnt = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await attachmentsFiles(payload);
    commit('SET_ATTACHMENTS_DNT', response.data.adjuntos);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const getFileDetails = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await fileDetails(payload);
    commit('SET_DETAIL_FILE', response.data.detalle.ejecucion);
    return response;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const downloadFilePDF = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await getFile(payload);
    window.open(response.data.imagenLink, '_blank');
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const downloadPrivateFile = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await ioDownloadPrivateFile(payload);
    window.open(response.data.url, '_blank');
    return response;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const downloadAttachmentFiles = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await downloadAttachments(payload);
    window.open(response.data.rutaArchivosComprimidos, '_blank');
    return response;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const attemptCancelFile = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await cancelFile(payload);
    await commit('UPDATE_CANCELED_DNT', payload);
    store.commit('Modals/CLOSE_MODAL');
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const clearErrorMessage = ({ commit }) => {
  commit('SET_ERROR_MESSAGE', '');
};

export const processDntFileED = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await clDntActFileED(payload);
    await commit('UPDATE_PROCESSED_DNT', payload);
    store.commit('Modals/CLOSE_MODAL');
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const asignDntFileED = async ({ commit }, febosId) => {
  try {
    commit('SET_LOADING', true);
    const response = await clAsignFile(febosId);
    commit('SET_SUCCESS_MESSAGE', response.data);
    commit('UPDATE_ASIGNED_FILE', febosId);
    store.commit('Modals/CLOSE_MODAL');
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const closeModal = ({ commit }, payload) => {
  commit('CLOSE_MODAL', payload);
};

export const getFileDnt = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    commit('SET_DETAIL_FILE', {});
    const response = await getFile(payload);
    commit('SET_DETAIL_FILE', response.data);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const loadWizardData = async ({ commit }, { id, mapper, loadAllData }) => {
  try {
    commit('SET_LOADING', true);

    const payload = loadAllData
      ? {
        destinatarios: 'si',
        referencias: 'si',
        etiquetas: 'si',
        retornarDnt: 'si'
      }
      : {
        imagen: 'si',
        regenerar: 'no',
        tipoImagen: 0,
        retornarDnt: 'si'
      };

    const { data } = await getFile({
      febosId: id,
      ...payload
    });

    if (loadAllData) {
      const { data: { adjuntos } } = await attachmentsFiles(
        { febosId: id }
      );
      data.adjuntos = adjuntos;
    }

    commit('CLEAR_WIZARD_DATA');
    commit(
      'SET_WIZARD_DATA',
      mapper ? mapper(data) : data
    );
  } finally {
    commit('SET_LOADING', false);
  }
};

export const clearWizardData = ({ commit }) => {
  commit('CLEAR_WIZARD_DATA');
};

export const addWizardData = ({ commit }, payload) => {
  commit('ADD_WIZARD_DATA', payload);
};

export const getFileComments = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    commit('SET_COMMENTS', []);
    const response = await fileComments(payload);
    commit('SET_COMMENTS', response.data.comentarios);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const getFileBinnacle = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    commit('SET_BINNACLE', {});
    const response = await fileBinnacle(payload);
    commit('SET_BINNACLE', response.data.bitacora);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const sendDntComment = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await sendComment(payload);
    commit('ADD_COMMENT', response.data.comentario);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const sendDntFile = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await sendFile(payload);
    commit('SET_SUCCESS_MESSAGE', response.data);
    commit('UPDATE_SENT_FILE', payload.febosId);
    store.commit('Modals/CLOSE_MODAL');
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const sendTicketHelp = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await sendTicket(payload);
    commit('SET_SUCCESS_MESSAGE', 'Ticket de ayuda enviado, te contactaremos!');
    store.commit('Modals/CLOSE_MODAL');
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const saveDocument = async ({ commit }, {
  id, data, isDraft, redirectFlow
// eslint-disable-next-line consistent-return
}) => {
  commit('SET_LOADING', true);
  try {
    const response = !id
      ? await createDnt(data)
      : await updateDnt(id, data);

    commit('SET_SUCCESS_MESSAGE', response.data);

    if (isDraft && id) {
      return Promise.resolve();
    }

    if (isDraft) {
      return router.push({
        name: 'files-wizard-update',
        params: {
          wizard: response.data.dnt.claseMercadoPublico,
          id: response.data.dnt.febosId
        },
        query: getSearchParams()
      });
    }

    if (redirectFlow) {
      return router.push({
        name: 'files-wizard-update',
        params: { wizard: 'flujo', id: response.data.dnt.febosId }
      });
    }

    return router.push({ name: 'files', params: { view: 'general' } });
  } catch (e) {
    commit('SET_ERROR_MESSAGE', e.context);
  } finally {
    commit('SET_LOADING', false);
  }
};

export const getFileTimeline = async ({ commit }, febosId) => {
  try {
    commit('SET_LOADING', true);
    commit('SET_TIMELINE', {});
    const response = await fileTimeline(febosId);
    commit('SET_TIMELINE', response.data.destinatarios);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const returnFileEd = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await clReturnFileED(payload);
    await commit('UPDATE_SENT_FILE', payload.febosId);
    store.commit('Modals/CLOSE_MODAL');
    commit('SET_SUCCESS_MESSAGE', response.data);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const sendToFlow = async ({ commit }, { data }) => {
  commit('SET_LOADING', true);
  try {
    commit('SET_LOADING', true);
    const payload = {
      params: {
        aprobacionId: 0,
        temporal: true,
        enviarOficina: data.typeFlow,
        privado: 'N'
      },
      body: data
    };
    const response = await sendToFlowFile(payload);
    await router.push({
      path: '/aprobaciones/entrada'
    });
    commit('SET_SUCCESS_MESSAGE', response.data);
  } finally {
    commit('SET_LOADING', false);
  }
};

export const getActivitiesFile = async ({ commit }, { payload, historico }) => {
  try {
    commit('SET_ACTIVITIES_TIMELINE_FILE', []);
    commit('SET_LOADING', true);
    const response = await activitiesFile(payload);
    if (historico) {
      commit('SET_ACTIVITIES_TIMELINE_FILE', response.data.actividades);
    } else {
      commit('SET_ACTIVITIES_FILE', response.data.actividades);
    }
    return response;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const addActivityFile = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await addActivity(payload);
    store.commit('Modals/CLOSE_MODAL');
    commit('SET_SUCCESS_MESSAGE', response.data);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const updateActivityFile = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await updateActivity(payload);
    store.commit('Modals/CLOSE_MODAL');
    commit('SET_SUCCESS_MESSAGE', response.data);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const answerCreateFile = async ({ commit }, payload) => {
  console.log('responder action', payload);
  try {
    commit('SET_LOADING', true);
    const response = await createDnt(payload);
    commit('SET_SUCCESS_MESSAGE', response.data);
    const path = `/documentos/${payload.dnt.claseMercadoPublico}/${response.data.dnt.febosId}`;
    store.commit('Modals/CLOSE_MODAL');
    await router.push({ path });
  } catch (e) {
    commit('SET_ERROR_MESSAGE', e.context);
  } finally {
    commit('SET_LOADING', false);
  }
};

export const searchReferences = async ({ commit }, febosId) => {
  try {
    commit('CLEAR_REFERENCES');
    commit('SET_LOADING', true);
    const response = await clGetReferences(febosId);
    commit('SET_REFERENCES_DNT', response.data);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const selectFileState = ({ commit }, file) => {
  commit('SET_SELECTED_FILE', file);
};
