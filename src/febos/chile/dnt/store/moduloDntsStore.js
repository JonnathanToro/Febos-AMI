import state from './moduloDntsState';
import mutations from './moduloDntsMutations';
import * as actions from './moduloDntsActions';
import getters from './moduloDntsGetters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
