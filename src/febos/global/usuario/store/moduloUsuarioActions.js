import {io_login} from "../../../servicios/api/usuarios.api";
import {io_usuario_permisos} from "../../../servicios/api/permisos.api";

export default {
  async ingreso({commit}, payload) {
    try {
      const response = await io_login(payload.correo, payload.clave);
      if (response.data.codigo != 10) throw response.data
      commit('SET_USUARIO', response.data);
      commit('SET_TOKEN', response.data);
      return response.data;
    } catch (error) {
      console.log("ERROR", error)
      return error;
    }
  },
  async cargarPermisos({commit}, payload) {
    try {
      const response = await io_usuario_permisos(payload.iut);
      if (response.data.codigo != 10) throw response.data
      commit('SET_PERMISOS', response.data);
      return response.data;
    } catch (error) {
      console.log("ERROR", error)
      return error;
    }
  },
  revalidarSesion({commit}) {
    const segundo = 1000;
    const minutos = 60 * segundo;

    commit('SET_ULTIMO_REQUEST', {ultimoRequest: new Date().getTime()});
    commit('SET_VENCIMIENTO_SESION', {vencimiento: new Date().getTime() + (14 * minutos)});
  }
}
