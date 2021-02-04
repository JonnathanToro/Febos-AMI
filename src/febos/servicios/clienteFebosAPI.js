import axios from 'axios';
import _ from 'lodash';
import localForage from 'localforage';

import store from '../../store/store';

const defaultConfig = {
  baseURL: `https://api.febos.${process.env.VUE_APP_CODIGO_PAIS}/${process.env.VUE_APP_AMBIENTE}`
};

const apiClient = axios.create(defaultConfig);
const withoutLog = ['io.usuario.latido'];

const authInterceptor = async (config) => {
  const storage = await localForage.getItem(`${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`);

  if (!storage) {
    return config;
  }

  Object.assign(config.headers, { token: storage.Usuario.token });

  try {
    Object.assign(config.headers, { empresa: storage.Empresas.empresa.iut });
  } catch (e) {
    console.log('llamada sin rut de empresa');
  }

  Object.assign(config.headers, { 'Content-Type': 'application/json' });
  return config;
};

const validateSession = () => {
  store.dispatch('Usuario/validateSession');
};

const hidePasswords = (params) => {
  const passwordKeys = ['clave', 'password'];

  return Object.entries(params)
    .map(([key, value]) => ([
      key,
      passwordKeys.includes(key) ? '*******' : value
    ]))
    .reduce((index, [key, value]) => ({
      ...index,
      [key]: value
    }), {});
};

const loggerInterceptor = (config) => {
  const data = _.omit(config.data, ['operacionId']);
  const headers = _.omit(config.headers, ['post', 'get', 'delete', 'put', 'patch', 'head', 'common']);

  const dataToLog = {
    operacionId: `${config.operacionId}`,
    url: `${config.baseURL}${config.url}`,
    verbo: config.method,
    cabeceras: headers,
    parametros: hidePasswords(data)
  };

  if (!withoutLog.includes(dataToLog.operacionId)) {
    console.log(`>> Llamada API (request): ${dataToLog.operacionId}`, dataToLog);
  }
  return config;
};

const portalInterceptor = (config) => ({
  ...config,
  params: {
    dominioPortal: process.env.VUE_APP_DOMINIO_DEFAULT,
    ...(config.params || {})
  }
});

apiClient.interceptors.request.use(portalInterceptor);
apiClient.interceptors.request.use(authInterceptor);
apiClient.interceptors.request.use(loggerInterceptor);

apiClient.interceptors.response.use(
  (response) => {
    const { operacionId } = response.config;
    const dataToLog = {
      headers: response.headers,
      httpCode: response.status,
      data: response.data
    };

    if (response.data.codigo < 10) {
      const error = new Error(
        `${response.data.mensaje}
        ${process.env.VUE_APP_AMBIENTE === 'desarrollo'
          ? ' ⚠️⚠️⚠️ si estas viendo este error en la consola borra el try catch de tu acción ⚠️⚠️⚠️'
          : ''
        }`
      );

      error.context = response.data;
      throw error;
    }

    validateSession();
    if (!withoutLog.includes(operacionId)) {
      console.log(`>> Respuesta de API (response): ${operacionId}`, dataToLog);
    }
    return response;
  },
  (error) => {
    console.log('la api dio un error, hacer algo!');
    return Promise.reject(error);
  }
);

apiClient.queryParams = (json) => {
  const params = Object.entries(json)
    .map(([key, value]) => (`${key}=${value}`))
    .join('&');

  return encodeURI(params);
};

export default apiClient;
