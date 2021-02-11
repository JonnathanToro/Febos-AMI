import state from './moduloIndicatorsState';
import mutations from './moduloIndicatorsMutations';
import * as actions from './moduloIndicatorsActions';
import * as getters from './moduloIndicatorsGetters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
