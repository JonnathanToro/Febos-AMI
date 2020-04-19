import clienteAPI from "../clienteAPI";

const RECURSO = '/usuarios';

const io_login = (correo, clave) => clienteAPI.post(RECURSO + '/login', { 'operacionId':'io.login','correo':correo, 'clave':clave});

//const ejemploConParametros = (user_id) => clienteAPI.get(END_POINT, { user_id });
//const ejemploComoPost = (username, password) => clienteAPI.post(END_POINT, { username, password });


export {
  //io_empresas_listar,
  io_login,
  //ejemploComoPost,
  //ejemploConParametros
}
