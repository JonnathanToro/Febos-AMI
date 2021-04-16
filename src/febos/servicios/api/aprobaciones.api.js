import apiClient from '../clienteFebosAPI';

const RESOURCE = '/aprobaciones';

export const fileDetails = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/${payload.aprobacionId}/ejecucion/${payload.ejecucionId}/estado?${params}`, {
    operacionId: 'io.files.details'
  });
};

export const cancelFile = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.put(`${RESOURCE}/${payload.aprobacionId}/ejecucion/${payload.ejecucionId}/anular?${params}`,
    {}, { operacionId: 'io.file.cancel' });
};

export const downloadAttachments = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/${payload.aprobacionId}/ejecucion/${payload.ejecucionId}/previsualizacion?${params}`,
    { operacionId: 'io.download.attachments' });
};

export const sendToFlowFile = (payload) => {
  // /aprobaciones/' + query.aprobacionId+ '/ejecucion'
  const params = apiClient.queryParams(payload.params);

  return apiClient.post(`${RESOURCE}/${payload.params.aprobacionId}/ejecucion?${params}`,
    payload.body, { operacionId: 'io.send.flow' });
};

export const clTraysList = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/bandeja?${params}`, {
    operacionId: 'io.trays'
  });
};
