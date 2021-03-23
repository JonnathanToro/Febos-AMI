import { mapActions } from 'vuex';

import clienteAPI from '@/febos/servicios/clienteAPI';

export default {
  computed: {
    _dominioActual() {
      if (window.location.hostname.toLocaleLowerCase() == 'localhost') {
        return `portal.febos.${process.env.VUE_APP_CODIGO_PAIS}`;
      } return window.location.hostname.toLocaleLowerCase();
    }
  },
  methods: {
    ...mapActions('Empresas', { _cargarPersonalizacionEnState: 'cargarPersonalizacion' }),
    async _cargarPersonalizacion() {
      const pais = `${process.env.VUE_APP_CODIGO_PAIS}`;
      const ambiente = `${process.env.VUE_APP_AMBIENTE}`;
      const url = `https://s3.amazonaws.com/archivos.febos.io/${pais}/${ambiente}/portales/${this._dominioActual}.json`;
      const self = this;
      clienteAPI.get(url).then((response) => {
        self._cargarPersonalizacionEnState(response.data);
        self.$emit('updateNavbarColor', response.data.colores.navbar);
        self.$vs.theme({ primary: response.data.colores.primario });
        // self.$store.commit('UPDATE_PRIMARY_COLOR', response.data.colores.primario);
      });
    },
  },
  created() {
    this._cargarPersonalizacion();
  }
};
