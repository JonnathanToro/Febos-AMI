import state from './moduloInicioState';
import mutations from './moduloInicioMutations';
import * as actions from './moduloInicioActions';
import * as getters from './moduloInicioGetters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
