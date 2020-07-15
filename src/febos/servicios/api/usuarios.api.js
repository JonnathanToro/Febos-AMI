import clienteFebosAPI from "../clienteFebosAPI";

const RECURSO = '/usuarios';

const io_usuario_login = (correo, clave) => clienteFebosAPI.post(RECURSO + '/login', { 'correo':correo, 'clave':clave},{'operacionId':'io.usuario.login'});
const io_usuario_latido = (usuarioId) => clienteFebosAPI.head(RECURSO + '/'+usuarioId, {'operacionId':'io.usuario.latido'});
const io_usuario_modificar = (id,iut,nombre,alias,correo) => clienteFebosAPI.post(RECURSO + '/'+id, { 'id':id, 'iut':iut,'nombre':nombre,'alias':alias,'correo':correo},{ 'operacionId':'io.usuario.actualizar'});
export {
  io_usuario_latido,
  io_usuario_login,
  io_usuario_modificar
}
