import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';

import state from './state';
import * as getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: localForage,
  asyncStorage: true,
  key: `${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`
});

// carga automatica de Modulos
// deben comenzar con la palabra 'modulo' y terminar con la palabra 'Store', ademas de tener
// la extension .js (se debe respetar el nombre CaseSensitive.
// el nombre del modulo sera el nombre del archivo sin las palabras 'modulo' ni 'Store'
// ej: nombre del archivo 'moduloUsuariosStore.js' -> nombre modulo 'Usuarios'

const files = require.context('../febos/', true, /modulo.*(Store\.js)$/);

const modules = files.keys().reduce((index, file) => {
  const fileName = file.split('/').pop().replace('Store.js', '').replace('modulo', '');

  return {
    ...index,
    [fileName]: files(file).default
  };
}, {});

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules,
  plugins: [vuexLocal.plugin]
});
