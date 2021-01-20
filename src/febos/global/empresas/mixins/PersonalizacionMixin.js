import { mapState, mapActions } from 'vuex';

import apiClient from '@/febos/servicios/clienteAPI';

export default {
  computed: {
    ...mapState('Empresas', {
      _datosPersonalizacion: 'personalizacion'
    }),
    ...mapState('Personalizacion', {
      tituloIngreso: (state) => state.ingreso.tituloIngreso,
      textoHtml: (state) => state.ingreso.textoHtml,
      botonClaveUnica: (state) => state.ingreso.botonClaveUnica,
      botonRegistroProveedor: (state) => state.ingreso.botonRegistroProveedor,
      nombreBotonRegistroProveedores: (state) => state.ingreso.nombreBotonRegistroProveedores,
      nombreBotonIngreso: (state) => state.ingreso.nombreBotonIngreso,
      nombreCampoClave: (state) => state.ingreso.nombreCampoClave,
      nombreCampoUsuario: (state) => state.ingreso.nombreCampoUsuario,
      imagenIngreso: (state) => state.ingreso.imagenIngreso,
      colorFondoImagenIngreso: (state) => state.ingreso.colorFondoImagenIngreso,
      imagenFondo: (state) => state.ingreso.imagenFondo,
      logo: (state) => state.menu.logo,
      ingresoLogo: (state) => state.ingreso.logo
    }),
    currentDomain() {
      if (window.location.hostname.toLocaleLowerCase() === 'localhost') {
        return `portal.febos.${process.env.VUE_APP_CODIGO_PAIS}`;
      }
      return window.location.hostname.toLocaleLowerCase();
    },
    logoStyle() {
      try {
        // console.log("DENTRO DEL MIXIN",this._datosPersonalizacion);
        // console.log("ingresoLogo",this.ingresoLogo);
        const style = {
          position: 'fixed',
          margin: this.ingresoLogo.margen,
          width: this.ingresoLogo.ancho,
          height: this.ingresoLogo.alto
        };
        // eslint-disable-next-line default-case
        switch (this.ingresoLogo.ubicacionVertical) {
          case 'superior':
            style.top = 0;
            break;
          case 'inferior':
            style.bottom = 0;
            break;
        }
        // eslint-disable-next-line default-case
        switch (this.ingresoLogo.ubicacionHorizontal) {
          case 'izquierda':
            style.left = 0;
            break;
          case 'derecha':
            style.right = 0;
            break;
        }
        return style;
      } catch (e) {
        return '';
      }
    }
  },
  methods: {
    ...mapActions('Personalizacion', ['loadSettings']),
    async attemptLoadSettings() {
      const country = `${process.env.VUE_APP_CODIGO_PAIS}`;
      const environment = `${process.env.VUE_APP_AMBIENTE}`;
      const url = `https://s3.amazonaws.com/archivos.febos.io/${country}/${environment}/portales/${this.currentDomain}.json`;

      const response = await apiClient.get(url);

      this.loadSettings(response.data);
      this.$emit('updateNavbarColor', response.data.colores.navbar);
      this.$vs.theme({ primary: response.data.colores.primario });

      document.title = response.data.general.titulo;

      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = response.data.general.favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  },
  created() {
    // console.log('Cargando personalizacion');
    this.attemptLoadSettings();
  }
};
