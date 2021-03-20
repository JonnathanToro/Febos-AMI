<template>
  <vs-dropdown-item
    class="menu-accion"
    v-if="desplegar()"
    v-on:click.native="ejecutarAccion()"
  >
    <div class="icono">
      <vs-icon :icon="icono" size="small"></vs-icon>
    </div>
    <div class="accion">
      {{ nombre }}
    </div>
  </vs-dropdown-item>
</template>

<script>
import PermisoAccionMixin from '../../mixins/PermisoAccionMixin';
import modalStore from '../../../../../store/modals/acciones';

export default {
  name: 'AccionVerAnotacionesSii',
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: 'account_balance',
      nombre: 'Ver Anotaciones SII',
      permiso: ''
    };
  },
  methods: {
    ejecutarAccion() {
      const modalComponente = () => import('@/febos/chile/dte/componentes/acciones/modales/modalVerAnotacionSii.vue');
      modalStore.commit('setTitulo', 'Consultando anotaciones en el Sii');
      modalStore.commit('mostrarBitacora', modalComponente);
      modalStore.commit('febosId', this.documento.febosId);
      modalStore.commit('setData', this.documento);
    },
    desplegar() {
      return this.esAccionAplicable() && this._tienePermiso(this.permiso);
    },
    esAccionAplicable() {
      return true;
    }
  }
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
