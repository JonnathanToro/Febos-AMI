import apiClient from '../clienteFebosAPI';

const RESOURCE = '/v2/documentos';

export const clDtesList = (payload) => {
  const params = apiClient.queryParams(payload);
  return apiClient.get(`${RESOURCE}?${params}`, { operacionId: 'cl.dtes.listar' });
};
