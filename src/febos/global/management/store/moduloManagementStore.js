import state from './moduloManagementState';
import mutations from './moduloManagementMutations';
import * as actions from './moduloManagementActions';
import getters from './moduloManagementGetters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
