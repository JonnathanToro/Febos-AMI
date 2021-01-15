import apiClient from '../clienteFebosAPI';

const RESOURCE = '/notributarios';

export const clDntsList = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}?${params}`, {
    operacionId: 'io.dnts.list'
  });
};

export const clDntDetails = (payload) => {
  const params = apiClient.queryParams(payload);
  console.log('PAYO', params);
  return apiClient.get(`${RESOURCE}/${payload.febosId}?${params}`, {
    operacionId: 'io.dnt.details'
  });
};

export const clDntActFileED = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.put(`${RESOURCE}/${payload.febosId}/aprobadores?${ params}`, {}, {
    operacionId: 'io.dnts.ed.actualizar'
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

  return apiClient.get(`${RESOURCE}/${payload.febosId}/comentarios?${params}`, {
    operacionId: 'io.dnt.comments'
  });
};

export const sendComment = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.post(`${RESOURCE}/${payload.febosId}/comentarios?${params}`,
    { comentario: payload.comentario },
    { operacionId: 'io.dnt.send.comment' });
};
