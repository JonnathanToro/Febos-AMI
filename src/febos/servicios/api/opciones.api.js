import apiClient from '../clienteFebosAPI';

const RESOURCE = '/herramientas/opciones';

export const listOptions = (payload) => {
  const params = apiClient.queryParams(payload);
  return apiClient.get(`${RESOURCE }?${params}`, { operacionId: 'cl.listar.opciones' });
};

export const saveOption = (payload) => apiClient.post(RESOURCE, { opcion: payload }, { operacionId: 'cl.listar.opciones' });
