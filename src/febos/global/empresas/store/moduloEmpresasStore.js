import state from './moduloEmpresasState';
import mutations from './moduloEmpresasMutations';
import actions from './moduloEmpresasActions';
import * as getters from './moduloEmpresasGetters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
