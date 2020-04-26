import clienteFebosAPI from "../clienteFebosAPI";

const RECURSO = '/usuarios';

const io_usuario_login = (correo, clave) => clienteFebosAPI.post(RECURSO + '/login', { 'correo':correo, 'clave':clave},{'operacionId':'io.usuario.login'});
const io_usuario_latido = (usuarioId) => clienteFebosAPI.head(RECURSO + '/'+usuarioId, {'operacionId':'io.usuario.latido'});

export {
  io_usuario_latido,
  io_usuario_login,
}
