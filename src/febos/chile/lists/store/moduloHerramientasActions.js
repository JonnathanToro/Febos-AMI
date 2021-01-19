import { listOptions } from '@/febos/servicios/api/opciones.api';

export const fetchDocumentTypes = async ({ commit }) => {
  commit('SET_DOCUMENT_TYPES_LOADING', true);

  const response = await listOptions({
    grupoOpcion: 'tipos.documentos-ed',
    deshabilitado: 'no'
  });

  commit('SET_DOCUMENT_TYPES', response.data.opciones);
  commit('SET_DOCUMENT_TYPES_LOADING', false);
};

export const fetchDocuments = async ({ commit }, payload) => {
  commit('SET_DOCUMENTS_LOADING', true);

  const response = await listOptions({
    grupoOpcion: `tipos.documentos-ed.${payload}.item`,
    deshabilitado: 'no'
  });

  commit('SET_DOCUMENTS', response.data.opciones);
  commit('SET_DOCUMENTS_LOADING', false);
};
