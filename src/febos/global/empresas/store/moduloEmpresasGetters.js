export default {
  empresa: state => {
    return state.empresa;
  },
  iut: state => {
    return state.empresa.iut;
  },
  empresaSeleccionada: state =>  {
    return state.empresaSeleccionada;
  },
  empresas: state => {
    return state.empresas;
  }
}
