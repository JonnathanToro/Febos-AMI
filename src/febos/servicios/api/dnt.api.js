import apiClient from '../clienteFebosAPI';

const RESOURCE = '/notributarios';

export const clDntsList = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE }?${ params}`, {
    operacionId: 'io.dnts.listar'
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
    operacionId: 'io.fet.dnt'
  });
};
