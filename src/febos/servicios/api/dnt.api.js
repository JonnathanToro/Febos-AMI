import apiClient from '../clienteFebosAPI';

const RESOURCE = '/notributarios';

export const clDntsList = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE }?${ params}`, {
    operacionId: 'io.dnts.listar'
  });
};
