import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

// carga automatica de Modulos
// deben comenzar con la palabra "modulo" y terminar con la palabra "Store", ademas de tener
// la extension .js (se debe respetar el nombre CaseSensitive.
// el nombre del modulo sera el nombre del archivo sin las palabras "modulo" ni "Store"
// ej: nombre del archivo "moduloUsuariosStore.js" -> nombre modulo "Usuarios"

const archivos = require.context('../febos/', true, /modulo.*(Store\.js)$/);
const modulos={};
archivos.keys().forEach(archivo => {
  let nombreModulo=archivo.split('/').pop().replace("Store.js","").replace("modulo","");
  modulos[nombreModulo] = archivos(archivo).default;
});

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules:modulos,
    plugins: [createPersistedState({
      key:`${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`,
      overwrite: false,
      fetchBeforeUse: false
    })],
    strict: process.env.NODE_ENV !== 'production'
})
