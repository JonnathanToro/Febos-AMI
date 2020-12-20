import * as allGetters from './moduloUsuarioGetters';

export { default as state } from './moduloUsuarioState';
export { default as mutations } from './moduloUsuarioMutations';

export { default as actions } from './moduloUsuarioActions';

export const namespaced = true;

export const getters = allGetters;
