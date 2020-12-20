import apiClient from '../clienteFebosAPI';

const RESOURCE = '/herramientas/validacion/qr';

export const ioValidacionQr = (payload) => {
  const params = apiClient.queryParams(payload);
  return apiClient.get(`${RESOURCE}?${params}`, { operacionId: 'cl.verificar.qr' });
};
