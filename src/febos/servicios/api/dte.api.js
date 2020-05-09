import clienteFebosAPI from "../clienteFebosAPI";

const RECURSO = '/v2/documentos';

const cl_dtes_listar = (payload) => {
  let params = clienteFebosAPI.queryParams(payload);
  return clienteFebosAPI.get(RECURSO +'?'+params,{'operacionId':'cl.dtes.listar'});
}

export {
  cl_dtes_listar,
}
