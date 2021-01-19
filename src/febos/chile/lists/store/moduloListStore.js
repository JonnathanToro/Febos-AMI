import state from './moduloListState';
import mutations from './moduloListMutations';
import * as actions from './moduloHerramientasActions';
import * as getters from './moduloListGetters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
