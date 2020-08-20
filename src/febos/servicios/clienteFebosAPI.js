import axios from 'axios'
import store from "../../store/store";

let config = {
  baseURL: `https://api.febos.${process.env.VUE_APP_CODIGO_PAIS}/${process.env.VUE_APP_AMBIENTE}`
};

const clienteFebosAPI = axios.create(config);
const noLoguearEstosLambdas = ["io.usuario.latido"];

const authInterceptor = config => {
  let storage = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`));
  config.headers.token = storage.Usuario.token;
  try {
    config.headers.empresa = storage.Empresas.empresa.iut;
  } catch (e) {
    console.log("llamada sin rut de empresa");
  }
  //config.headers.Accept='application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
};

const revalidarSesion = () => {
  store.dispatch('Usuario/revalidarSesion');
}

const ocultarClaves = (parametros) => {
  const parametrosTipoClave = ['clave', 'password'];
  for (let parametro in parametros) {
    if (parametros.hasOwnProperty(parametro)) {
      if (parametrosTipoClave.includes(parametro)) {
        parametros[parametro] = '*******';
      }
    }
  }
  return parametros;
}

const loggerInterceptor = config => {
  const llamadaAPI={
    'operacionId':`${config.operacionId}`,
    'url':`${config.baseURL+config.url}`,
    'verbo':config.method,
    'cabeceras':config.headers,
    'parametros':config.data?JSON.parse(JSON.stringify(config.data)):{}
  }
  // limpieza de variables residuales
  delete llamadaAPI.parametros.operacionId;
  let verbos = ['post', 'get', 'delete', 'put', 'patch', 'head', 'common'];
  verbos.forEach(function (verbo) {
    delete llamadaAPI.cabeceras[verbo];
  })

  llamadaAPI.parametros = ocultarClaves(llamadaAPI.parametros);
  if (!noLoguearEstosLambdas.includes(llamadaAPI.operacionId)) {
    console.log(`>> Llamada API (request): ${llamadaAPI.operacionId}`, llamadaAPI);
  }
  return config;
}



const portalInterceptor = config => {
  //config.params = config.params?{...{dominioPortal:`${process.env.VUE_APP_DOMINIO_DEFAULT}`},...config.params}:{dominioPortal:`${process.env.VUE_APP_DOMINIO_DEFAULT}`}
  //params.push(`dominioPortal=${process.env.VUE_APP_DOMINIO_DEFAULT}`);
  console.log("config",config);
  return config;
}


clienteFebosAPI.interceptors.request.use(portalInterceptor);
clienteFebosAPI.interceptors.request.use(authInterceptor);
clienteFebosAPI.interceptors.request.use(loggerInterceptor);

clienteFebosAPI.interceptors.response.use(
  response => {
    let opracionId = response.config.operacionId
    let respuestaAPI = {
      headers: response.headers,
      httpCode: response.status,
      data: response.data
    }
    if (response.data.codigo >= 10) revalidarSesion();
    if (!noLoguearEstosLambdas.includes(response.config.operacionId)) {
      console.log(">> Respuesta de API (response): " + opracionId, respuestaAPI);
    }
    return response;
  },
  error => {
    console.log("la api dio un error, hacer algo!");
    return Promise.reject(error);
  }
);

clienteFebosAPI.queryParams = function (json) {
  let params = [];
  for (let llave in json) {
    if (json.hasOwnProperty(llave)) {
      params.push(`${llave}=${json[llave]}`);
    }
  }
  return encodeURI(params.join('&'));
}
export default clienteFebosAPI;
