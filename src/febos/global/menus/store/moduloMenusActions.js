import facturaElectronica from '../../../../menu/cl/facturaElectronica';
import aprobaciones from '../../../../menu/cl/aprobaciones';
import herramientas from '../../../../menu/cl/herramientas';
import compras from '../../../../menu/cl/compras';
import configuracion from '../../../../menu/cl/configuracion';
import contratos from '../../../../menu/cl/contratos';
import escritorioDigital from '../../../../menu/cl/escritorioDigital';
import gastos from '../../../../menu/cl/gastos';
import partners from '../../../../menu/cl/partners';
import templates from '../../../../menu/cl/templates';

export default {
  async seleccionarModulo({ commit }, modulo) {
    commit('SET_MODULO_ACTUAL', modulo);
    // eslint-disable-next-line default-case
    switch (modulo) {
      case 'facturaElectronica': commit('SET_MENU', facturaElectronica); break;
      case 'aprobaciones': commit('SET_MENU', aprobaciones); break;
      case 'herramientas': commit('SET_MENU', herramientas); break;
      case 'compras': commit('SET_MENU', compras); break;
      case 'gastos': commit('SET_MENU', gastos); break;
      case 'configuracion': commit('SET_MENU', configuracion); break;
      case 'contratos': commit('SET_MENU', contratos); break;
      case 'partners': commit('SET_MENU', partners); break;
      case 'escritorioDigital': commit('SET_MENU', escritorioDigital); break;
      case 'templates': commit('SET_MENU', templates); break;
    }
  }
};
