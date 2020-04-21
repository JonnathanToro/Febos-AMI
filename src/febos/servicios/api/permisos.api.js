import clienteAPI from "../clienteAPI";

const RECURSO = '/permisos';

const io_usuario_permisos = (iut) => clienteAPI.get(RECURSO + `/${iut}`, { 'operacionId':'io.usuario.permisos'});

export {
  io_usuario_permisos,
}
