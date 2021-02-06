import cleanApiClient from '../clienteAPI';
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

export const ioGetPrivateUploadUrl = (fileUrl, fileMime) => {
  const params = apiClient.queryParams({
    tipo: 'upload',
    key: fileUrl,
    contentType: fileMime
  });
  return apiClient.get(
    `${RESOURCE}/archivos?${params}`, { operacionId: 'cl.tools.private-url.file' }
  );
};

export const ioUploadFileToPrivateUrl = (url, file, progressCallback) => (
  // TODO setup log
  cleanApiClient.put(url, file, {
    headers: {
      Vary: 'Access-Control-Request-Headers, Access-Control-Request-Method, Origin'
    },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      progressCallback(percent);
    }
  })
);
