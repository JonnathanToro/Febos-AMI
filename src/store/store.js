import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

import moduloUsuario from "../febos/global/usuario/store/moduloUsuario";

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules:{
      usuario:moduloUsuario
    },
    strict: process.env.NODE_ENV !== 'production'
})
