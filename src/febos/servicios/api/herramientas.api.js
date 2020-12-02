import clienteFebosAPI from "../clienteFebosAPI";

const RECURSO = '/herramientas/validacion/qr';

const ioValidacionQr = (payload) => {
  let params = clienteFebosAPI.queryParams(payload);
  return clienteFebosAPI.get(RECURSO +'?'+params , {'operacionId': 'cl.verificar.qr'});
}
export {
  ioValidacionQr,
}
