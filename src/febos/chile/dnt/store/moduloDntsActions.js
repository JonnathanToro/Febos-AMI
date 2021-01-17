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

export default {
  async listDocuments({ commit }, payload) {
    commit('SET_LOADING', true);
    try {
      const response = await clDntsList(payload);
      commit('SET_LISTADO_DNT', response.data);
      commit('SET_LOADING', false);
      if (response.data.codigo !== 10) throw response.data;
      return response.data;
    } catch (error) {
      commit('SET_ERROR_MENSAJE', error);
      console.log('ERROR', error);
      return error;
    }
  },
  actualizarPagina({ commit }, payload) {
    commit('ACT_PAGINA', payload);
  },
  async detailDnt({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await clDntDetails(payload);
    commit('SET_DETAIL_DNT', response.data);
    commit('SET_LOADING', false);
    return response.data;
  },
  async getFileDetails({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await fileDetails(payload);
    commit('SET_DETAIL_FILE', response.data.detalle.ejecucion);
    commit('SET_LOADING', false);
  },
  async downloadFilePDF({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await fileDetails(payload);
    window.open(response.data.pdfUrl, '_blank');
    commit('SET_LOADING', false);
    return response.data;
  },
  async downloadPrivateFile({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await ioDownloadPrivateFile(payload);
    window.open(response.data.url, '_blank');
    commit('SET_LOADING', false);
  },
  async downloadAttatchmentsFile({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await downloadAttachments(payload);
    window.open(response.data.rutaArchivosComprimidos, '_blank');
    commit('SET_LOADING', false);
  },
  async attemptCancelFile({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await cancelFile(payload);
    if (response.data.codigo !== 10) {
      commit('SET_ERROR_MENSAJE', response.data);
    }
    commit('SET_LOADING', false);
    return response.data;
  },
  limpiarMensajeDeError({ commit }) {
    commit('SET_ERROR_MENSAJE', '');
  },
  async processDntFileED({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await clDntActFileED(payload);
    if (response.data.codigo !== 10) {
      commit('SET_ERROR_MENSAJE', response.data);
    }
    commit('CLOSE_MODAL', false);
    commit('SET_LOADING', false);
    return response.data;
  },
  closeModal({ commit }, payload) {
    commit('CLOSE_MODAL', payload);
  },
  async getFileDnt({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await getFile(payload);
    commit('SET_DETAIL_FILE', response.data.aprobaciones);
    commit('SET_LOADING', false);
    return response.data;
  },
  async getFileComments({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await fileComments(payload);
    commit('SET_COMMENTS', response.data.comentarios);
    commit('SET_LOADING', false);
    return response.data;
  },
  async getFileBinnacle({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await fileBinnacle(payload);
    commit('SET_BINNACLE', response.data.bitacora);
    commit('SET_LOADING', false);
    return response.data;
  },
  async sendComment({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await sendComment(payload);
    commit('ADD_COMMENT', response.data.comentario);
    commit('SET_LOADING', false);
    return response.data;
  },
  async sendTicketHelp({ commit }, payload) {
    commit('SET_LOADING', true);
    const response = await sendTicket(payload);
    commit('SET_SUCCESS_MENSAJE', 'Ticket de ayuda enviado, te contactaremos!');
    commit('CLOSE_MODAL', false);
    commit('SET_LOADING', false);
    return response.data;
  }
};
