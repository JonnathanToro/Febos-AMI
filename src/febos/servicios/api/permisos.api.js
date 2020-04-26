import clienteFebosAPI from "../clienteFebosAPI";

const RECURSO = '/permisos';

const io_usuario_permisos = (iut) => clienteFebosAPI.get(RECURSO + `/${iut}`, { 'operacionId':'io.usuario.permisos'});

export {
  io_usuario_permisos,
}
