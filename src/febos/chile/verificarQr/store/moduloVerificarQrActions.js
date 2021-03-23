import { ioValidacionQr } from '@/febos/servicios/api/herramientas.api';

export default {
  async verificarQr({ commit }, payload) {
    try {
      const response = await ioValidacionQr(payload);
      if (response.data.codigo != 10) throw response.data;
      commit('SET_INFORMACION_QR', response.data);
      return response.data;
    } catch (error) {
      console.log('ERROR', error);
      return error;
    }
  }
};
