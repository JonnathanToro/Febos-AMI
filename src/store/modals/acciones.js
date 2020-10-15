import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    showModal: false,
    showModalFull: false,
    tituloModal: null,
    componente: null,
    data: null
  },
  mutations: {
    mostrarLoading(state)  {
      state.loading = true;
    },
    ocultarLoading(state) {
      state.loading = false;
    },
    setTitulo(state, value) {
      state.tituloModal = value;
    },
    mostrarBitacora(state, component)  {
      state.loading = false;
      state.showModal = true;
      state.componente = component;
    },
    ocultarBitacora(state)  {
      state.showModal = false;
      state.componente = null;
    },
    mostrarBitacoraFull(state, component)  {
      state.loading = false;
      state.showModalFull = true;
      state.componente = component;
    },
    ocultarBitacoraFull(state)  {
      state.showModalFull = false;
      state.componente = null;
    },
    mostrarVerReferencias(state,component)  {
      state.loading = false;
      state.showModal = true;
      state.componente = component;
    },
    ocultarVerReferencias(state)  {
      state.showModal = false;
      state.componente = null;
    },
    setData(state, value) {
      state.data = value;
    }
  }
})
