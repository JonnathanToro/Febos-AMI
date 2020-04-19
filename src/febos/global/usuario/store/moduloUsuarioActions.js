import { io_login } from "../../../servicios/api/usuarios.api";

export default {
  async ingreso ({ commit }, payload) {
    try {
      const response = await io_login(payload.correo,payload.clave);
      if(response.data.codigo != 10) throw response.data
      commit('SET_USUARIO', response.data);
    } catch (error) {
      console.log("ERROR",error)
    }
  }
}
