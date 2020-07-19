export default {
  SET_LISTADO_EMPRESAS(state, payload) {
    let empresas = [];
    for (let i = 0; i < payload.empresas.length; i++) {
      let empresa = payload.empresas[i];
      if (empresa.esEmisor || empresa.esReceptor) {
        empresas.push(empresa);
      }
    }
    console.log(`Se cargaron ${empresas.length} de ${payload.empresas.length}`);
    state.empresas = empresas;
  },
  SET_EMPRESA(state, payload) {
    state.empresa.id = payload.id;
    state.empresa.razonSocial = payload.razonSocial;
    state.empresa.fantasia = payload.fantasia;
    state.empresa.iut = payload.iut;
    state.empresa.estado = payload.estado;
    state.empresa.esEmisor = payload.esEmisor;
    state.empresa.esReceptor = payload.esReceptor;
    state.empresa.esCanal = payload.esCanal;
    state.empresa.canal = payload.canal;
    state.empresa.esRcof = payload.esRcof;
    state.empresa.reglasNegocio = payload.reglasNegocio;
    state.empresa.estadoEmpresa = payload.estadoEmpresa;

  }
}
