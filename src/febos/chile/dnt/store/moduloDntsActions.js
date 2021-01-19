import {
  clDntsList,
  clDntActFileED,
  getFile,
  clDntDetails,
  fileComments,
  sendComment,
  fileBinnacle
} from '@/febos/servicios/api/dnt.api';
import { sendTicket } from '@/febos/servicios/api/tickets.api';
import { fileDetails, cancelFile, downloadAttachments } from '@/febos/servicios/api/aprobaciones.api';
import { ioDownloadPrivateFile } from '@/febos/servicios/api/herramientas.api';

export const listDocuments = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await clDntsList(payload);
  commit('SET_LISTADO_DNT', response.data);
  commit('SET_LOADING', false);
  return response.data;
};

export const actualizarPagina = ({ commit }, payload) => {
  commit('ACT_PAGINA', payload);
};

export const detailDnt = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await clDntDetails(payload);
  commit('SET_DETAIL_DNT', response.data);
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

export const downloadAttatchmentsFile = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await downloadAttachments(payload);
  window.open(response.data.rutaArchivosComprimidos, '_blank');
  commit('SET_LOADING', false);
};

export const attemptCancelFile = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await cancelFile(payload);
  if (response.data.codigo !== 10) {
    commit('SET_ERROR_MENSAJE', response.data);
  }
  commit('SET_LOADING', false);
  return response.data;
};

export const limpiarMensajeDeError = ({ commit }) => {
  commit('SET_ERROR_MENSAJE', '');
};

export const processDntFileED = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await clDntActFileED(payload);
  if (response.data.codigo !== 10) {
    commit('SET_ERROR_MENSAJE', response.data);
  }
  commit('CLOSE_MODAL', false);
  commit('SET_LOADING', false);
  return response.data;
};

export const closeModal = ({ commit }, payload) => {
  commit('CLOSE_MODAL', payload);
};

export const getFileDnt = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await getFile(payload);
  commit('SET_DETAIL_FILE', response.data.aprobaciones);
  commit('SET_LOADING', false);
  return response.data;
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

export const sendTicketHelp = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await sendTicket(payload);
  commit('SET_SUCCESS_MENSAJE', 'Ticket de ayuda enviado, te contactaremos!');
  commit('CLOSE_MODAL', false);
  commit('SET_LOADING', false);
  return response.data;
};
