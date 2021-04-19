import facturaElectronica from '../../../../menu/cl/facturaElectronica';
import approvals from '../../../../menu/cl/approvals';
import expedientesEd from '../../../../menu/cl/escritorioDigitalDocumentos';
import compras from '../../../../menu/cl/compras';
import configuracion from '../../../../menu/cl/configuracion';
import contratos from '../../../../menu/cl/contratos';
import escritorioDigital from '../../../../menu/cl/escritorioDigital';
import gestionDocumentos from '../../../../menu/cl/documentManagement';
import gastos from '../../../../menu/cl/gastos';
import partners from '../../../../menu/cl/partners';

export default {
  async seleccionarModulo({ commit }, modulo) {
    commit('SET_MODULO_ACTUAL', modulo);
    // eslint-disable-next-line default-case
    switch (modulo) {
      case 'facturaElectronica': commit('SET_MENU', facturaElectronica); break;
      case 'approvals': commit('SET_MENU', approvals); break;
      case 'expedientesEd': commit('SET_MENU', expedientesEd); break;
      case 'compras': commit('SET_MENU', compras); break;
      case 'gastos': commit('SET_MENU', gastos); break;
      case 'configuracion': commit('SET_MENU', configuracion); break;
      case 'contratos': commit('SET_MENU', contratos); break;
      case 'partners': commit('SET_MENU', partners); break;
      case 'escritorioDigital': commit('SET_MENU', escritorioDigital); break;
      case 'gestionDocumentos': commit('SET_MENU', gestionDocumentos); break;
    }
  }
};
