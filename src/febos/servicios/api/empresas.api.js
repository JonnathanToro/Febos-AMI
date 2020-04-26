import clienteFebosAPI from "../clienteFebosAPI";

const RECURSO = '/empresas';

const io_empresas_listar = (pagina,filas,busquedaSimple,ambito,dominioPortal) => clienteFebosAPI.get(RECURSO , {'operacionId': 'io.empresas.listar','_headers':{'dominioPortal':dominioPortal}});

export {
  io_empresas_listar,
}
