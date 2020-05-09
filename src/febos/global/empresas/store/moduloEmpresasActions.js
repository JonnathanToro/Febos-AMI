import {io_empresas_listar} from "@/febos/servicios/api/empresas.api";

export default {
  async listarEmpresas({commit}, payload) {
    try {
      const response = await io_empresas_listar(payload.pagina,payload.filas,payload.busquedaSimple,`${process.env.VUE_APP_PORTAL}`,window.location.hostname)
      if (response.data.codigo != 10) throw response.data
      commit('SET_LISTADO_EMPRESAS', response.data);
      return response.data;
    } catch (error) {
      console.log("ERROR", error)
      return error;
    }
  },
  seleccionarEmpresa({commit},payload){
    console.log("SELECCIONADO EMPRESA",payload);
    commit('SET_EMPRESA',payload);
  },
  empresaSeleccionada(state){
    return state.empresa;
  }
}
