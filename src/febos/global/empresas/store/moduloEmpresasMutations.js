export default {
  SET_LISTADO_EMPRESAS (state, payload) {
    let empresas=[];
    for(let i=0;i< payload.empresas.length; i++){
      let empresa=payload.empresas[i];
      if(empresa.esEmisor || empresa.esReceptor){
        empresas.push(empresa);
      }
    }
    console.log(`Se cargaron ${empresas.length} de ${payload.empresas.length}`);
    state.empresas=empresas;
  },
  SET_EMPRESA(state,payload){
    state.empresa=payload;
  }
}
