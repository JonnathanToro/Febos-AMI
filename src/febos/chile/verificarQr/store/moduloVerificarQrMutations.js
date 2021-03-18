export default {
  SET_INFORMACION_QR(state, payload) {
    state.infoQr.aprobaciones = payload.aprobaciones;
    state.infoQr.dnt = payload.dnt;
    state.infoQr.firmar = payload.firmas;
    state.infoQr.privado = payload.privado;
    state.infoQr.url = payload.url;
  }
};
