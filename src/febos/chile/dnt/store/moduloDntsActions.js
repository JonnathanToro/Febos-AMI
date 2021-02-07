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
  commit('SET_LOADING', true);
  const response = await clDntCloudSearchList(payload);
  // const response = await clDntsList(payload);
  commit('SET_DNT_LIST', response.data);
  commit('SET_LOADING', false);
  return response.data;
};

export const detailDnt = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await getFile(payload);
  commit('SET_DETAIL_DNT', response.data);
  commit('SET_LOADING', false);
  return response.data;
};

export const getAttachmentsDnt = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await attachmentsFiles(payload);
  commit('SET_ATTACHMENTS_DNT', response.data.adjuntos);
  commit('SET_LOADING', false);
  return response.data;
};

export const getFileDetails = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await fileDetails(payload);
  commit('SET_DETAIL_FILE', response.data.detalle.ejecucion);
  commit('SET_LOADING', false);
};

export const downloadFilePDF = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await fileDetails(payload);
  window.open(response.data.pdfUrl, '_blank');
  commit('SET_LOADING', false);
  return response.data;
};

export const downloadPrivateFile = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await ioDownloadPrivateFile(payload);
  window.open(response.data.url, '_blank');
  commit('SET_LOADING', false);
};

export const downloadAttachmentFiles = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await downloadAttachments(payload);
  window.open(response.data.rutaArchivosComprimidos, '_blank');
  commit('SET_LOADING', false);
};

export const attemptCancelFile = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await cancelFile(payload);
  if (response.data.codigo !== 10) {
    commit('SET_ERROR_MESSAGE', response.data);
  }
  await router.push({
    path: '/expedientes/en-curso'
  });
  store.commit('Modals/CLOSE_MODAL');
  commit('SET_LOADING', false);
  return response.data;
};

export const clearErrorMessage = ({ commit }) => {
  commit('SET_ERROR_MESSAGE', '');
};

export const processDntFileED = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await clDntActFileED(payload);
  if (response.data.codigo !== 10) {
    commit('SET_ERROR_MESSAGE', response.data);
  }
  await router.push({
    path: '/expedientes/en-curso'
  });
  store.commit('Modals/CLOSE_MODAL');
  commit('SET_LOADING', false);
  return response.data;
};

export const closeModal = ({ commit }, payload) => {
  commit('CLOSE_MODAL', payload);
};

export const getFileDnt = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await getFile(payload);
  commit('SET_DETAIL_FILE', response.data);
  commit('SET_LOADING', false);
  return response.data;
};

export const loadWizardData = async ({ commit }, { id, mapper }) => {
  commit('SET_LOADING', true);
  const { data } = await getFile({
    febosId: id,
    destinatarios: 'si',
    referencias: 'si',
    retornarDnt: 'si'
  });

  const { data: { adjuntos } } = await attachmentsFiles(
    { febosId: id }
  );

  data.adjuntos = adjuntos;

  commit(
    'SET_WIZARD_DATA',
    mapper ? mapper(data) : data
  );
  commit('SET_LOADING', false);
};

export const clearWizardData = ({ commit }) => {
  commit('CLEAR_WIZARD_DATA');
};

export const addWizardData = ({ commit }, payload) => {
  commit('ADD_WIZARD_DATA', payload);
};

export const getFileComments = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await fileComments(payload);
  commit('SET_COMMENTS', response.data.comentarios);
  commit('SET_LOADING', false);
  return response.data;
};

export const getFileBinnacle = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await fileBinnacle(payload);
  commit('SET_BINNACLE', response.data.bitacora);
  commit('SET_LOADING', false);
  return response.data;
};

export const sendDntComment = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await sendComment(payload);
  commit('ADD_COMMENT', response.data.comentario);
  commit('SET_LOADING', false);
  return response.data;
};

export const sendDntFile = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await sendFile(payload);
  commit('SET_SUCCESS_MESSAGE', response.data);
  commit('SET_LOADING', false);
  return response.data;
};

export const sendTicketHelp = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await sendTicket(payload);
  commit('SET_SUCCESS_MESSAGE', 'Ticket de ayuda enviado, te contactaremos!');
  store.commit('Modals/CLOSE_MODAL');
  commit('SET_LOADING', false);
  return response.data;
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
      : await updateDnt(data);

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
