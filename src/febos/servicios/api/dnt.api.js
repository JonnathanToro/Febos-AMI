import apiClient from '../clienteFebosAPI';

const RESOURCE = '/notributarios';

export const clDntsList = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}?${params}`, {
    operacionId: 'io.dnts.list'
  });
};

export const clDntActFileED = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.put(`${RESOURCE}/${payload.febosId}/estado?${ params }`, { estadoId: payload.estadoId }, {
    operacionId: 'io.dnts.ed.act.estado'
  });
};

export const downloadAttachments = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/${payload.febosId}/adjuntos?${params}`,
    { operacionId: 'io.download.attachments.dnt' });
};

export const cancelFile = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.delete(`${RESOURCE}/${payload.febosId}?${params}`, {
    operacionId: 'io.get.dnt'
  });
};

export const getFile = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/${payload.febosId}?${params}`, {
    operacionId: 'io.get.dnt'
  });
};

export const fileComments = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/${payload.febosId}/expedientes/comentarios?${params}`, {
    operacionId: 'io.dnt.comments'
  });
};

export const attachmentsFiles = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/${payload.febosId}/adjuntos?${params}`, {
    operacionId: 'io.dnt.attachments'
  });
};

export const fileBinnacle = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/${payload.febosId}/bitacora?${params}`, {
    operacionId: 'io.dnt.binnacle'
  });
};

export const sendComment = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.post(`${RESOURCE}/${payload.febosId}/expedientes/comentarios?${params}`,
    { comentario: payload.comentario },
    { operacionId: 'io.dnt.send.comment' });
};

export const createDnt = (payload) => {
  const params = apiClient.queryParams({
    entrada: 'json',
    tipoDocumento: 'EXP',
    retornarPdf: 'no',
    simular: 'no',
    foliar: 'si'
  });
  console.log('PAYLOAD', btoa(payload));
  return apiClient.post(`${RESOURCE}/crear?${params}`,
    payload,
    { operacionId: 'io.dnt.creat.dnt' });
};
