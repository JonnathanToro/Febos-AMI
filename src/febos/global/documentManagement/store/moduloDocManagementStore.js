import state from './moduloDocManagementState';
import mutations from './moduloDocManagementMutations';
import * as actions from './moduloDocManagementActions';
import * as getters from './moduloDocManagementGetters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
