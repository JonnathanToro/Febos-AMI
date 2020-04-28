import axios from 'axios';//
import entorno from '../utils/entorno';
import router from '@/router';
import store from '@/store/store';


/**
 * Verbos para las peticiones
 * @type {{POST: string, GET: string, PUT: string, DELETE: string, HEAD: string}}
 */
export const Metodo = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  HEAD: 'HEAD'
};

/**
 * Cabecera por defecto
 * @type {{Accept: string}}
 */
export const cabeceras = {
  Accept: 'aplication/json',
  'Content-Type': 'application/json'
};

/**
 *
 * @returns {
 * {
 *    cabeceras: {Accept: string},
 *    baseURL: string,
 *    baseURLConAmbiente: string,
 *    entorno: {tld: (*|*|void), ambiente: (*|*|void)}}
 * }
 */
export function getRequestConfig() {
  let autenticacion = {};
  const usuarioActual = store.state.configuraciones.usuarioActual;

  if (usuarioActual) {
    autenticacion = {
      token: usuarioActual.token
    };
    if (store.getters['configuraciones/empresaActual']) {
      autenticacion.empresa = store.getters['configuraciones/iutEmpresaActual'];
    }
  }

  return {
    cabeceras: {
      ...cabeceras,
      ...autenticacion
    },
    baseURL: `https://api.febos.${entorno.obtenerTld()}`,
    baseURLConAmbiente: `https://api.febos.${entorno.obtenerTld()}/${entorno.obtenerAmbiente()}`,
    entorno: {
      tld: entorno.obtenerTld(),
      ambiente: entorno.obtenerAmbiente()
    }
  }
}

/**
 * Hacer peticion al Api JSON
 * @param metodo
 * @param path
 * @param cuerpo
 * @returns {Promise<{ok} | never>}
 */
export function fetchJSON(metodo, path, cuerpo, parametros = {}, otrasCabeceras = {}) {
  console.log("parametros",parametros,otrasCabeceras)
  const config = getRequestConfig();

  const url = `${config.baseURLConAmbiente}/${path}`;

  const request = {
    method: metodo,
    url,
    data: cuerpo,
    headers: {
      ...config.cabeceras,
      ...otrasCabeceras
    }
  };

  //TODO: se debe loguear cada request y response identificando el id de operacion según la documentación de la API
  console.log("REQUEST {id.operacion}",request);
  return axios(request)
    .then((respuesta) => {
      console.log("RESPONSE {id.operacion}",respuesta);
      if (respuesta.status !== 200) {
        throw new Error('Error no manejado');
      }

      if(respuesta.data.codigo === 4){ //vencio el token, redireccionar a logout
          //TODO: redirect al login pasando la variable "to"
        router.push({ name: 'page-login' });
      }

      if (respuesta.data.codigo !== 10) {
        throw new Error(respuesta.data.mensaje);
      }

      return respuesta;
    })
    .catch((error) => {
      throw error;
    });
}

export function uploadFile(metodo, path, cuerpo) {
  const headers = {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data',
    'Vary': 'Origin, Access-Control-Request-Headers, Access-Control-Request-Method'
  };

  const request = {
    method: metodo,
    url: path,
    data: cuerpo,
    headers
  };

  return axios(request)
    .then(() => {})
    .catch((error) => {
      throw error;
    });
}

export function fetchFile(metodo, path, cuerpo) {
  const headers = {
    Accept: 'aplication/json',
  };

  const request = {
    method: metodo,
    url: path,
    data: cuerpo,
    headers
  };

  return axios(request)
    .then((respuesta) => {
      if (respuesta.status !== 200) {
        throw new Error('Error no manejado');
      }

      return respuesta;
    })
    .catch((err) => {
      throw err;
    })
}
