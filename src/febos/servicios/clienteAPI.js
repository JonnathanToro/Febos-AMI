// axios
import axios from 'axios'

let config = {
  baseURL: `https://api.febos.${process.env.VUE_APP_CODIGO_PAIS}/${process.env.VUE_APP_AMBIENTE}`
};

const clienteAPI = axios.create(config);

const authInterceptor = config => {
  //config.headers.token="xxxxxx";
  return config;
};

const loggerInterceptor = config => {
  const llamadaAPI={
    'operacionId':`${config.data.operacionId}`,
    'url':`${config.baseURL+config.url}`,
    'verbo':config.method,
    'cabeceras':config.headers,
    'parametros':JSON.parse(JSON.stringify(config.data))
  }
  delete llamadaAPI.parametros.operacionId;
  console.log(`>> Llamada API (request): ${llamadaAPI.operacionId}`,llamadaAPI);
  return config;
}

clienteAPI.interceptors.request.use(authInterceptor);
clienteAPI.interceptors.request.use(loggerInterceptor);

clienteAPI.interceptors.response.use(
  response => {
    let opracionId=JSON.parse(response.config.data).operacionId
    let respuestaAPI={
        headers:response.headers,
        httpCode:response.status,
        data:response.data
      }
    console.log(">> Respuesta de API (response): "+opracionId,respuestaAPI)
    return response;
  },
  error => {
    console.log("la api dio un error, hacer algo!");
    return Promise.reject(error);
  }
);

export default clienteAPI;
