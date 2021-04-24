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

  return apiClient.put(`${RESOURCE}/${payload.febosId}/estado?${params}`, { estadoId: payload.estadoId }, {
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
    operacionId: 'io.cancel.dnt'
  });
};

export const clAsignFile = (febosId) => apiClient.post(`${RESOURCE}/${febosId}/destinos/asignar`, {
  operacionId: 'io.asign.file'
});

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

export const sendFile = (payload) => apiClient.post(`${RESOURCE}/${payload.febosId}/destinos`,
  { destinos: payload.destinos },
  { operacionId: 'io.dnt.send.file' });

export const createDnt = (payload) => {
  const params = apiClient.queryParams({
    entrada: 'json',
    tipoDocumento: 'EXP',
    retornarPdf: 'no',
    simular: 'no',
    foliar: 'si'
  });

  return apiClient.post(
    `${RESOURCE}/crear?${params}`,
    payload,
    { operacionId: 'io.dnt.crear.dnt' }
  );
};

export const updateDnt = (id, payload) => {
  const params = apiClient.queryParams({
    entrada: 'json',
    tipoDocumento: 'EXP',
    febosId: id,
    sobreEscribir: 'si'
  });
  return apiClient.post(
    `${RESOURCE}/${id}/actualizar?${params}`,
    payload,
    { operacionId: 'io.dnt.actualizar.dnt' }
  );
};
export const indicatorFilesED = () => apiClient.get(`${RESOURCE}/0/expedientes/indicadores`, {
  operacionId: 'io.dnts.ed.indicadores.inicio'
});

export const fileTimeline = (febosId) => apiClient.get(`${RESOURCE}/${febosId}/destinos/timeline`, {
  operacionId: 'io.dnt.timeline'
});

export const clReturnFileED = (payload) => apiClient
  .post(`${RESOURCE}/${payload.febosId}/destinos/devolver`,
    { comentario: payload.comentario },
    { operacionId: 'io.dnt.return.file' });

export const activitiesFile = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/${payload.febosId}/actividades?${params}`, {
    operacionId: 'io.dnt.activities'
  });
};

export const addActivity = (payload) => apiClient.post(`${RESOURCE}/${payload.febosId}/actividades`,
  payload.activity,
  { operacionId: 'io.dnt.add.activity' });

export const updateActivity = (payload) => apiClient.put(`${RESOURCE}/${payload.febosId}/actividades`,
  payload.activity,
  { operacionId: 'io.dnt.update.activity' });

export const getSheetsConfig = (idOption) => {
  const params = apiClient.queryParams(idOption);

  return apiClient.get(`${RESOURCE}/cafs/configuraciones?${params}`, {
    operacionId: 'io.dnt.config.sheets'
  });
};

export const saveSheetsConfig = (id, config) => {
  console.log('API', id, config);
  const params = apiClient.queryParams(id);

  return apiClient.post(`${RESOURCE}/cafs/configuraciones?${params}`, config, {
    operacionId: 'io.dnt.save.config.sheets'
  });
};
