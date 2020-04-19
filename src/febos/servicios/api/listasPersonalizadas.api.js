import clienteAPI from "../ClienteAPI";

const RECURSO = '/empresas';

const io_empresas_listar = () => clienteAPI.get(END_POINT);

const ejemploConParametros = (user_id) => httpClient.get(END_POINT, { user_id });
const ejemploComoPost = (username, password) => httpClient.post(END_POINT, { username, password });

export {
  io_empresas_listar,
  ejemploComoPost,
  ejemploConParametros
}
