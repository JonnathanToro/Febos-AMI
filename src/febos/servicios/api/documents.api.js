import apiClient from '../clienteFebosAPI';

const RESOURCE = '/documentos';

export const clGetReferences = (febosId) => apiClient
  .get(`${RESOURCE}/${febosId}/referenciasdnt`,
    { operacionId: 'io.documents.references' });
