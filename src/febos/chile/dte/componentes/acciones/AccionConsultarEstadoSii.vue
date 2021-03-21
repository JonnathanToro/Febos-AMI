<template>
  <vs-dropdown-item class="menu-accion" v-if="desplegar()" v-on:click.native="ejecutarAccion()">
    <div class="icono">
      <vs-icon :icon="icono" size="small"></vs-icon>
    </div>
    <div class="accion">{{ nombre }}</div>
  </vs-dropdown-item>
</template>

<script>
import PermisoAccionMixin from '../../mixins/PermisoAccionMixin';
import clienteFebosAPI from '../../../../servicios/clienteFebosAPI';
import modalStore from '../../../../../store/modals/acciones';

export default {
  name: 'AccionConsultarEstadoSii',
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object,
    },
  },
  data() {
    return {
      icono: 'find_in_page',
      nombre: 'Consultar Estado Sii',
      permiso: 'SII08',
    };
  },
  methods: {
    ejecutarAccion() {
      this.$vs.loading({ color: '#FF2961', text: 'Espera un momento por favor' });
      const modalComponente = () => import('@/febos/chile/dte/componentes/acciones/modales/modalConsultarEstadoSii.vue');
      clienteFebosAPI.get(`/sii/dte/consulta?febosId=${ this.documento.febosId}`).then((response) => {
        modalStore.commit('setTitulo', `Consultar Estado Sii de la factura electronica #${ this.documento.folio}`);
        modalStore.commit('mostrarBitacora', modalComponente);
        modalStore.commit('febosId', this.documento.febosId);
        modalStore.commit('setData', response.data);
        this.$vs.loading.close();
      });
    },
    desplegar() {
      return this.esAccionAplicable() && this._tienePermiso(this.permiso);
    },
    esAccionAplicable() {
      return true;
    },
  },
};
</script>

<style scoped>
.menu-accion {
  vertical-align: middle;
  width: 250px !important;
}
.icono,
.accion {
  vertical-align: top;
  display: inline-flex;
}
.menu-accion .icono {
  margin-right: 5px;
}
</style>
