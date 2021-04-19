import state from './moduloApprovalsState';
import mutations from './moduloApprovalsMutations';
import * as actions from './moduloApprovalsActions';
import getters from './moduloApprovalsGetters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
