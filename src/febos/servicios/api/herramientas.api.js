import apiClient from '../clienteFebosAPI';

const RESOURCE = '/herramientas';

export const ioValidacionQr = (payload) => {
  const params = apiClient.queryParams(payload);
  return apiClient.get(`${RESOURCE}/validacion/qr?${params}`, { operacionId: 'cl.verificar.qr' });
};

export const ioDownloadPrivateFile = (payload) => {
  const params = apiClient.queryParams(payload);
  return apiClient.get(`${RESOURCE}/archivos/privados?${params}`, { operacionId: 'cl.download.file' });
};
