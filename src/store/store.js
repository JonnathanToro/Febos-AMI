import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"


import moduloUsuario from "../febos/global/usuario/store/moduloUsuario";
import moduloEmpresas from "../febos/global/empresas/store/moduloEmpresas";

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules:{
      usuario:moduloUsuario,
      empresas:moduloEmpresas
    },
    plugins: [createPersistedState({
      key:`${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`,
      overwrite: false,
      fetchBeforeUse: false
    })],
    strict: process.env.NODE_ENV !== 'production'
})
