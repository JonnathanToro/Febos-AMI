import {
  clDntsList, fileBinnacle
} from '@/febos/servicios/api/dnt.api';
import {
  clTraysList,
  downloadAttachments,
  fileDetails,
  cancelFile
} from '@/febos/servicios/api/aprobaciones.api';
import store from '@/store/store';

export const listDocuments = async ({ commit }, { data }) => {
  try {
    commit('SET_DNT_LIST', []);
    commit('SET_LOADING', true);
    const service = clDntsList;
    const response = await service(data);
    commit('SET_DNT_LIST', response.data);
    return response.data;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const listTrays = async ({ commit }, { data }) => {
  try {
    commit('SET_TRAY', []);
    commit('SET_LOADING', true);
    const service = clTraysList;
    const response = await service(data);
    commit('SET_TRAY', response.data);
    return response.data;
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

export const getApprovalFileDetails = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await fileDetails(payload);
    window.open(response.data.pdfUrl, '_blank');
    return response;
  } finally {
    commit('SET_LOADING', false);
  }
};

export const attemptCancelFile = async ({ commit }, payload) => {
  try {
    commit('SET_LOADING', true);
    const response = await cancelFile(payload);
    await commit('UPDATE_CANCELED_FILE', payload);
    store.commit('Modals/CLOSE_MODAL');
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
