import state from './moduloUsuarioState';
import mutations from './moduloUsuarioMutations';
import actions from './moduloUsuarioActions';
import * as getters from './moduloUsuarioGetters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
