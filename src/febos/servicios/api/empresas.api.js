import clienteAPI from "../clienteAPI";

const RECURSO = '/empresas';

const io_empresas_listar = (pagina,filas,busquedaSimple,ambito,dominioPortal) => clienteAPI.get(RECURSO , {'operacionId': 'io.empresas.listar'});

export {
  io_empresas_listar,
}
