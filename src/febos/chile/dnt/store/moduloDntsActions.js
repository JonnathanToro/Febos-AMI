import router from '@/router';
import store from '@/store/store';
import {
  // clDntsList,
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
  sendFile
} from '@/febos/servicios/api/dnt.api';
import { clDntCloudSearchList } from '@/febos/servicios/api/dte.api';
import { sendTicket } from '@/febos/servicios/api/tickets.api';
import { fileDetails } from '@/febos/servicios/api/aprobaciones.api';
import { ioDownloadPrivateFile } from '@/febos/servicios/api/herramientas.api';

export const listDocuments = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await clDntCloudSearchList(payload);
    // const response = await clDntsList(payload);
    commit('SET_DNT_LIST', response.data);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const detailDnt = async ({ commit }, payload) => {
  try {
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
    const response = await fileDetails(payload);
    window.open(response.data.pdfUrl, '_blank');
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
    if (response.data.codigo !== 10) {
      commit('SET_ERROR_MESSAGE', response.data);
    }
    await router.push({
      path: '/expedientes/en-curso'
    });
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
    if (response.data.codigo !== 10) {
      commit('SET_ERROR_MESSAGE', response.data);
    }
    await router.push({
      path: '/expedientes/en-curso'
    });
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
    const response = await getFile(payload);
    commit('SET_DETAIL_FILE', response.data);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const loadWizardData = async ({ commit }, { id, mapper }) => {
  try {
    commit('SET_LOADING', true);
    const { data } = await getFile({
      febosId: id,
      destinatarios: 'si',
      referencias: 'si',
      etiquetas: 'si',
      retornarDnt: 'si'
    });

    const { data: { adjuntos } } = await attachmentsFiles(
      { febosId: id }
    );

    data.adjuntos = adjuntos;
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

/*
 TODO: hay que verificar si el dnt tiene ID y si tiene id,
  actualizar en lugar de crear, además si no tiene id y es
  modo draft redireccionar después de guardar al editar
*/
export const saveDocument = async ({ commit }, { id, data, isDraft }) => {
  commit('SET_LOADING', true);
  try {
    const response = !id
      ? await createDnt(data)
      : await updateDnt(id, data);

    commit('SET_SUCCESS_MESSAGE', response.data);

    if (isDraft && id) {
      return;
    }

    const path = isDraft
      ? `/documentos/externo/${response.data.dnt.febosId}`
      : '/expedientes/en-curso';

    await router.push({ path });
  } catch (e) {
    commit('SET_ERROR_MESSAGE', e.context);
  } finally {
    commit('SET_LOADING', false);
  }
};
