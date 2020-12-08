import state from './moduloDtesState';
import mutations from './moduloDtesMutations';
import actions from './moduloDtesActions';
import * as getters from './moduloDtesGetters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
